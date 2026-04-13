import { eq } from "drizzle-orm";
import { z } from "zod";
import { ordersTable } from "../../../db/schema/orders.js";
import { db } from "../../../index.js";

export const getOrdersInput = z.object({
  editionId: z.number().min(1),
});

export function getOrders({ editionId }: z.infer<typeof getOrdersInput>) {
  return db.query.ordersTable.findMany({
    where: eq(ordersTable.editionId, editionId),
  });
}
