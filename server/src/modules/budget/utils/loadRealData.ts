import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { invoicesTable, paymentsTable } from "../../../db/schema/index.js";

export const loadRealCost = async (
  lineIds: number[],
): Promise<(number | null)[]> => {
  const realCostByLineId = await db
    .select({
      lineId: paymentsTable.budgetLineId,
      cost: sql<number>`sum(${paymentsTable.quantity} * ${paymentsTable.unitPrice})`,
    })
    .from(paymentsTable)
    .where(
      and(
        inArray(paymentsTable.budgetLineId, lineIds),
        eq(invoicesTable.status, "PAID"),
      ),
    )
    .innerJoin(invoicesTable, eq(paymentsTable.invoiceId, invoicesTable.id))
    .groupBy(paymentsTable.budgetLineId)
    .then((rows) =>
      rows.reduce(
        (map, row) => map.set(row.lineId, row.cost),
        new Map<number, number>(),
      ),
    );

  return lineIds.map((lineId) => realCostByLineId.get(lineId) ?? null);
};
