import { useEdition } from "@/features/edition/EditionContext";
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  useFieldArray,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { invoiceFormResolver, InvoiceFormValues } from "./invoiceFormResolver";
import { useAddInvoiceMutation } from "./useAddInvoiceMutation";

interface Props {
  setOpen: (open: boolean) => void;
}

export function useAddInvoiceForm({ setOpen }: Props): {
  handleSubmit: () => void;
  handleClose: () => void;
  register: UseFormRegister<InvoiceFormValues>;
  control: Control<InvoiceFormValues>;
  errors: FieldErrors<InvoiceFormValues>;
  paymentFields: FieldArrayWithId<InvoiceFormValues, "payments">[];
  appendPayment: () => void;
  removePayment: (index: number) => void;
  totalAmount: number;
} {
  const { edition } = useEdition();
  const { mutate } = useAddInvoiceMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<InvoiceFormValues>({
    resolver: invoiceFormResolver,
    mode: "onTouched",
    defaultValues: {
      payments: [{ budgetLineId: 0, quantity: 1, unitPrice: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "payments",
  });

  const payments = watch("payments");
  const totalAmount = (payments ?? []).reduce(
    (sum, p) => sum + (Number(p.quantity) || 0) * (Number(p.unitPrice) || 0),
    0,
  );

  function onSubmit(data: InvoiceFormValues) {
    const total = data.payments.reduce(
      (sum, p) => sum + p.quantity * p.unitPrice,
      0,
    );
    mutate({
      ...data,
      editionId: edition.id,
      totalAmount: total,
      authorId: 1,
    });
    handleClose();
  }

  function handleClose() {
    reset();
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
  };
}
