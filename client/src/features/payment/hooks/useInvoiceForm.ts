import { useEdition } from "@/features/edition/EditionContext";
import _ from "lodash";
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
  } = useForm<InvoiceFormValues>({
    resolver: invoiceFormResolver,
    mode: "onChange",
    defaultValues: existingInvoice,
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
    const invoiceId = data.id;
    if (existingInvoice && invoiceId) {
      void updateInvoice({
        ...data,
        id: invoiceId,
        editionId: edition.id,
        totalAmount,
        authorId: 1,
        note: data.note.length > 0 ? data.note : undefined,
      });
    } else {
      void addInvoice({
        ..._.omit(data, ["id"]),
        editionId: edition.id,
        totalAmount,
        authorId: 1,
        note: data.note.length > 0 ? data.note : undefined,
      });
    }
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
