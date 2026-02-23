import { and, eq, inArray } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import { BudgetLine, budgetLinesTable, lineTypeEnum } from "../../../db/schema";
import { paginatedSchema } from "../../type";
import { getOffsetFromPagination } from "../../utils";

export const getBudgetLinesFilter = z.object({
  categoryIds: z.array(z.number().min(1)).optional(),
  budgetLineType: z.enum(lineTypeEnum.enumValues).optional(),
  editionId: z.number().min(1),
  paginatedInput: paginatedSchema,
});

export const getBudgetLines = async ({
  editionId,
  categoryIds,
  paginatedInput,
  budgetLineType,
}: z.infer<typeof getBudgetLinesFilter>): Promise<BudgetLine[]> => {
  const offset = getOffsetFromPagination(paginatedInput);

  return db.query.budgetLinesTable.findMany({
    where: and(
      eq(budgetLinesTable.editionId, editionId),
      categoryIds
        ? inArray(budgetLinesTable.budgetCategoryId, categoryIds)
        : undefined,
      budgetLineType
        ? eq(budgetLinesTable.lineType, budgetLineType)
        : undefined,
    ),
    limit: paginatedInput.limit,
    offset,
  });
};
