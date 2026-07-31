import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import {
  budgetLinesTable,
  Edition,
  editionsTable,
  ordersTable,
  salesTable,
} from "../../../db/schema/index.js";
import { getUnknownCategory } from "../../budget/utils/getUnknownCategory.js";
import { AppGraphQLContext } from "../../graphql/context.js";
import { getUnknownOrigin } from "../../sale/utils/getUnknownOrigin.js";
import { getTotalExpense } from "./getTotalExpense.js";
import { loadTotalIncome } from "./getTotalncome.js";

export const closeEditionInput = z.object({
  editionId: z.number().min(1),
  incomeAdjustment: z.number().default(0),
  nextEditionName: z.string().min(2).max(100),
  nextEditionStartDate: z.string().datetime(),
  nextEditionEndDate: z.string().datetime(),
});

export type CloseEditionInput = z.infer<typeof closeEditionInput>;

export async function closeEdition(
  input: CloseEditionInput,
  context: AppGraphQLContext,
): Promise<Edition | null> {
  const authorId = context.authSession.user.id;

  const closedEdition = await db.query.editionsTable.findFirst({
    where: eq(editionsTable.id, input.editionId),
  });

  if (!closedEdition) {
    throw new Error("Édition introuvable");
  }

  if (!closedEdition.active) {
    throw new Error("Cette édition n'est pas active");
  }

  const incomeAdjustment = input.incomeAdjustment;

  const [realIncome] = await loadTotalIncome([closedEdition.id]);
  const [realExpense] = await getTotalExpense([closedEdition.id]);

  const closingBalance = Math.round(
    closedEdition.openingBalance +
      Number(realIncome ?? 0) +
      incomeAdjustment -
      Number(realExpense ?? 0),
  );

  const unknownCategory =
    incomeAdjustment !== 0 ? await getUnknownCategory() : null;
  const unknownOrigin =
    incomeAdjustment !== 0 ? await getUnknownOrigin() : null;

  return db.transaction(async (tx) => {
    if (incomeAdjustment !== 0 && unknownCategory && unknownOrigin) {
      const [adjustmentBudgetLine] = await tx
        .insert(budgetLinesTable)
        .values({
          name: "Écart de clôture",
          lineType: "income",
          editionId: closedEdition.id,
          budgetCategoryId: unknownCategory.id,
          estimatedQuantity: 0,
          estimatedUnitPrice: "0.00",
          isFreePrice: false,
        })
        .returning();

      if (!adjustmentBudgetLine) {
        throw new Error(
          "[Editions] closeEdition: Failed to create adjustment budget line",
        );
      }

      const [adjustmentOrder] = await tx
        .insert(ordersTable)
        .values({
          editionId: closedEdition.id,
          originId: unknownOrigin.id,
          authorId,
          paymentMethod: "cash",
        })
        .returning();

      if (!adjustmentOrder) {
        throw new Error(
          "[Editions] closeEdition: Failed to create adjustment order",
        );
      }

      await tx.insert(salesTable).values({
        budgetLineId: adjustmentBudgetLine.id,
        orderId: adjustmentOrder.id,
        quantity: 1,
        unitPrice: incomeAdjustment.toString(),
      });
    }

    await tx
      .update(editionsTable)
      .set({ active: false })
      .where(eq(editionsTable.id, closedEdition.id));

    const [newEdition] = await tx
      .insert(editionsTable)
      .values({
        name: input.nextEditionName,
        startDate: new Date(input.nextEditionStartDate),
        endDate: new Date(input.nextEditionEndDate),
        active: true,
        openingBalance: closingBalance,
      })
      .returning();

    return newEdition ?? null;
  });
}
