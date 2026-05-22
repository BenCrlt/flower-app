import { CategoryCommand } from "@/components/category-command";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BudgetCategoriesItem,
  LineType,
  LineTypeEnum,
} from "@/generated/graphql";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { ReactElement } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { BudgetLineFormValues } from "../hooks/budgetLineFormResolver";
import { BudgetTableRow } from "./columns";

interface Props {
  register: UseFormRegister<BudgetLineFormValues>;
  control: Control<BudgetLineFormValues>;
  errors: FieldErrors<BudgetLineFormValues>;
  allCategories?: BudgetCategoriesItem[];
  namePlaceholder?: string;
  budgetLine?: BudgetTableRow;
  lineType?: LineTypeEnum | LineType;
  setValue: UseFormSetValue<BudgetLineFormValues>;
}

export function BudgetLineFormFields({
  register,
  control,
  errors,
  allCategories,
  namePlaceholder,
  budgetLine,
  lineType,
  setValue,
}: Props): ReactElement {
  const resolvedLineType = lineType ?? budgetLine?.lineType;
  const isIncome =
    resolvedLineType === LineTypeEnum.Income ||
    resolvedLineType === LineType.Income;
  const isFreePriceLocked = (budgetLine?.salesCount ?? 0) > 0;

  const estimatedQuantity = useWatch({ control, name: "estimatedQuantity" });
  const estimatedUnitPrice = useWatch({ control, name: "estimatedUnitPrice" });
  const isFreePrice = useWatch({ control, name: "isFreePrice" });
  const totalEstimated =
    Number(estimatedQuantity) * Number(estimatedUnitPrice) || 0;

  return (
    <>
      <Field data-invalid={!!errors.name}>
        <span className="text-sm font-medium text-foreground">Nom</span>
        <Input
          {...register("name")}
          placeholder={namePlaceholder}
          aria-invalid={!!errors.name}
        />
        <FieldError errors={[errors.name]} />
      </Field>

      {isIncome ? (
        <Field>
          <div className="flex items-start gap-3">
            <Controller
              name="isFreePrice"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="isFreePrice"
                  checked={field.value}
                  disabled={isFreePriceLocked}
                  onCheckedChange={(checked) =>
                    field.onChange(checked === true)
                  }
                />
              )}
            />
            <div className="space-y-1">
              <Label htmlFor="isFreePrice" className="font-medium">
                Prix libre
              </Label>
              {isFreePrice && isFreePriceLocked ? (
                <p className="text-sm text-muted-foreground">
                  Modification impossible : cette ligne a déjà des ventes.
                </p>
              ) : null}
            </div>
          </div>
        </Field>
      ) : null}

      <div className="flex items-center gap-2">
        <Field data-invalid={!!errors.estimatedQuantity}>
          <span className="text-sm font-medium text-foreground">Quantité</span>
          <Input
            {...register("estimatedQuantity", { valueAsNumber: true })}
            aria-invalid={!!errors.estimatedQuantity}
          />
          <FieldError errors={[errors.estimatedQuantity]} />
        </Field>
        <span className="text-muted-foreground mt-7">×</span>
        <Field data-invalid={!!errors.estimatedUnitPrice}>
          <span className="text-sm font-medium text-foreground">
            {isFreePrice ? "Prix prévisionnel" : "Prix unitaire"}
          </span>
          <Input
            {...register("estimatedUnitPrice", { valueAsNumber: true })}
            aria-invalid={!!errors.estimatedUnitPrice}
            disabled={!!budgetLine?.helloAssoProductId}
          />
          <FieldError errors={[errors.estimatedUnitPrice]} />
        </Field>
      </div>

      <p className="text-sm text-muted-foreground -mt-4">
        {"Total prévisionnel : "}
        <span className="font-medium text-foreground">
          {formatPriceToEuros(totalEstimated)}
        </span>
      </p>

      <Field>
        <span className="text-sm font-medium text-foreground">Description</span>
        <Textarea {...register("description")} placeholder="Description..." />
      </Field>

      <CategoryCommand
        onAdded={(categoryId) => setValue("budgetCategoryId", categoryId)}
        control={control}
        error={errors.budgetCategoryId?.message}
        fieldName="budgetCategoryId"
        allCategories={allCategories || []}
      />
    </>
  );
}
