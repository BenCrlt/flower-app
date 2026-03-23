import { and, eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import { BudgetLine, budgetLinesTable } from "../../../db/schema/index.js";
import { LineTypeEnum } from "../types.js";

export const getBudgetLinesFilter = z.object({
  budgetLineType: LineTypeEnum.optional(),
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
