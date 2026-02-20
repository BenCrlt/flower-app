import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "../../../db";
import { budgetLinesTable, LineType } from "../../../db/schema";

export const getTotalEstimatedForEditions = async (
  editionIds: number[],
  lineType: LineType,
): Promise<number[]> => {
  const totalEstimatedByEditionId = await db
    .select({
      editionId: budgetLinesTable.editionId,
      total: sql<number>`sum(${budgetLinesTable.estimatedQuantity} * ${budgetLinesTable.estimatedUnitPrice})`,
    })
    .from(budgetLinesTable)
    .where(
      and(
        inArray(budgetLinesTable.editionId, editionIds),
        eq(budgetLinesTable.lineType, lineType),
      ),
    )
    .groupBy(budgetLinesTable.editionId)
    .then((results) =>
      results.reduce(
        (acc, row) => acc.set(row.editionId, row.total),
        new Map<number, number>(),
      ),
    );

  return editionIds.map(
    (editionId) => totalEstimatedByEditionId.get(editionId) || 0,
  );
};
