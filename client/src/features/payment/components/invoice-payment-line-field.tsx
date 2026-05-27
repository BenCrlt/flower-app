import { PopoverCommand } from "@/components/PopoverCommand";
import { Button } from "@/components/ui/button";
import { CommandItem } from "@/components/ui/command";
import { Field } from "@/components/ui/field";
import { Plus, Trash2 } from "lucide-react";
import { ReactElement } from "react";
import { Control, Controller } from "react-hook-form";
import { InvoiceFormValues } from "../hooks/invoiceFormResolver";
import { InvoiceDecimalInput } from "./invoice-decimal-input";

interface Props {
  index: number;
  control: Control<InvoiceFormValues>;
  budgetLines: { id: number; name: string }[];
  canRemove: boolean;
  onRemove: () => void;
  onAddBudgetLine: () => void;
  layout: "mobile" | "desktop";
}

export function InvoicePaymentLineField({
  index,
  control,
  budgetLines,
  canRemove,
  onRemove,
  onAddBudgetLine,
  layout,
}: Props): ReactElement {
  const decimalInputMode = layout === "mobile" ? "decimal" : undefined;
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
              <Controller
                name={`payments.${index}.quantity`}
                control={control}
                render={({ field }) => (
                  <InvoiceDecimalInput
                    value={field.value}
                    onChange={field.onChange}
                    inputMode={decimalInputMode}
                    placeholder="1"
                    className="h-11"
                  />
                )}
              />
            </Field>
            <Field>
              <span className="text-muted-foreground mb-1.5 block text-xs font-medium">
                Prix unitaire
              </span>
              <Controller
                name={`payments.${index}.unitPrice`}
                control={control}
                render={({ field }) => (
                  <InvoiceDecimalInput
                    value={field.value}
                    onChange={field.onChange}
                    inputMode={decimalInputMode}
                    placeholder="0.00"
                    className="h-11"
                  />
                )}
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
        <Controller
          name={`payments.${index}.quantity`}
          control={control}
          render={({ field }) => (
            <InvoiceDecimalInput
              value={field.value}
              onChange={field.onChange}
              placeholder="Qté"
              className="h-11 w-full"
            />
          )}
        />
      </Field>
      <span className="text-muted-foreground justify-self-center">×</span>
      <Field className="col-span-5">
        <Controller
          name={`payments.${index}.unitPrice`}
          control={control}
          render={({ field }) => (
            <InvoiceDecimalInput
              value={field.value}
              onChange={field.onChange}
              placeholder="Prix"
              className="h-11 w-full"
            />
          )}
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
