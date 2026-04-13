import { CategoryCommand } from "@/components/category-command";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BudgetCategoriesItem } from "@/generated/graphql";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { ReactElement } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { BudgetLineFormValues } from "../hooks/budgetLineFormResolver";

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
  setValue: UseFormSetValue<BudgetLineFormValues>;
}

export function BudgetLineFormFields({
  register,
  control,
  errors,
  allCategories,
  namePlaceholder,
  setValue,
}: Props): ReactElement {
  const estimatedQuantity = useWatch({ control, name: "estimatedQuantity" });
  const estimatedUnitPrice = useWatch({ control, name: "estimatedUnitPrice" });
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

      <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2">
        <Field data-invalid={!!errors.estimatedQuantity}>
          <span className="text-sm font-medium text-foreground">Quantité</span>
          <Input
            {...register("estimatedQuantity", { valueAsNumber: true })}
            aria-invalid={!!errors.estimatedQuantity}
          />
          <FieldError errors={[errors.estimatedQuantity]} />
        </Field>
        <span className="mt-7 text-muted-foreground">×</span>
        <Field data-invalid={!!errors.estimatedUnitPrice}>
          <span className="text-sm font-medium text-foreground">
            Prix unitaire
          </span>
          <Input
            {...register("estimatedUnitPrice", { valueAsNumber: true })}
            aria-invalid={!!errors.estimatedUnitPrice}
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
