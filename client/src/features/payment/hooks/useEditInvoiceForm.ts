import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  useFieldArray,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { InvoiceFormValues, invoiceFormResolver } from "./invoiceFormResolver";

interface Props {
  setOpen: (open: boolean) => void;
  defaultValues: InvoiceFormValues;
}

export function useEditInvoiceForm({ setOpen, defaultValues }: Props): {
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
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<InvoiceFormValues>({
    resolver: invoiceFormResolver,
    mode: "onChange",
    defaultValues,
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

  function onSubmit(_data: InvoiceFormValues) {
    // TODO: call updateInvoice mutation
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
