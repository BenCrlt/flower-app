import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import {
  BudgetLine,
  budgetLinesTable,
} from "../../../db/schema/budget-lines.js";
import { LineTypeEnum } from "../types.js";
import {
  assertFreePriceAllowedForLineType,
  assertFreePriceCanChange,
} from "./freePriceRules.js";
import { loadSalesCount } from "./loadSalesCount.js";

export const updateBudgetLineInput = z.object({
  id: z.number().min(1),
  name: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  lineType: LineTypeEnum.optional(),
  editionId: z.number().min(1).optional(),
  budgetCategoryId: z.number().min(1).optional(),
  estimatedQuantity: z.number().int().min(0).optional(),
  estimatedUnitPrice: z.number().min(0).optional(),
  helloAssoProductId: z.number().min(1).optional(),
  isFreePrice: z.boolean().optional(),
});

export const updateBudgetLine = async (
  input: z.infer<typeof updateBudgetLineInput>,
): Promise<BudgetLine | null> => {
  const { id, isFreePrice, ...fieldsToUpdate } = input;

  const existing = await db.query.budgetLinesTable.findFirst({
    where: eq(budgetLinesTable.id, id),
  });

  if (!existing) {
    return null;
  }

  const nextLineType = fieldsToUpdate.lineType ?? existing.lineType;
  const nextIsFreePrice = isFreePrice ?? existing.isFreePrice;

  assertFreePriceAllowedForLineType(nextLineType, nextIsFreePrice);

  if (isFreePrice !== undefined) {
    const salesCounts = await loadSalesCount([id]);
    await assertFreePriceCanChange(
      id,
      existing.isFreePrice,
      isFreePrice,
      salesCounts[0] ?? null,
    );
  }

  return db
    .update(budgetLinesTable)
    .set({
      ...fieldsToUpdate,
      ...(isFreePrice !== undefined ? { isFreePrice } : {}),
      estimatedUnitPrice: fieldsToUpdate.estimatedUnitPrice?.toString(),
    })
    .where(eq(budgetLinesTable.id, id))
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
};
