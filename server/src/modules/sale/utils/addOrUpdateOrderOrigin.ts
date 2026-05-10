import { eq, inArray } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import {
  budgetLinesTable,
  OrderOrigin,
  orderOriginBudgetLinesTable,
  orderOriginsTable,
} from "../../../db/schema/index.js";

export const addOrUpdateOrderOriginInput = z.object({
  id: z.number().optional(),
  name: z.string().min(1).max(255),
  budgetLineIds: z.array(z.number()).nullish(),
});

async function syncOrderOriginBudgetLines(
  tx: Parameters<Parameters<(typeof db)["transaction"]>[0]>[0],
  orderOriginId: number,
  budgetLineIds: number[],
): Promise<void> {
  const uniqueIds = [...new Set(budgetLineIds)];
  if (uniqueIds.length > 0) {
    const existing = await tx.query.budgetLinesTable.findMany({
      where: inArray(budgetLinesTable.id, uniqueIds),
      columns: { id: true },
    });
    if (existing.length !== uniqueIds.length) {
      throw new Error(
        "Une ou plusieurs lignes budgétaires sont invalides",
      );
    }
  }

  await tx
    .delete(orderOriginBudgetLinesTable)
    .where(eq(orderOriginBudgetLinesTable.orderOriginId, orderOriginId));

  if (uniqueIds.length > 0) {
    await tx.insert(orderOriginBudgetLinesTable).values(
      uniqueIds.map((budgetLineId) => ({
        orderOriginId,
        budgetLineId,
      })),
    );
  }
}

export async function addOrUpdateOrderOrigin({
  id,
  name,
  budgetLineIds,
}: z.infer<typeof addOrUpdateOrderOriginInput>): Promise<OrderOrigin | null> {
  return db.transaction(async (tx) => {
    let orderOrigin: OrderOrigin | null;

    if (id) {
      const [updatedOrderOrigin] = await tx
        .update(orderOriginsTable)
        .set({ name })
        .where(eq(orderOriginsTable.id, id))
        .returning();

      orderOrigin = updatedOrderOrigin ?? null;
    } else {
      const [newOrderOrigin] = await tx
        .insert(orderOriginsTable)
        .values({ name, isPhysical: true })
        .returning();

      orderOrigin = newOrderOrigin ?? null;
    }

    if (!orderOrigin) {
      return null;
    }

    if (budgetLineIds != null) {
      await syncOrderOriginBudgetLines(tx, orderOrigin.id, budgetLineIds);
    }

    return orderOrigin;
  });
}
