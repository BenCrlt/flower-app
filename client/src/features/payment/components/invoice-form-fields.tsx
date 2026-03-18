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
import { InvoiceStatus, VendorsItem } from "@/generated/graphql";
import { CirclePlus, Plus, Trash2 } from "lucide-react";
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
import { AddVendorDialog } from "./add-vendor-dialog";
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
  const [openAddVendorDialog, setOpenAddVendorDialog] = useState(false);
  return (
    <>
      {/* Nom */}
      <Field>
        <span className="text-sm font-medium text-foreground">Nom</span>
        <Input {...register("name")} placeholder="Ajouter un nom..." />
      </Field>
      {/* Fournisseur */}
      {/*  setValue("vendorId", vendor.id) */}
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

      {/* Statut */}
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
              <SelectTrigger>
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

      {/* Note */}
      <Field>
        <span className="text-sm font-medium text-foreground">Note</span>
        <Textarea {...register("note")} placeholder="Ajouter une note..." />
      </Field>

      {/* Lignes de paiement */}
      <div className="grid grid-cols-20 gap-2 items-center">
        <span className="text-sm font-medium text-foreground col-span-10">
          Articles
        </span>
        <span className="text-sm font-medium text-foreground col-span-3">
          Quantité
        </span>
        <div></div>
        <span className="text-sm font-medium text-foreground col-span-5">
          Prix
        </span>
        <div></div>
        {paymentFields.map((_, index) => (
          <>
            <Field className="col-span-10">
              <Controller
                name={`payments.${index}.budgetLineId`}
                control={control}
                render={({ field: f }) => (
                  <Select
                    value={f.value ? f.value.toString() : ""}
                    onValueChange={(val) => f.onChange(Number(val))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un article..." />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetLines.map((line) => (
                        <SelectItem key={line.id} value={line.id.toString()}>
                          {line.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <Field className="col-span-3">
              <Input
                placeholder="Qté"
                className="w-12s"
                {...register(`payments.${index}.quantity`, {
                  valueAsNumber: true,
                })}
              />
            </Field>
            <span className="text-muted-foreground justify-self-center">×</span>
            <Field className="col-span-5">
              <Input
                placeholder="Prix"
                className="w-20"
                {...register(`payments.${index}.unitPrice`, {
                  valueAsNumber: true,
                })}
              />
            </Field>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removePayment(index)}
              disabled={paymentFields.length === 1}
            >
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </>
        ))}
        {errors.payments && (
          <p className="text-sm text-destructive col-span-20">
            {errors.payments.message}
          </p>
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={appendPayment}
          className="w-fit"
        >
          <CirclePlus className="mr-1 h-4 w-4" />
          Ajouter un article
        </Button>
      </div>

      {/* Total */}
      <p className="text-sm text-muted-foreground">
        {"Montant total : "}
        <span className="font-medium text-foreground">
          {totalAmount.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
          })}
        </span>
      </p>
    </>
  );
}
