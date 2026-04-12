import { inArray, sql } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { salesTable } from "../../../db/schema/sales.js";

export const loadSalesCount = async (
  budgetLineIds: number[],
): Promise<(number | null)[]> => {
  const salesCountByBudgetLineId = await db
    .select({
      budgetLineId: salesTable.budgetLineId,
      salesCount: sql<number>`sum(${salesTable.quantity})`,
    })
    .from(salesTable)
    .where(inArray(salesTable.budgetLineId, budgetLineIds))
    .groupBy(salesTable.budgetLineId)
    .then((rows) =>
      rows.reduce(
        (map, row) => map.set(row.budgetLineId, row.salesCount),
        new Map<number, number>(),
      ),
    );

  return budgetLineIds.map(
    (budgetLineId) => salesCountByBudgetLineId.get(budgetLineId) ?? null,
  );
};
