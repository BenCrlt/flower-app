import { Resolver } from "react-hook-form";

export type BudgetLineFormValues = {
  name: string;
  description: string;
  estimatedQuantity: number;
  estimatedUnitPrice: number;
  budgetCategoryId: number;
};

export const budgetLineFormResolver: Resolver<BudgetLineFormValues> = async (
  values,
) => {
  const errors: Record<string, { type: string; message: string }> = {};

  if (!values.name) {
    errors.name = { type: "required", message: "Ce champ est requis." };
  }

  if (
    values.estimatedQuantity === undefined ||
    values.estimatedQuantity === null ||
    values.estimatedQuantity === ("" as unknown)
  ) {
    errors.estimatedQuantity = {
      type: "required",
      message: "Ce champ est requis.",
    };
  } else if (isNaN(Number(values.estimatedQuantity))) {
    errors.estimatedQuantity = {
      type: "pattern",
      message: "Doit être un nombre.",
    };
  } else if (values.estimatedQuantity < 0) {
    errors.estimatedQuantity = {
      type: "pattern",
      message: "Doit être supérieur à 1.",
    };
  }

  if (
    values.estimatedUnitPrice === undefined ||
    values.estimatedUnitPrice === null ||
    values.estimatedUnitPrice === ("" as unknown)
  ) {
    errors.estimatedUnitPrice = {
      type: "required",
      message: "Ce champ est requis.",
    };
  } else if (isNaN(Number(values.estimatedUnitPrice))) {
    errors.estimatedUnitPrice = {
      type: "pattern",
      message: "Doit être un nombre.",
    };
  } else if (values.estimatedUnitPrice < 0) {
    errors.estimatedUnitPrice = {
      type: "pattern",
      message: "Doit être supérieur à 0.",
    };
  }

  if (!values.budgetCategoryId) {
    errors.budgetCategoryId = {
      type: "required",
      message: "Ce champ est requis.",
    };
  }

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};
