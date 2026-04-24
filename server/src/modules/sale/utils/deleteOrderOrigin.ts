import { eq } from "drizzle-orm";
import { z } from "zod";
import { OrderOrigin, orderOriginsTable } from "../../../db/schema/index.js";
import { db } from "../../../index.js";

export const deleteOrderOriginInput = z.object({
  id: z.number().min(1),
});

export async function deleteOrderOrigin({
  id,
}: z.infer<typeof deleteOrderOriginInput>): Promise<OrderOrigin | null> {
  return db
    .delete(orderOriginsTable)
    .where(eq(orderOriginsTable.id, id))
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
}
