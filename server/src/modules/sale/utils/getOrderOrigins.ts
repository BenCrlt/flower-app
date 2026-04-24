import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import { orderOriginsTable } from "../../../db/schema/order-origins.js";

export const getOrderOriginsInput = z.object({
  onlyPhysical: z.boolean().optional(),
});

export async function getOrderOrigins({
  onlyPhysical,
}: z.infer<typeof getOrderOriginsInput>) {
  const where = onlyPhysical
    ? eq(orderOriginsTable.isPhysical, true)
    : undefined;
  return db.query.orderOriginsTable.findMany({ where });
}
