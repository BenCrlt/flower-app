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
import { InvoiceStatus } from "@/generated/graphql";
import { CirclePlus, Trash2 } from "lucide-react";
import { ReactElement } from "react";
import {
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { InvoiceFormValues } from "../hooks/invoiceFormResolver";
import { PaymentStatusBadge } from "./payment-status-badge";

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
              <PaymentStatusBadge status={statusValue} />
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
                    field.onChange(val as InvoiceStatus);
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
                    {Object.values(InvoiceStatus).map((status) => (
                      <SelectItem key={status} value={status}>
                        <PaymentStatusBadge status={status} />
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
