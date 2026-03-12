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
import { useGetVendorsQuery } from "../hooks/useGetVendorsQuery";
import { useInvoiceForm } from "../hooks/useInvoiceForm";
import { InvoiceTableRow } from "./columns";
import { InvoiceFormFields } from "./invoice-form-fields";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: InvoiceTableRow;
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
  } = useInvoiceForm({ setOpen: onOpenChange, existingInvoice: invoice });

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
            <Button type="submit" disabled={Object.keys(errors).length > 0}>
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
