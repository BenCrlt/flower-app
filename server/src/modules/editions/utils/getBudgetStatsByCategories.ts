import { and, eq, sql } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import {
  budgetCategoriesTable,
  budgetLinesTable,
  LineType,
  paymentsTable,
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
  const totalEstimatedStats = await db
    .select({
      categoryId: budgetCategoriesTable.id,
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

  const totalStats = await getTotalByCategoryIdFromLineType(
    editionId,
    lineType,
  );

  return totalEstimatedStats.map((stat) => ({
    categoryName: stat.categoryName,
    totalEstimated: stat.totalEstimated,
    total: totalStats[stat.categoryId] ?? 0,
  }));
};

const getTotalByCategoryIdFromLineType = async (
  editionId: number,
  lineType: LineType,
): Promise<Record<number, number>> => {
  switch (lineType) {
    case "expense":
      return getTotalExpenseStatsByCategoryId(editionId);
    case "income":
    default:
      return {};
  }
};

const getTotalExpenseStatsByCategoryId = async (
  editionId: number,
): Promise<Record<number, number>> => {
  const totalEstimatedStats = await db
    .select({
      categoryId: budgetLinesTable.budgetCategoryId,
      total: sql<number>`sum(${paymentsTable.quantity} * ${paymentsTable.unitPrice})`,
    })
    .from(paymentsTable)
    .innerJoin(
      budgetLinesTable,
      eq(paymentsTable.budgetLineId, budgetLinesTable.id),
    )
    .where(eq(paymentsTable.editionId, editionId))
    .groupBy(budgetLinesTable.budgetCategoryId);

  return totalEstimatedStats.reduce(
    (acc, stat) => {
      acc[stat.categoryId] = stat.total;
      return acc;
    },
    {} as Record<number, number>,
  );
};
