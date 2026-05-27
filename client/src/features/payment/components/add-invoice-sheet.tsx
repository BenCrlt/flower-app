import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetBudgetLinesQuery } from "@/features/budget/hooks/useGetBudgetLinesQuery";
import { useEdition } from "@/features/edition/EditionContext";
import { LineTypeEnum } from "@/generated/graphql";
import { useGetGoogleDriveConfigQuery } from "@/features/settings/hooks/useGetGoogleDriveConfigQuery";
import { Spinner } from "@/components/ui/spinner";
import { CirclePlus } from "lucide-react";
import { ReactElement, useState } from "react";
import { useGetVendorsQuery } from "../hooks/useGetVendorsQuery";
import { useInvoiceForm } from "../hooks/useInvoiceForm";
import { InvoiceFilesSection } from "./invoice-files-section";
import { InvoiceFormFields } from "./invoice-form-fields";

export function AddInvoiceSheet(): ReactElement {
  const [open, setOpen] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
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
    invoiceName,
    isSubmitting,
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
        <Button variant="default">
          Ajouter <CirclePlus />
        </Button>
      </SheetTrigger>
      <SheetContent className="md:max-w-xl">
        <SheetHeader>
          <SheetTitle>Nouvelle facture</SheetTitle>
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
              invoiceName={invoiceName}
              driveConfigured={driveConfigured}
              pendingFiles={pendingFiles}
              onPendingFilesChange={setPendingFiles}
            />
          </div>
          <SheetFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : "Ajouter"}
            </Button>
            <SheetClose asChild>
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
