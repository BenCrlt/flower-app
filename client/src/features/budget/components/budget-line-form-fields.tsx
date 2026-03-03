import { AddCategoryField } from "@/components/AddCategoryField";
import { CategoryBadge } from "@/components/CategoryBadge";
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
import { BudgetCategoriesItem } from "@/generated/graphql";
import { ReactElement, ReactNode, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { BudgetLineFormValues } from "../hooks/budgetLineFormResolver";

function EditableField({
  label,
  displayValue,
  placeholder,
  children,
}: {
  label: string;
  displayValue: ReactNode;
  placeholder?: string;
  children: (props: { onEditDone: () => void }) => ReactElement;
}) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {editing ? (
        children({ onEditDone: () => setEditing(false) })
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="min-h-9 w-full rounded-md border border-transparent px-3 py-2 text-left text-sm transition-colors hover:border-input hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {displayValue || (
            <span className="text-muted-foreground italic">
              {placeholder ?? "—"}
            </span>
          )}
        </button>
      )}
    </div>
  );
}

interface Props {
  register: UseFormRegister<BudgetLineFormValues>;
  control: Control<BudgetLineFormValues>;
  errors: FieldErrors<BudgetLineFormValues>;
  allCategories?: BudgetCategoriesItem[];
  namePlaceholder?: string;
  currentValues?: {
    name: string;
    description: string;
    estimatedQuantity: number;
    estimatedUnitPrice: number;
  };
}

export function BudgetLineFormFields({
  register,
  control,
  errors,
  allCategories,
  namePlaceholder,
  currentValues,
}: Props): ReactElement {
  const estimatedQuantity = useWatch({ control, name: "estimatedQuantity" });
  const estimatedUnitPrice = useWatch({ control, name: "estimatedUnitPrice" });
  const totalEstimated =
    Number(estimatedQuantity) * Number(estimatedUnitPrice) || 0;

  const nameValue = useWatch({ control, name: "name" });
  const descriptionValue = useWatch({ control, name: "description" });
  const categoryValue = useWatch({ control, name: "budgetCategoryId" });
  const currentCategory = allCategories?.find((c) => c.id === categoryValue);

  const qtyDisplay = (() => {
    const val = estimatedQuantity ?? currentValues?.estimatedQuantity;
    if (val === undefined || isNaN(Number(val))) return "";
    return String(val);
  })();

  const priceDisplay = (() => {
    const val = estimatedUnitPrice ?? currentValues?.estimatedUnitPrice;
    if (val === undefined || isNaN(Number(val))) return "";
    return Number(val).toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
    });
  })();

  return (
    <>
      <Field data-invalid={!!errors.name}>
        <EditableField
          label="Nom"
          displayValue={nameValue ?? currentValues?.name ?? ""}
          placeholder={namePlaceholder}
        >
          {({ onEditDone }) => {
            const { onBlur: rhfBlur, ...rest } = register("name");
            return (
              <Input
                autoFocus
                aria-invalid={!!errors.name}
                onBlur={(e) => {
                  rhfBlur(e);
                  onEditDone();
                }}
                {...rest}
              />
            );
          }}
        </EditableField>
        <FieldError errors={[errors.name]} />
      </Field>

      <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2">
        <Field data-invalid={!!errors.estimatedQuantity}>
          <EditableField label="Quantité" displayValue={qtyDisplay}>
            {({ onEditDone }) => {
              const { onBlur: rhfBlur, ...rest } = register(
                "estimatedQuantity",
                { valueAsNumber: true },
              );
              return (
                <Input
                  autoFocus
                  aria-invalid={!!errors.estimatedQuantity}
                  onBlur={(e) => {
                    rhfBlur(e);
                    onEditDone();
                  }}
                  {...rest}
                />
              );
            }}
          </EditableField>
          <FieldError errors={[errors.estimatedQuantity]} />
        </Field>
        <span className="mt-7 text-muted-foreground">×</span>
        <Field data-invalid={!!errors.estimatedUnitPrice}>
          <EditableField label="Prix unitaire" displayValue={priceDisplay}>
            {({ onEditDone }) => {
              const { onBlur: rhfBlur, ...rest } = register(
                "estimatedUnitPrice",
                { valueAsNumber: true },
              );
              return (
                <Input
                  autoFocus
                  aria-invalid={!!errors.estimatedUnitPrice}
                  onBlur={(e) => {
                    rhfBlur(e);
                    onEditDone();
                  }}
                  {...rest}
                />
              );
            }}
          </EditableField>
          <FieldError errors={[errors.estimatedUnitPrice]} />
        </Field>
      </div>

      <p className="text-sm text-muted-foreground -mt-4">
        Total prévisionnel :{" "}
        <span className="font-medium text-foreground">
          {totalEstimated.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
          })}
        </span>
      </p>

      <Field>
        <EditableField
          label="Description"
          displayValue={descriptionValue ?? currentValues?.description ?? ""}
          placeholder="Description..."
        >
          {({ onEditDone }) => {
            const { onBlur: rhfBlur, ...rest } = register("description");
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

      <Field data-invalid={!!errors.budgetCategoryId}>
        <EditableField
          label="Catégorie"
          displayValue={
            currentCategory ? (
              <CategoryBadge
                name={currentCategory.name}
                color={currentCategory.color}
              />
            ) : undefined
          }
          placeholder="Sélectionnez une catégorie..."
        >
          {({ onEditDone }) => (
            <Controller
              name="budgetCategoryId"
              control={control}
              render={({ field }) => (
                <Select
                  aria-invalid={!!errors.budgetCategoryId}
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
                    <SelectValue placeholder="Sélectionnez une catégorie..." />
                  </SelectTrigger>
                  <SelectContent>
                    {allCategories?.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        <CategoryBadge
                          name={category.name}
                          color={category.color}
                        />
                      </SelectItem>
                    ))}
                    <div className="p-1">
                      <AddCategoryField
                        onAdded={(id) => {
                          field.onChange(id);
                          onEditDone();
                        }}
                      />
                    </div>
                  </SelectContent>
                </Select>
              )}
            />
          )}
        </EditableField>
        <FieldError errors={[errors.budgetCategoryId]} />
      </Field>
    </>
  );
}
