import z from "zod";
import { db } from "../../../db";
import { BudgetLine, budgetLinesTable } from "../../../db/schema/budget-lines";
import { lineTypeSchema } from "../types";

export const addBudgetLineInput = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  lineType: lineTypeSchema,
  editionId: z.number(),
  budgetCategoryId: z.number(),
  estimatedQuantity: z.number().int().min(0),
  estimatedUnitPrice: z.number().min(0),
});

export const addBudgetLine = async (
  input: z.infer<typeof addBudgetLineInput>,
): Promise<BudgetLine | null> => {
  return db
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
};
