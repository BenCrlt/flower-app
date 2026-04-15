import { inArray } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { OrderOrigin, orderOriginsTable } from "../../../db/schema/index.js";

export async function loadOrderOrigins(
  originIds: number[],
): Promise<(OrderOrigin | null)[]> {
  const originsByOriginId = await db.query.orderOriginsTable
    .findMany({
      where: inArray(orderOriginsTable.id, originIds),
    })
    .then((results) =>
      results.reduce(
        (acc, row) => acc.set(row.id, row),
        new Map<number, OrderOrigin>(),
      ),
    );

  return originIds.map((originId) => originsByOriginId.get(originId) ?? null);
}
