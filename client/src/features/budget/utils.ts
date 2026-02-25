import { BudgetLinesBudgetLineTypeInput } from "@/generated/graphql";

export const getBudgetLineTypeString = (
  lineType: BudgetLinesBudgetLineTypeInput,
) => {
  switch (lineType) {
    case BudgetLinesBudgetLineTypeInput.Income:
      return "recette";
    case BudgetLinesBudgetLineTypeInput.Expense:
      return "dépense";
    default:
      return "autre";
  }
};
