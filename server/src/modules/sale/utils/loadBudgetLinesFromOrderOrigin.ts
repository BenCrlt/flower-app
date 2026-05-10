import { inArray } from "drizzle-orm";
import {
  BudgetLine,
  orderOriginBudgetLinesTable,
} from "../../../db/schema/index.js";
import { db } from "../../../index.js";

export async function loadBudgetLinesFromOrderOrigin(
  orderOriginIds: number[],
): Promise<BudgetLine[][]> {
  const budgetLines = await db.query.orderOriginBudgetLinesTable
    .findMany({
      where: inArray(orderOriginBudgetLinesTable.orderOriginId, orderOriginIds),
      with: { budgetLine: true },
    })
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
