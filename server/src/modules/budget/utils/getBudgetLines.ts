import { and, asc, eq, isNull } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import { BudgetLine, budgetLinesTable } from "../../../db/schema/index.js";
import { LineTypeEnum } from "../types.js";

export const getBudgetLinesFilter = z.object({
  budgetLineType: LineTypeEnum.optional(),
  editionId: z.number().min(1),
  excludeHelloAsso: z.boolean().optional(),
});

export const getBudgetLines = async ({
  editionId,
  budgetLineType,
  excludeHelloAsso,
}: z.infer<typeof getBudgetLinesFilter>): Promise<BudgetLine[]> => {
  return db.query.budgetLinesTable.findMany({
    where: and(
      eq(budgetLinesTable.editionId, editionId),
      budgetLineType
        ? eq(budgetLinesTable.lineType, budgetLineType)
        : undefined,
      excludeHelloAsso
        ? isNull(budgetLinesTable.helloAssoProductId)
        : undefined,
    ),
    orderBy: [asc(budgetLinesTable.name)],
  });
};
