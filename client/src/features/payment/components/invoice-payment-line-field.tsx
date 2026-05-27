import { PopoverCommand } from "@/components/PopoverCommand";
import { Button } from "@/components/ui/button";
import { CommandItem } from "@/components/ui/command";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { ReactElement } from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { InvoiceFormValues } from "../hooks/invoiceFormResolver";

interface Props {
  index: number;
  control: Control<InvoiceFormValues>;
  register: UseFormRegister<InvoiceFormValues>;
  budgetLines: { id: number; name: string }[];
  canRemove: boolean;
  onRemove: () => void;
  onAddBudgetLine: () => void;
  layout: "mobile" | "desktop";
}

export function InvoicePaymentLineField({
  index,
  control,
  register,
  budgetLines,
  canRemove,
  onRemove,
  onAddBudgetLine,
  layout,
}: Props): ReactElement {
  const budgetLinePicker = (
    <Controller
      name={`payments.${index}.budgetLineId`}
      control={control}
      render={({ field: f }) => (
        <PopoverCommand
          items={budgetLines.map((line) => ({
            label: line.name,
            value: line.id,
          }))}
          selectedValue={f.value}
          setSelectedValue={(value) => f.onChange(Number(value))}
          inputPlaceholder="Sélectionner un article..."
          commandInputPlaceholder="Rechercher un article..."
          title="Articles"
          emptyMessage="Pas d'article trouvé."
          className="w-full"
          contentClassName="w-[--radix-popover-trigger-width]"
          actions={[
            <CommandItem key="add-budget-line" onSelect={onAddBudgetLine}>
              <Plus className="h-4 w-4" />
              Créer un nouvel article
            </CommandItem>,
          ]}
        />
      )}
    />
  );

  if (layout === "mobile") {
    return (
      <div className="rounded-lg border bg-muted/20 p-3">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="text-sm font-medium">Ligne {index + 1}</span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 shrink-0"
            onClick={onRemove}
            disabled={!canRemove}
            aria-label="Supprimer la ligne"
          >
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          <Field>
            <span className="text-muted-foreground mb-1.5 block text-xs font-medium">
              Article
            </span>
            {budgetLinePicker}
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field>
              <span className="text-muted-foreground mb-1.5 block text-xs font-medium">
                Quantité
              </span>
              <Input
                type="number"
                inputMode="decimal"
                placeholder="1"
                className="h-11"
                {...register(`payments.${index}.quantity`, {
                  valueAsNumber: true,
                })}
              />
            </Field>
            <Field>
              <span className="text-muted-foreground mb-1.5 block text-xs font-medium">
                Prix unitaire
              </span>
              <Input
                type="number"
                inputMode="decimal"
                placeholder="0,00"
                className="h-11"
                {...register(`payments.${index}.unitPrice`, {
                  valueAsNumber: true,
                })}
              />
            </Field>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Field className="col-span-10">{budgetLinePicker}</Field>
      <Field className="col-span-3">
        <Input
          type="number"
          inputMode="decimal"
          placeholder="Qté"
          className="h-11 w-full"
          {...register(`payments.${index}.quantity`, {
            valueAsNumber: true,
          })}
        />
      </Field>
      <span className="text-muted-foreground justify-self-center">×</span>
      <Field className="col-span-5">
        <Input
          type="number"
          inputMode="decimal"
          placeholder="Prix"
          className="h-11 w-full"
          {...register(`payments.${index}.unitPrice`, {
            valueAsNumber: true,
          })}
        />
      </Field>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-9"
        onClick={onRemove}
        disabled={!canRemove}
        aria-label="Supprimer la ligne"
      >
        <Trash2 className="h-4 w-4 text-muted-foreground" />
      </Button>
    </>
  );
}
