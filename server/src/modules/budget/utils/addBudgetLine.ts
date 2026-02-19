import z from "zod";
import { db } from "../../../db";
import { BudgetLine, budgetLinesTable } from "../../../db/schema/budget-lines";

export const addBudgetLineInput = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  lineType: z.enum(["income", "expense"]),
  editionId: z.number(),
  budgetCategoryId: z.number(),
  estimatedQuantity: z.number().int().min(0).optional(),
  estimatedUnitPrice: z.number().int().min(0).optional(),
});

export const addBudgetLine = async (
  input: z.infer<typeof addBudgetLineInput>,
): Promise<BudgetLine | null> => {
  return db
    .insert(budgetLinesTable)
    .values(input)
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
};
