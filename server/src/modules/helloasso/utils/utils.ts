import { eq } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { OrderOrigin, orderOriginsTable } from "../../../db/schema/index.js";

const HELLO_ASSO_ORIGIN_NAME = "HelloAsso";

export async function getHelloAssoOrigin(): Promise<OrderOrigin> {
  const helloAssoOrigin = await db.query.orderOriginsTable.findFirst({
    where: eq(orderOriginsTable.name, HELLO_ASSO_ORIGIN_NAME),
  });

  if (helloAssoOrigin) {
    return helloAssoOrigin;
  }

  const [newHelloAssoOrigin] = await db
    .insert(orderOriginsTable)
    .values({
      name: HELLO_ASSO_ORIGIN_NAME,
    })
    .returning();

  if (!newHelloAssoOrigin) {
    throw new Error("[HelloAsso] getHelloAssoOrigin: Failed to create origin");
  }

  return newHelloAssoOrigin;
}
