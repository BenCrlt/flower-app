import { useEdition } from "@/features/edition/EditionContext";
import { authClient } from "@/lib/auth-client";
import _ from "lodash";
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  useFieldArray,
  useForm,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { invoiceFormResolver, InvoiceFormValues } from "./invoiceFormResolver";
import { useAddInvoiceMutation } from "./useAddInvoiceMutation";
import { useUpdateInvoiceMutation } from "./useEditInvoiceMutation";

interface Props {
  setOpen: (open: boolean) => void;
  existingInvoice?: InvoiceFormValues;
}

export function useInvoiceForm({ setOpen, existingInvoice }: Props): {
  handleSubmit: () => void;
  handleClose: () => void;
  register: UseFormRegister<InvoiceFormValues>;
  control: Control<InvoiceFormValues>;
  errors: FieldErrors<InvoiceFormValues>;
  paymentFields: FieldArrayWithId<InvoiceFormValues, "payments">[];
  appendPayment: () => void;
  removePayment: (index: number) => void;
  totalAmount: number;
  setValue: UseFormSetValue<InvoiceFormValues>;
} {
  const { edition } = useEdition();
  const { mutate: updateInvoice } = useUpdateInvoiceMutation();
  const { mutate: addInvoice } = useAddInvoiceMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm<InvoiceFormValues>({
    resolver: invoiceFormResolver,
    mode: "onSubmit",
    defaultValues: existingInvoice,
  });

  const { data: session } = authClient.useSession();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "payments",
  });

  const payments = watch("payments");
  const totalAmount = (payments ?? []).reduce(
    (sum, p) => sum + (Number(p.quantity) || 0) * (Number(p.unitPrice) || 0),
    0,
  );

  const getPaymentsErrorMessage = (
    values: InvoiceFormValues,
  ): string | null => {
    if (!values.payments || values.payments.length === 0) {
      return "Au moins une ligne est requise.";
    }

    for (const payment of values.payments) {
      const budgetLineId = Number(payment.budgetLineId);
      const quantity = Number(payment.quantity);
      const unitPrice = Number(payment.unitPrice);

      if (!Number.isFinite(budgetLineId) || budgetLineId <= 0) {
        return "Chaque ligne doit avoir un article.";
      }
      if (!Number.isFinite(quantity) || quantity <= 0) {
        return "La quantité doit être supérieure à 0.";
      }
      if (!Number.isFinite(unitPrice) || unitPrice < 0) {
        return "Le prix unitaire doit être positif.";
      }
    }

    return null;
  };

  function onSubmit(data: InvoiceFormValues) {
    const paymentsErrorMessage = getPaymentsErrorMessage(data);
    if (paymentsErrorMessage) {
      setError("payments", {
        type: "manual",
        message: paymentsErrorMessage,
      });
      return;
    }
    clearErrors("payments");

    const invoiceId = data.id;
    if (existingInvoice && invoiceId) {
      void updateInvoice({
        ...data,
        id: invoiceId,
        editionId: edition.id,
        totalAmount,
        authorId: session?.user?.id ?? "",
        note: data.note.length > 0 ? data.note : undefined,
      });
    } else {
      void addInvoice({
        ..._.omit(data, ["id"]),
        editionId: edition.id,
        totalAmount,
        authorId: session?.user?.id ?? "",
        note: data.note.length > 0 ? data.note : undefined,
      });
    }
    handleClose();
  }

  function handleClose() {
    reset();
    remove();
    setOpen(false);
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    handleClose,
    register,
    control,
    errors,
    paymentFields: fields,
    appendPayment: () => append({ budgetLineId: 0, quantity: 1, unitPrice: 0 }),
    removePayment: remove,
    totalAmount,
    setValue,
  };
}
