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
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { ReactElement } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
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
}

export function BudgetLineFormFields({
  register,
  control,
  errors,
  allCategories,
  namePlaceholder,
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

      <Field data-invalid={!!errors.budgetCategoryId}>
        <span className="text-sm font-medium text-foreground">Catégorie</span>
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
                  <SelectItem key={category.id} value={category.id.toString()}>
                    <CategoryBadge
                      name={category.name}
                      color={category.color}
                    />
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
