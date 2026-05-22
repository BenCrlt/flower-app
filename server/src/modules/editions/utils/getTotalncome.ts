import { eq, inArray, sql } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { budgetLinesTable } from "../../../db/schema/budget-lines.js";
import { salesTable } from "../../../db/schema/sales.js";
import { saleLineAmountSql } from "../../sale/utils/saleLineAmountSql.js";

export const loadTotalIncome = async (editionIds: number[]) => {
  const totalIncomeByEditionId = await db
    .select({
      editionId: budgetLinesTable.editionId,
      total: sql<number>`sum(${saleLineAmountSql})`,
    })
    .from(budgetLinesTable)
    .innerJoin(salesTable, eq(budgetLinesTable.id, salesTable.budgetLineId))
    .where(inArray(budgetLinesTable.editionId, editionIds))
    .groupBy(budgetLinesTable.editionId)
    .execute()
    .then((results) => {
      return results.reduce((acc, row) => {
        acc.set(row.editionId, row.total);
        return acc;
      }, new Map<number, number>());
    });
  return editionIds.map(
    (editionId) => totalIncomeByEditionId.get(editionId) ?? 0,
  );
};
