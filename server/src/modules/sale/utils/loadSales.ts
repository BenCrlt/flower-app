import { inArray } from "drizzle-orm";
import { Sale, salesTable } from "../../../db/schema/sales.js";
import { db } from "../../../index.js";

export async function loadSales(orderIds: number[]): Promise<Sale[][]> {
  const salesByOrderId = await db
    .select()
    .from(salesTable)
    .where(inArray(salesTable.orderId, orderIds))
    .groupBy(salesTable.orderId)
    .execute()
    .then((results) =>
      results.reduce(
        (acc, row) =>
          acc.set(row.orderId, [...(acc.get(row.orderId) ?? []), row]),
        new Map<number, Sale[]>(),
      ),
    );

  return orderIds.map((orderId) => salesByOrderId.get(orderId) ?? []);
}
