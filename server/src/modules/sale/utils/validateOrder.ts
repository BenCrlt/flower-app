import { inArray } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import { budgetLinesTable } from "../../../db/schema/budget-lines.js";
import { Order, ordersTable } from "../../../db/schema/orders.js";
import { salesTable } from "../../../db/schema/sales.js";
import { AppGraphQLContext } from "../../graphql/context.js";

const saleUnitPriceSchema = z.number().min(0.01).max(500);

export const validateOrderInput = z.object({
  editionId: z.number(),
  originId: z.number(),
  paymentMethod: z.enum(["cash", "card"]),
  sales: z.array(
    z.object({
      budgetLineId: z.number(),
      quantity: z.number().int().min(1),
      unitPrice: saleUnitPriceSchema.optional(),
    }),
  ),
});

export type ValidateOrderInput = z.infer<typeof validateOrderInput>;

export async function validateOrder(
  { editionId, originId, paymentMethod, sales }: ValidateOrderInput,
  context: AppGraphQLContext,
): Promise<Order | null> {
  const authorId = context.authSession.user.id;

  const budgetLineIds = [...new Set(sales.map((sale) => sale.budgetLineId))];
  const budgetLines = await db.query.budgetLinesTable.findMany({
    where: inArray(budgetLinesTable.id, budgetLineIds),
  });
  const budgetLineById = new Map(budgetLines.map((line) => [line.id, line]));

  for (const sale of sales) {
    const budgetLine = budgetLineById.get(sale.budgetLineId);
    if (!budgetLine) {
      throw new Error(`Ligne budget introuvable : ${sale.budgetLineId}`);
    }

    if (budgetLine.isFreePrice) {
      if (sale.unitPrice === undefined) {
        throw new Error(
          `Montant requis pour le produit à prix libre : ${budgetLine.name}`,
        );
      }
      if (sale.quantity !== 1) {
        throw new Error(
          `Quantité invalide pour le produit à prix libre : ${budgetLine.name}`,
        );
      }
    } else if (sale.unitPrice !== undefined) {
      throw new Error(
        `Montant personnalisé interdit pour : ${budgetLine.name}`,
      );
    }
  }

  const newOrder = await db.transaction(async (tx) => {
    const [insertedOrder] = await tx
      .insert(ordersTable)
      .values({
        editionId,
        originId,
        authorId,
        paymentMethod,
      })
      .returning();

    if (!insertedOrder) {
      return null;
    }

    const salesToCreate = sales.map((sale) => ({
      budgetLineId: sale.budgetLineId,
      quantity: sale.quantity,
      orderId: insertedOrder.id,
      unitPrice:
        sale.unitPrice !== undefined ? sale.unitPrice.toString() : null,
    }));

    await tx.insert(salesTable).values(salesToCreate);

    return insertedOrder;
  });
  return newOrder;
};
