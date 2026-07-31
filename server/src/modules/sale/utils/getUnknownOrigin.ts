import { eq } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { OrderOrigin, orderOriginsTable } from "../../../db/schema/index.js";

export const UNKNOWN_ORIGIN_NAME = "Inconnu";

export async function getUnknownOrigin(): Promise<OrderOrigin> {
  const unknownOrigin = await db.query.orderOriginsTable.findFirst({
    where: eq(orderOriginsTable.name, UNKNOWN_ORIGIN_NAME),
  });

  if (unknownOrigin) {
    return unknownOrigin;
  }

  const [newUnknownOrigin] = await db
    .insert(orderOriginsTable)
    .values({
      name: UNKNOWN_ORIGIN_NAME,
    })
    .returning();

  if (!newUnknownOrigin) {
    throw new Error("[Editions] getUnknownOrigin: Failed to create origin");
  }

  return newUnknownOrigin;
}
