import z from "zod";
import { db } from "../../../db/index.js";
import {
  BudgetCategory,
  budgetCategoriesTable,
} from "../../../db/schema/budget-categories.js";
import { eq } from "drizzle-orm";

export const upsertBudgetCategoryInput = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(255),
  color: z.string(),
});

export const upsertBudgetCategory = async (
  input: z.infer<typeof upsertBudgetCategoryInput>,
): Promise<BudgetCategory | null> => {
  if (input.id) {
    return db
      .update(budgetCategoriesTable)
      .set({ name: input.name, color: input.color })
      .where(eq(budgetCategoriesTable.id, input.id))
      .returning()
      .then((result) => result[0] ?? null)
      .catch((error) => {
        throw error;
      });
  }
  return db
    .insert(budgetCategoriesTable)
    .values(input)
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
};
