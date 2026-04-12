import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import {
  BudgetLine,
  budgetLinesTable,
} from "../../../db/schema/budget-lines.js";
import { salesTable } from "../../../db/schema/index.js";

export const deleteBudgetLineInput = z.object({
  id: z.number().min(1),
});

export const deleteBudgetLine = async ({
  id,
}: z.infer<typeof deleteBudgetLineInput>): Promise<BudgetLine | null> => {
  const salesLinkedToBudgetLine = await db.query.salesTable.findMany({
    where: eq(salesTable.budgetLineId, id),
  });

  if (salesLinkedToBudgetLine?.length) {
    throw new Error("Budget line has sales linked to it");
  }

  return db
    .delete(budgetLinesTable)
    .where(eq(budgetLinesTable.id, id))
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
};
