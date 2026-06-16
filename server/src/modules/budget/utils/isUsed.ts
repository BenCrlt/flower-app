import { db } from "../../../db/index.js";

export const areBudgetCategoriesUsed = async (
  categoryIds: number[],
): Promise<boolean[]> => {
  if (!categoryIds.length) {
    return [];
  }

  const budgetLines = await db.query.budgetLinesTable.findMany({
    columns: {
      budgetCategoryId: true,
    },
    where: (table, { inArray }) => inArray(table.budgetCategoryId, categoryIds),
  });
  const usedCategoryIds = new Set(
    budgetLines.map((line) => line.budgetCategoryId),
  );

  return categoryIds.map((id) => usedCategoryIds.has(id));
};

export const isBudgetCategoryUsed = async (categoryId: number): Promise<boolean> =>
  areBudgetCategoriesUsed([categoryId]).then((result) => result[0] ?? false);
