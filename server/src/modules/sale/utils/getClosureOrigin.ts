import { eq } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { OrderOrigin, orderOriginsTable } from "../../../db/schema/index.js";

export const CLOSURE_ORIGIN_NAME = "Clôture";

export async function getClosureOrigin(): Promise<OrderOrigin> {
  const closureOrigin = await db.query.orderOriginsTable.findFirst({
    where: eq(orderOriginsTable.name, CLOSURE_ORIGIN_NAME),
  });

  if (closureOrigin) {
    return closureOrigin;
  }

  const [newClosureOrigin] = await db
    .insert(orderOriginsTable)
    .values({
      name: CLOSURE_ORIGIN_NAME,
    })
    .returning();

  if (!newClosureOrigin) {
    throw new Error("[Editions] getClosureOrigin: Failed to create origin");
  }

  return newClosureOrigin;
}
