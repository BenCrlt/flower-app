import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import {
  BudgetLine,
  budgetLinesTable,
} from "../../../db/schema/budget-lines";
import { lineTypeSchema } from "../types";

export const updateBudgetLineInput = z.object({
  id: z.number().min(1),
  name: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  lineType: lineTypeSchema.optional(),
  editionId: z.number().min(1).optional(),
  budgetCategoryId: z.number().min(1).optional(),
  estimatedQuantity: z.number().int().min(0).optional(),
  estimatedUnitPrice: z.number().int().min(0).optional(),
});

export const updateBudgetLine = async (
  input: z.infer<typeof updateBudgetLineInput>,
): Promise<BudgetLine | null> => {
  const { id, ...fieldsToUpdate } = input;
  return db
    .update(budgetLinesTable)
    .set(fieldsToUpdate)
    .where(eq(budgetLinesTable.id, id))
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
};
