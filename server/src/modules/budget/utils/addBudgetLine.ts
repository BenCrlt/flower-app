import z from "zod";
import { db } from "../../../db/index.js";
import {
  BudgetLine,
  budgetLinesTable,
} from "../../../db/schema/budget-lines.js";
import { productsTable } from "../../../db/schema/index.js";
import { LineTypeEnum } from "../types.js";

export const addBudgetLineInput = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  lineType: LineTypeEnum,
  editionId: z.number(),
  budgetCategoryId: z.number(),
  estimatedQuantity: z.number().int().min(0),
  estimatedUnitPrice: z.number().min(0),
});

export const addBudgetLine = async (
  input: z.infer<typeof addBudgetLineInput>,
): Promise<BudgetLine | null> => {
  const budgetLineAdded = await db
    .insert(budgetLinesTable)
    .values({
      ...input,
      estimatedUnitPrice: input.estimatedUnitPrice.toString(),
    })
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });

  if (budgetLineAdded?.lineType === "income") {
    await db.insert(productsTable).values({
      name: budgetLineAdded.name,
      unitPrice: budgetLineAdded.estimatedUnitPrice,
      budgetLineId: budgetLineAdded.id,
      editionId: budgetLineAdded.editionId,
    });
  }

  return budgetLineAdded;
};
