import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import {
  BudgetCategory,
  budgetCategoriesTable,
} from "../../../db/schema/budget-categories";

export const deleteBudgetCategoryInput = z.object({
  id: z.number().min(1),
});

export const deleteBudgetCategory = async ({
  id,
}: z.infer<typeof deleteBudgetCategoryInput>): Promise<BudgetCategory | null> => {
  return db
    .delete(budgetCategoriesTable)
    .where(eq(budgetCategoriesTable.id, id))
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
};
