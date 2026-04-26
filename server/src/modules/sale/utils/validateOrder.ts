import z from "zod";
import { db } from "../../../db/index.js";
import { Order, ordersTable } from "../../../db/schema/orders.js";
import { salesTable } from "../../../db/schema/sales.js";
import { AppGraphQLContext } from "../../graphql/context.js";

export const validateOrderInput = z.object({
  editionId: z.number(),
  originId: z.number(),
  sales: z.array(
    z.object({
      budgetLineId: z.number(),
      quantity: z.number(),
    }),
  ),
});

export type ValidateOrderInput = z.infer<typeof validateOrderInput>;

export async function validateOrder(
  input: ValidateOrderInput,
  context: AppGraphQLContext,
): Promise<Order | null> {
  const authorId = context.authSession.user.id;

  const newOrder = await db.transaction(async (tx) => {
    const [insertedOrder] = await tx
      .insert(ordersTable)
      .values({
        editionId: input.editionId,
        originId: input.originId,
        authorId,
      })
      .returning();

    if (!insertedOrder) {
      return null;
    }

    const salesToCreate = input.sales.map((sale) => ({
      budgetLineId: sale.budgetLineId,
      quantity: sale.quantity,
      orderId: insertedOrder.id,
    }));

    await tx.insert(salesTable).values(salesToCreate);

    return insertedOrder;
  });
  return newOrder;
}
