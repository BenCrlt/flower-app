import z from "zod";
import { db } from "../../../db";
import {
  BudgetCategory,
  budgetCategoriesTable,
} from "../../../db/schema/budget-categories";

export const addBudgetCategoryInput = z.object({
  name: z.string().min(1).max(255),
});

export const addBudgetCategory = async (
  input: z.infer<typeof addBudgetCategoryInput>,
): Promise<BudgetCategory | null> => {
  return db
    .insert(budgetCategoriesTable)
    .values(input)
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
};
