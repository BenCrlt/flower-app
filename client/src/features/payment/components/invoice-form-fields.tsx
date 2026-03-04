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
                  defaultOpen
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
                  defaultOpen
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
        {paymentFields.map((field, index) => (
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
