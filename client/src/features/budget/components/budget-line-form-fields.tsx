import { Field, FieldError, FieldLabel } from "@/components/ui/field";
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
import { ReactElement, useState } from "react";
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
  children,
}: {
  label: string;
  displayValue: string;
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
            <span className="text-muted-foreground italic">—</span>
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
  mode: "add" | "edit";
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
  mode,
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

  if (mode === "edit" && currentValues) {
    return (
      <>
        <Field data-invalid={!!errors.name}>
          <EditableField label="Nom" displayValue={nameValue ?? currentValues.name}>
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
            <EditableField
              label="Quantité"
              displayValue={String(
                estimatedQuantity ?? currentValues.estimatedQuantity,
              )}
            >
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
            <EditableField
              label="Prix unitaire"
              displayValue={Number(
                estimatedUnitPrice ?? currentValues.estimatedUnitPrice,
              ).toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
              })}
            >
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
            displayValue={descriptionValue ?? currentValues.description}
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
            displayValue={currentCategory?.name ?? "—"}
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
                          {category.name}
                        </SelectItem>
                      ))}
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

  return (
    <>
      <Field data-invalid={!!errors.name}>
        <FieldLabel htmlFor="budget-line-input-name">Nom</FieldLabel>
        <Input
          id="budget-line-input-name"
          placeholder={namePlaceholder}
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        <FieldError errors={[errors.name]} />
      </Field>

      <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2">
        <Field data-invalid={!!errors.estimatedQuantity}>
          <FieldLabel htmlFor="budget-line-input-quantity">Quantité</FieldLabel>
          <Input
            id="budget-line-input-quantity"
            aria-invalid={!!errors.estimatedQuantity}
            {...register("estimatedQuantity", { valueAsNumber: true })}
          />
          <FieldError errors={[errors.estimatedQuantity]} />
        </Field>
        <span className="mt-9 text-muted-foreground">×</span>
        <Field data-invalid={!!errors.estimatedUnitPrice}>
          <FieldLabel htmlFor="budget-line-input-cost">Prix unitaire</FieldLabel>
          <Input
            id="budget-line-input-cost"
            aria-invalid={!!errors.estimatedUnitPrice}
            {...register("estimatedUnitPrice", { valueAsNumber: true })}
          />
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
        <FieldLabel htmlFor="budget-line-input-desc">Description</FieldLabel>
        <Textarea
          id="budget-line-input-desc"
          placeholder="Description..."
          {...register("description")}
        />
      </Field>

      <Field data-invalid={!!errors.budgetCategoryId}>
        <FieldLabel htmlFor="budget-line-input-category">Catégorie</FieldLabel>
        <Controller
          name="budgetCategoryId"
          control={control}
          render={({ field }) => (
            <Select
              aria-invalid={!!errors.budgetCategoryId}
              value={field.value?.toString()}
              onValueChange={(val) => field.onChange(Number(val))}
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
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.budgetCategoryId]} />
      </Field>
    </>
  );
}
