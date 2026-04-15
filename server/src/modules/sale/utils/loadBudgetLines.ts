import { inArray } from "drizzle-orm";
import { BudgetLine, budgetLinesTable } from "../../../db/schema/index.js";
import { db } from "../../../index.js";

export async function loadBudgetLines(
  budgetLineIds: number[],
): Promise<(BudgetLine | null)[]> {
  const budgetLines = await db.query.budgetLinesTable
    .findMany({
      where: inArray(budgetLinesTable.id, budgetLineIds),
    })
    .then((results) =>
      results.reduce(
        (acc, row) => acc.set(row.id, row),
        new Map<number, BudgetLine>(),
      ),
    );
  return budgetLineIds.map(
    (budgetLineId) => budgetLines.get(budgetLineId) ?? null,
  );
}
