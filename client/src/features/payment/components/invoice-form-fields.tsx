import { AddBudgetLineDialog } from "@/components/add-budget-line-dialog";
import { AddVendorDialog } from "@/components/add-vendor-dialog";
import { PopoverCommand } from "@/components/PopoverCommand";
import { Button } from "@/components/ui/button";
import { CommandItem } from "@/components/ui/command";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { InvoiceStatus, VendorsItem } from "@/generated/graphql";
import { CirclePlus, Plus } from "lucide-react";
import { ReactElement, useState } from "react";
import {
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { InvoiceFormValues } from "../hooks/invoiceFormResolver";
import { InvoicePaymentLineField } from "./invoice-payment-line-field";
import { InvoiceStatusBadge } from "./invoice-status-badge";

interface Props {
  register: UseFormRegister<InvoiceFormValues>;
  control: Control<InvoiceFormValues>;
  errors: FieldErrors<InvoiceFormValues>;
  vendors: VendorsItem[];
  budgetLines: { id: number; name: string }[];
  paymentFields: FieldArrayWithId<InvoiceFormValues, "payments">[];
  appendPayment: () => void;
  removePayment: (index: number) => void;
  totalAmount: number;
  setValue: UseFormSetValue<InvoiceFormValues>;
}

export function InvoiceFormFields({
  register,
  control,
  errors,
  vendors,
  budgetLines,
  paymentFields,
  appendPayment,
  removePayment,
  totalAmount,
  setValue,
}: Props): ReactElement {
  const isMobile = useIsMobile();
  const [openAddVendorDialog, setOpenAddVendorDialog] = useState(false);
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState<number | null>(
    null,
  );

  return (
    <>
      <Field>
        <span className="text-sm font-medium text-foreground">Nom</span>
        <Input
          {...register("name")}
          placeholder="Ajouter un nom..."
          className="h-11"
        />
      </Field>

      <Field data-invalid={!!errors.vendorId}>
        <span className="text-sm font-medium text-foreground">Fournisseur</span>
        <Controller
          name="vendorId"
          control={control}
          render={({ field }) => (
            <PopoverCommand
              items={vendors.map((vendor) => ({
                label: vendor.name,
                value: vendor.id,
              }))}
              selectedValue={field.value}
              setSelectedValue={(value) => field.onChange(value)}
              actions={[
                <CommandItem
                  key="add-vendor"
                  onSelect={() => setOpenAddVendorDialog(true)}
                >
                  <Plus className="h-4 w-4" />
                  Ajouter un fournisseur
                </CommandItem>,
              ]}
              inputPlaceholder="Sélectionner un fournisseur..."
              commandInputPlaceholder="Rechercher un fournisseur..."
              title="Fournisseurs"
              emptyMessage="Pas de fournisseur trouvé."
            />
          )}
        />
        <FieldError errors={[errors.vendorId]} />
        <AddVendorDialog
          onAdded={(vendorId) => setValue("vendorId", vendorId)}
          open={openAddVendorDialog}
          setOpen={setOpenAddVendorDialog}
        />
      </Field>

      <Field data-invalid={!!errors.status}>
        <span className="text-sm font-medium text-foreground">Statut</span>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(val) => field.onChange(val as InvoiceStatus)}
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Sélectionnez un statut..." />
              </SelectTrigger>
              <SelectContent>
                {Object.values(InvoiceStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    <InvoiceStatusBadge status={status} />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.status]} />
      </Field>

      <Field>
        <span className="text-sm font-medium text-foreground">Note</span>
        <Textarea
          {...register("note")}
          placeholder="Ajouter une note..."
          className="min-h-24"
        />
      </Field>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-foreground">Articles</span>

        {isMobile ? (
          <div className="flex flex-col gap-3">
            {paymentFields.map((field, index) => (
              <InvoicePaymentLineField
                key={field.id}
                index={index}
                control={control}
                register={register}
                budgetLines={budgetLines}
                canRemove={paymentFields.length > 1}
                onRemove={() => removePayment(index)}
                onAddBudgetLine={() => setSelectedPaymentIndex(index)}
                layout="mobile"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-20 items-center gap-2">
            <span className="text-muted-foreground col-span-10 text-xs font-medium">
              Article
            </span>
            <span className="text-muted-foreground col-span-3 text-xs font-medium">
              Qté
            </span>
            <div />
            <span className="text-muted-foreground col-span-5 text-xs font-medium">
              Prix
            </span>
            <div />
            {paymentFields.map((field, index) => (
              <InvoicePaymentLineField
                key={field.id}
                index={index}
                control={control}
                register={register}
                budgetLines={budgetLines}
                canRemove={paymentFields.length > 1}
                onRemove={() => removePayment(index)}
                onAddBudgetLine={() => setSelectedPaymentIndex(index)}
                layout="desktop"
              />
            ))}
          </div>
        )}

        {errors.payments && (
          <p className="text-sm text-destructive">{errors.payments.message}</p>
        )}

        <Button
          type="button"
          variant="outline"
          size={isMobile ? "default" : "sm"}
          onClick={appendPayment}
          className="h-11 w-full md:h-9 md:w-fit"
        >
          <CirclePlus className="mr-1 h-4 w-4" />
          Ajouter un article
        </Button>
      </div>

      <AddBudgetLineDialog
        open={selectedPaymentIndex !== null}
        setOpen={(open) => {
          if (!open) {
            setSelectedPaymentIndex(null);
          }
        }}
        onAdded={(budgetLineId) => {
          if (selectedPaymentIndex === null) return;
          setValue(
            `payments.${selectedPaymentIndex}.budgetLineId`,
            budgetLineId,
          );
        }}
      />

      <div className="bg-muted/30 rounded-lg border px-3 py-3 md:border-0 md:bg-transparent md:p-0">
        <p className="text-sm text-muted-foreground">
          Montant total :{" "}
          <span className="text-base font-semibold text-foreground">
            {totalAmount.toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
            })}
          </span>
        </p>
      </div>
    </>
  );
}
