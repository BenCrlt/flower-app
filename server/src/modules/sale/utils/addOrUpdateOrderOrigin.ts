import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import { OrderOrigin, orderOriginsTable } from "../../../db/schema/index.js";

export const addOrUpdateOrderOriginInput = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(255),
});

export async function addOrUpdateOrderOrigin({
  id,
  name,
}: z.infer<typeof addOrUpdateOrderOriginInput>): Promise<OrderOrigin | null> {
  if (id) {
    const [updatedOrderOrigin] = await db
      .update(orderOriginsTable)
      .set({ name })
      .where(eq(orderOriginsTable.id, id))
      .returning();

    return updatedOrderOrigin ?? null;
  }

  const [newOrderOrigin] = await db
    .insert(orderOriginsTable)
    .values({ name, isPhysical: true })
    .returning();

  return newOrderOrigin ?? null;
}
