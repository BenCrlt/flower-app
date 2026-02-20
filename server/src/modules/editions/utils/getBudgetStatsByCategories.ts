import { and, eq, sql } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import {
  budgetCategoriesTable,
  budgetLinesTable,
  LineType,
} from "../../../db/schema";

export const statsByCategoryOutput = z.array(
  z.object({
    categoryName: z.string(),
    totalEstimated: z.number().min(0),
    total: z.number().min(0),
  }),
);

export const getBudgetStatsByCategories = async (
  editionId: number,
  lineType: LineType,
): Promise<z.infer<typeof statsByCategoryOutput>> => {
  const stats = await db
    .select({
      categoryName: budgetCategoriesTable.name,
      totalEstimated: sql<number>`sum(${budgetLinesTable.estimatedQuantity} * ${budgetLinesTable.estimatedUnitPrice})`,
    })
    .from(budgetLinesTable)
    .where(
      and(
        eq(budgetLinesTable.editionId, editionId),
        eq(budgetLinesTable.lineType, lineType),
      ),
    )
    .innerJoin(
      budgetCategoriesTable,
      eq(budgetLinesTable.budgetCategoryId, budgetCategoriesTable.id),
    )
    .groupBy(budgetCategoriesTable.id);

  return stats.map((stat) => ({
    categoryName: stat.categoryName,
    totalEstimated: stat.totalEstimated,
    total: 0,
  }));
};
