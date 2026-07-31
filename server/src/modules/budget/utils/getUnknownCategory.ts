import { eq } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { BudgetCategory, budgetCategoriesTable } from "../../../db/schema/index.js";

export const UNKNOWN_CATEGORY_NAME = "Inconnu";
export const UNKNOWN_CATEGORY_COLOR = "#9CA3AF";

export async function getUnknownCategory(): Promise<BudgetCategory> {
  const unknownCategory = await db.query.budgetCategoriesTable.findFirst({
    where: eq(budgetCategoriesTable.name, UNKNOWN_CATEGORY_NAME),
  });

  if (unknownCategory) {
    return unknownCategory;
  }

  const [newUnknownCategory] = await db
    .insert(budgetCategoriesTable)
    .values({
      name: UNKNOWN_CATEGORY_NAME,
      color: UNKNOWN_CATEGORY_COLOR,
    })
    .returning();

  if (!newUnknownCategory) {
    throw new Error(
      "[Editions] getUnknownCategory: Failed to create category",
    );
  }

  return newUnknownCategory;
}
