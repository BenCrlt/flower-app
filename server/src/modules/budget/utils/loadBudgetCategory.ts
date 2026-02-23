import { db } from "../../../db";
import { BudgetCategory } from "../../../db/schema";

export const loadBudgetCategory = async (
  categoryIds: number[],
): Promise<(BudgetCategory | null)[]> => {
  if (!categoryIds.length) {
    return [];
  }
  const categories = await db.query.budgetCategoriesTable.findMany({
    where: (table, { inArray }) => inArray(table.id, categoryIds),
  });
  const categoryById = new Map(categories.map((c) => [c.id, c]));
  return categoryIds.map((id) => categoryById.get(id) ?? null);
};
