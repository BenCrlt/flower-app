import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { useGetBudgetLinesQuery } from "@/features/budget/hooks/useGetBudgetLinesQuery";
import { useEdition } from "@/features/edition/EditionContext";
import { useGetGoogleDriveConfigQuery } from "@/features/settings/hooks/useGetGoogleDriveConfigQuery";
import { LineTypeEnum } from "@/generated/graphql";
import { useIsMobile } from "@/hooks/use-mobile";
import { CirclePlus } from "lucide-react";
import { ReactElement, useState } from "react";
import { useGetVendorsQuery } from "../hooks/useGetVendorsQuery";
import { useInvoiceForm } from "../hooks/useInvoiceForm";
import { InvoiceFilesSection } from "./invoice-files-section";
import { InvoiceFormFields } from "./invoice-form-fields";
import { InvoiceSheetLayout } from "./invoice-sheet-layout";

export function AddInvoiceSheet(): ReactElement {
  const [open, setOpen] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const { edition } = useEdition();
  const isMobile = useIsMobile();

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
    invoiceName,
    isSubmitting,
    watch,
  } = useInvoiceForm({
    setOpen,
    pendingFiles,
    onPendingFilesClear: () => setPendingFiles([]),
  });

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => (o ? setOpen(true) : handleClose())}
    >
      <SheetTrigger asChild>
        <Button variant="default" className={isMobile ? "w-full" : undefined}>
          Ajouter <CirclePlus />
        </Button>
      </SheetTrigger>
      <InvoiceSheetLayout
        title="Nouvelle facture"
        onSubmit={handleSubmit}
        footer={
          <>
            <Button
              type="submit"
              className="h-11 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Ajouter"}
            </Button>
            <SheetClose asChild>
              <Button
                type="button"
                variant="outline"
                className="h-11 w-full"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
            </SheetClose>
          </>
        }
      >
        <InvoiceFormFields
          watch={watch}
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
          invoiceName={invoiceName}
          driveConfigured={driveConfigured}
          pendingFiles={pendingFiles}
          onPendingFilesChange={setPendingFiles}
        />
      </InvoiceSheetLayout>
    </Sheet>
  );
}
