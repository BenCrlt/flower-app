import { and, eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import { BudgetLine, budgetLinesTable, lineTypeEnum } from "../../../db/schema";

export const getBudgetLinesFilter = z.object({
  budgetLineType: z.enum(lineTypeEnum.enumValues).optional(),
  editionId: z.number().min(1),
});

export const getBudgetLines = async ({
  editionId,
  budgetLineType,
}: z.infer<typeof getBudgetLinesFilter>): Promise<BudgetLine[]> => {
  return db.query.budgetLinesTable.findMany({
    where: and(
      eq(budgetLinesTable.editionId, editionId),
      budgetLineType
        ? eq(budgetLinesTable.lineType, budgetLineType)
        : undefined,
    ),
  });
};
