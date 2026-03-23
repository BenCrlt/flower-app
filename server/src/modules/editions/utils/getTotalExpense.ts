import { and, eq, inArray, ne, sql } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { invoicesTable, paymentsTable } from "../../../db/schema/index.js";

export async function getTotalExpense(editionIds: number[]): Promise<number[]> {
  const totalExpenseByEditionId = await db
    .select({
      editionId: invoicesTable.editionId,
      total: sql<number>`sum(${paymentsTable.quantity} * ${paymentsTable.unitPrice})`,
    })
    .from(invoicesTable)
    .where(
      and(
        inArray(invoicesTable.editionId, editionIds),
        ne(invoicesTable.status, "CANCELLED"),
      ),
    )
    .innerJoin(paymentsTable, eq(paymentsTable.invoiceId, invoicesTable.id))
    .groupBy(invoicesTable.editionId)
    .then((results) =>
      results.reduce(
        (acc, row) => acc.set(row.editionId, row.total),
        new Map<number, number>(),
      ),
    );

  return editionIds.map(
    (editionId) => totalExpenseByEditionId.get(editionId) || 0,
  );
}
