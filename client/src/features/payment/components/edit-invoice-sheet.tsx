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
import { useGetGoogleDriveConfigQuery } from "@/features/settings/hooks/useGetGoogleDriveConfigQuery";
import { Spinner } from "@/components/ui/spinner";
import { LineTypeEnum } from "@/generated/graphql";
import { ReactElement } from "react";
import { useGetVendorsQuery } from "../hooks/useGetVendorsQuery";
import { useInvoiceForm } from "../hooks/useInvoiceForm";
import { InvoiceTableRow } from "./columns";
import { InvoiceFilesSection } from "./invoice-files-section";
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

  const { data: driveConfigData } = useGetGoogleDriveConfigQuery({
    variables: { editionId: edition.id },
  });
  const driveConfigured = Boolean(
    driveConfigData?.googleDriveConfig.isConnected &&
      driveConfigData.googleDriveConfig.invoiceFolderId,
  );

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
    setValue,
    isSubmitting,
  } = useInvoiceForm({ setOpen: onOpenChange, existingInvoice: invoice });

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => (o ? onOpenChange(true) : handleClose())}
    >
      <SheetContent className="md:max-w-xl">
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
              setValue={setValue}
            />
            <InvoiceFilesSection
              invoiceId={invoice.id}
              invoiceName={invoice.name}
              driveConfigured={driveConfigured}
              existingFiles={invoice.invoiceFiles}
            />
          </div>
          <SheetFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : "Enregistrer"}
            </Button>
            <SheetClose asChild>
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Fermer
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
