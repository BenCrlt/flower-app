import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import {
  BudgetCategory,
  budgetCategoriesTable,
} from "../../../db/schema/budget-categories";

export const updateBudgetCategoryInput = z.object({
  id: z.number().min(1),
  name: z.string().min(1).max(255).optional(),
});

export const updateBudgetCategory = async (
  input: z.infer<typeof updateBudgetCategoryInput>,
): Promise<BudgetCategory | null> => {
  const { id, ...fieldsToUpdate } = input;
  return db
    .update(budgetCategoriesTable)
    .set(fieldsToUpdate)
    .where(eq(budgetCategoriesTable.id, id))
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
};
