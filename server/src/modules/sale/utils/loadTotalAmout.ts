import { eq, inArray, sql } from "drizzle-orm";
import { budgetLinesTable } from "../../../db/schema/budget-lines.js";
import { salesTable } from "../../../db/schema/sales.js";
import { db } from "../../../index.js";
import { saleLineAmountSql } from "./saleLineAmountSql.js";

export async function loadTotalAmount(orderIds: number[]): Promise<number[]> {
  const totalAmountByOrderId = await db
    .select({
      orderId: salesTable.orderId,
      totalAmount: sql<number>`sum(${saleLineAmountSql})`,
    })
    .from(salesTable)
    .innerJoin(
      budgetLinesTable,
      eq(salesTable.budgetLineId, budgetLinesTable.id),
    )
    .where(inArray(salesTable.orderId, orderIds))
    .groupBy(salesTable.orderId)
    .execute()
    .then((results) =>
      results.reduce(
        (acc, row) => acc.set(row.orderId, row.totalAmount),
        new Map<number, number>(),
      ),
    );

  return orderIds.map((orderId) => totalAmountByOrderId.get(orderId) || 0);
}
