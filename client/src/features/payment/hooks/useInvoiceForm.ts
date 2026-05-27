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
import { uploadInvoiceFile } from "@/lib/invoice-file-api";
import { useQueryClient } from "@tanstack/react-query";
import { useAddInvoiceMutation } from "./useAddInvoiceMutation";
import { useUpdateInvoiceMutation } from "./useEditInvoiceMutation";

interface Props {
  setOpen: (open: boolean) => void;
  existingInvoice?: InvoiceFormValues;
  pendingFiles?: File[];
  onPendingFilesClear?: () => void;
}

export function useInvoiceForm({
  setOpen,
  existingInvoice,
  pendingFiles = [],
  onPendingFilesClear,
}: Props): {
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
  invoiceName: string;
  isSubmitting: boolean;
} {
  const { edition } = useEdition();
  const queryClient = useQueryClient();
  const { mutateAsync: updateInvoice } = useUpdateInvoiceMutation();
  const { mutateAsync: addInvoice } = useAddInvoiceMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
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
  const invoiceName = watch("name") || "facture";
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

  async function onSubmit(data: InvoiceFormValues) {
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
      try {
        await updateInvoice({
          ...data,
          id: invoiceId,
          editionId: edition.id,
          totalAmount,
          authorId: session?.user?.id ?? "",
          note: data.note.length > 0 ? data.note : undefined,
        });
        handleClose();
      } catch {
        // gqlFetch throws on GraphQL errors
      }
      return;
    }

    try {
      const result = await addInvoice({
        ..._.omit(data, ["id"]),
        editionId: edition.id,
        totalAmount,
        authorId: session?.user?.id ?? "",
        note: data.note.length > 0 ? data.note : undefined,
      });
      const newId = result.addInvoice?.id;
      if (newId && pendingFiles.length > 0) {
        for (const file of pendingFiles) {
          await uploadInvoiceFile(newId, file);
        }
        await queryClient.invalidateQueries({ queryKey: ["invoices"] });
      }
      onPendingFilesClear?.();
      handleClose();
    } catch {
      // gqlFetch throws on GraphQL errors
    }
  }

  function handleClose() {
    reset();
    remove();
    onPendingFilesClear?.();
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
    invoiceName,
    isSubmitting,
  };
}
