import { Button } from "@/components/ui/button";
import { Sheet, SheetClose } from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { useGetBudgetLinesQuery } from "@/features/budget/hooks/useGetBudgetLinesQuery";
import { useEdition } from "@/features/edition/EditionContext";
import { useGetGoogleDriveConfigQuery } from "@/features/settings/hooks/useGetGoogleDriveConfigQuery";
import { LineTypeEnum } from "@/generated/graphql";
import { ReactElement } from "react";
import { useGetVendorsQuery } from "../hooks/useGetVendorsQuery";
import { useInvoiceForm } from "../hooks/useInvoiceForm";
import { InvoiceTableRow } from "./columns";
import { InvoiceFilesSection } from "./invoice-files-section";
import { InvoiceFormFields } from "./invoice-form-fields";
import { InvoiceSheetLayout } from "./invoice-sheet-layout";

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
      <InvoiceSheetLayout
        title={invoice.name || invoice.vendorName}
        description={invoice.vendorName}
        onSubmit={handleSubmit}
        footer={
          <>
            <Button
              type="submit"
              className="h-11 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Enregistrer"}
            </Button>
            <SheetClose asChild>
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Fermer
              </Button>
            </SheetClose>
          </>
        }
      >
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
      </InvoiceSheetLayout>
    </Sheet>
  );
}
