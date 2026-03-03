import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useGetBudgetLinesQuery } from "@/features/budget/hooks/useGetBudgetLinesQuery";
import { useEdition } from "@/features/edition/EditionContext";
import { LineTypeEnum } from "@/generated/graphql";
import { ReactElement } from "react";
import { InvoiceFormValues } from "../hooks/invoiceFormResolver";
import { useEditInvoiceForm } from "../hooks/useEditInvoiceForm";
import { useGetVendorsQuery } from "../hooks/useGetVendorsQuery";
import { PaymentTableRow } from "./columns";
import { InvoiceFormFields, STATUS_TO_ENUM } from "./invoice-form-fields";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: PaymentTableRow;
}

export function EditInvoiceSheet({
  open,
  onOpenChange,
  invoice,
}: Props): ReactElement {
  const { edition } = useEdition();

  const { data: vendorsData } = useGetVendorsQuery();
  const { data: budgetLinesData } = useGetBudgetLinesQuery({
    variables: { editionId: edition.id, budgetLineType: LineTypeEnum.Expense },
  });

  const defaultValues: InvoiceFormValues = {
    vendorId: invoice.vendorId,
    status: STATUS_TO_ENUM[invoice.status],
    note: invoice.note === "-" ? "" : invoice.note,
    payments: invoice.payments.map((p) => ({
      budgetLineId: p.budgetLineId,
      quantity: p.quantity,
      unitPrice: p.unitPrice,
    })),
  };

  const {
    handleSubmit,
    handleClose,
    register,
    control,
    errors,
    paymentFields,
    appendPayment,
    removePayment,
    totalAmount,
  } = useEditInvoiceForm({ setOpen: onOpenChange, defaultValues });

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => (o ? onOpenChange(true) : handleClose())}
    >
      <SheetContent className="sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{invoice.vendorName}</SheetTitle>
          <SheetDescription>
            Cliquez sur un champ pour le modifier.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <InvoiceFormFields
              register={register}
              control={control}
              errors={errors}
              vendors={vendorsData?.vendors ?? []}
              budgetLines={budgetLinesData?.budgetLines ?? []}
              paymentFields={paymentFields}
              appendPayment={appendPayment}
              removePayment={removePayment}
              totalAmount={totalAmount}
            />
          </div>
          <SheetFooter>
            <Button type="submit" disabled>
              Enregistrer
            </Button>
            <SheetClose asChild>
              <Button variant="outline" onClick={handleClose}>
                Fermer
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
