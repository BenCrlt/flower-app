import { EditableField } from "@/components/EditableField";
import { Button } from "@/components/ui/button";
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
import { InvoiceStatus, InvoiceStatusEnum } from "@/generated/graphql";
import { FieldArrayWithId } from "react-hook-form";
import { CirclePlus, Trash2 } from "lucide-react";
import { ReactElement } from "react";
import { Control, Controller, FieldErrors, UseFormRegister, useWatch } from "react-hook-form";
import { InvoiceFormValues } from "../hooks/invoiceFormResolver";
import { PaymentStatusBadge } from "./payment-status-badge";

const STATUS_OPTIONS: { label: string; value: InvoiceStatusEnum }[] = [
  { label: "En attente", value: InvoiceStatusEnum.Pending },
  { label: "Payé", value: InvoiceStatusEnum.Paid },
  { label: "Annulé", value: InvoiceStatusEnum.Cancelled },
];

export const STATUS_ENUM_TO_DISPLAY: Record<InvoiceStatusEnum, InvoiceStatus> =
  {
    [InvoiceStatusEnum.Pending]: InvoiceStatus.Pending,
    [InvoiceStatusEnum.Paid]: InvoiceStatus.Paid,
    [InvoiceStatusEnum.Cancelled]: InvoiceStatus.Cancelled,
  };

export const STATUS_TO_ENUM: Record<InvoiceStatus, InvoiceStatusEnum> = {
  [InvoiceStatus.Pending]: InvoiceStatusEnum.Pending,
  [InvoiceStatus.Paid]: InvoiceStatusEnum.Paid,
  [InvoiceStatus.Cancelled]: InvoiceStatusEnum.Cancelled,
};

interface Props {
  register: UseFormRegister<InvoiceFormValues>;
  control: Control<InvoiceFormValues>;
  errors: FieldErrors<InvoiceFormValues>;
  vendors: { id: number; name: string }[];
  budgetLines: { id: number; name: string }[];
  paymentFields: FieldArrayWithId<InvoiceFormValues, "payments">[];
  appendPayment: () => void;
  removePayment: (index: number) => void;
  totalAmount: number;
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
}: Props): ReactElement {
  const vendorIdValue = useWatch({ control, name: "vendorId" });
  const statusValue = useWatch({ control, name: "status" });
  const noteValue = useWatch({ control, name: "note" });

  const currentVendor = vendors.find((v) => v.id === vendorIdValue);

  return (
    <>
      {/* Fournisseur */}
      <Field data-invalid={!!errors.vendorId}>
        <EditableField
          label="Fournisseur"
          displayValue={currentVendor?.name}
          placeholder="Sélectionnez un fournisseur..."
        >
          {({ onEditDone }) => (
            <Controller
              name="vendorId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value?.toString()}
                  onValueChange={(val) => {
                    field.onChange(Number(val));
                    onEditDone();
                  }}
                  open
                  onOpenChange={(o) => {
                    if (!o) onEditDone();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un fournisseur..." />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor.id} value={vendor.id.toString()}>
                        {vendor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}
        </EditableField>
        <FieldError errors={[errors.vendorId]} />
      </Field>

      {/* Statut */}
      <Field data-invalid={!!errors.status}>
        <EditableField
          label="Statut"
          displayValue={
            statusValue ? (
              <PaymentStatusBadge
                status={STATUS_ENUM_TO_DISPLAY[statusValue]}
              />
            ) : undefined
          }
          placeholder="Sélectionnez un statut..."
        >
          {({ onEditDone }) => (
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(val as InvoiceStatusEnum);
                    onEditDone();
                  }}
                  open
                  onOpenChange={(o) => {
                    if (!o) onEditDone();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un statut..." />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}
        </EditableField>
        <FieldError errors={[errors.status]} />
      </Field>

      {/* Note */}
      <Field>
        <EditableField
          label="Note"
          displayValue={noteValue ?? ""}
          placeholder="Ajouter une note..."
        >
          {({ onEditDone }) => {
            const { onBlur: rhfBlur, ...rest } = register("note");
            return (
              <Textarea
                autoFocus
                onBlur={(e) => {
                  rhfBlur(e);
                  onEditDone();
                }}
                {...rest}
              />
            );
          }}
        </EditableField>
      </Field>

      {/* Lignes de paiement */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-foreground">
          Lignes de paiement
        </span>
        {paymentFields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-[1fr_auto_auto_auto] items-end gap-2"
          >
            <Field>
              <Controller
                name={`payments.${index}.budgetLineId`}
                control={control}
                render={({ field: f }) => (
                  <Select
                    value={f.value ? f.value.toString() : ""}
                    onValueChange={(val) => f.onChange(Number(val))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Ligne budgétaire..." />
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
            <Field>
              <Input
                type="number"
                placeholder="Qté"
                className="w-16"
                {...register(`payments.${index}.quantity`, {
                  valueAsNumber: true,
                })}
              />
            </Field>
            <Field>
              <Input
                type="number"
                placeholder="Prix"
                className="w-24"
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
          </div>
        ))}
        {errors.payments && (
          <p className="text-sm text-destructive">{errors.payments.message}</p>
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={appendPayment}
          className="w-fit"
        >
          <CirclePlus className="mr-1 h-4 w-4" />
          Ajouter une ligne
        </Button>
      </div>

      {/* Total */}
      <p className="text-sm text-muted-foreground">
        Montant total :{" "}
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
