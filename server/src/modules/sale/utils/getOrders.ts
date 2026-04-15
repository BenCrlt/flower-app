import { and, eq, gte, lt } from "drizzle-orm";
import { z } from "zod";
import { ordersTable } from "../../../db/schema/orders.js";
import { db } from "../../../index.js";

export const getOrdersInput = z.object({
  editionId: z.number().min(1),
  from: z.string().optional(),
  to: z.string().optional(),
});

export function getOrders({
  editionId,
  from,
  to,
}: z.infer<typeof getOrdersInput>) {
  return db.query.ordersTable.findMany({
    where: and(
      eq(ordersTable.editionId, editionId),
      from ? gte(ordersTable.executedAt, new Date(from)) : undefined,
      to ? lt(ordersTable.executedAt, new Date(to)) : undefined,
    ),
  });
}
