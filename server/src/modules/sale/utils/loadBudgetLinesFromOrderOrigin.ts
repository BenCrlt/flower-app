import { and, eq, inArray } from "drizzle-orm";
import {
  budgetLinesTable,
  orderOriginBudgetLinesTable,
} from "../../../db/schema/index.js";
import { db } from "../../../index.js";
import { BudgetLine } from "../../../db/schema/budget-lines.js";

export async function loadBudgetLinesFromOrderOrigin(
  orderOriginIds: number[],
  editionId: number,
): Promise<BudgetLine[][]> {
  const budgetLines = await db
    .select({
      orderOriginId: orderOriginBudgetLinesTable.orderOriginId,
      budgetLine: budgetLinesTable,
    })
    .from(orderOriginBudgetLinesTable)
    .innerJoin(
      budgetLinesTable,
      eq(orderOriginBudgetLinesTable.budgetLineId, budgetLinesTable.id),
    )
    .where(
      and(
        inArray(orderOriginBudgetLinesTable.orderOriginId, orderOriginIds),
        eq(budgetLinesTable.editionId, editionId),
      ),
    )
    .then((results) =>
      results.reduce(
        (acc, row) =>
          acc.set(row.orderOriginId, [
            ...(acc.get(row.orderOriginId) ?? []),
            row.budgetLine,
          ]),
        new Map<number, BudgetLine[]>(),
      ),
    );
  return orderOriginIds.map(
    (orderOriginId) => budgetLines.get(orderOriginId) ?? [],
  );
}
