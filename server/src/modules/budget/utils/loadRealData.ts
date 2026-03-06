import { inArray, sql } from "drizzle-orm";
import { db } from "../../../db";
import { paymentsTable } from "../../../db/schema";

export const loadRealCost = async (
  lineIds: number[],
): Promise<(number | null)[]> => {
  const realCostByLineId = await db
    .select({
      lineId: paymentsTable.budgetLineId,
      cost: sql<number>`sum(${paymentsTable.quantity} * ${paymentsTable.unitPrice})`,
    })
    .from(paymentsTable)
    .where(inArray(paymentsTable.budgetLineId, lineIds))
    .groupBy(paymentsTable.budgetLineId)
    .then((rows) =>
      rows.reduce(
        (map, row) => map.set(row.lineId, row.cost),
        new Map<number, number>(),
      ),
    );

  return lineIds.map((lineId) => realCostByLineId.get(lineId) ?? null);
};
