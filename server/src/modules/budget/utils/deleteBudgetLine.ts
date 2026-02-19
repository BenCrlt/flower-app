import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import { BudgetLine, budgetLinesTable } from "../../../db/schema/budget-lines";

export const deleteBudgetLineInput = z.object({
  id: z.number().min(1),
});

export const deleteBudgetLine = async ({
  id,
}: z.infer<typeof deleteBudgetLineInput>): Promise<BudgetLine | null> => {
  return db
    .delete(budgetLinesTable)
    .where(eq(budgetLinesTable.id, id))
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
};
