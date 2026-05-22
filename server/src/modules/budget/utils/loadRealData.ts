import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { budgetLinesTable } from "../../../db/schema/budget-lines.js";
import {
  invoicesTable,
  LineType,
  paymentsTable,
} from "../../../db/schema/index.js";
import { salesTable } from "../../../db/schema/sales.js";
import { saleLineAmountSql } from "../../sale/utils/saleLineAmountSql.js";

type BudgetLineRef = {
  id: number;
  lineType: LineType;
};

export const loadRealCost = async (
  lines: BudgetLineRef[],
): Promise<(number | null)[]> => {
  const expenseLineIds = lines
    .filter((line) => line.lineType === "expense")
    .map((line) => line.id);
  const incomeLineIds = lines
    .filter((line) => line.lineType === "income")
    .map((line) => line.id);

  const [expenseCostByLineId, incomeRevenueByLineId] = await Promise.all([
    loadExpenseRealCost(expenseLineIds),
    loadIncomeRealRevenue(incomeLineIds),
  ]);

  return lines.map((line) => {
    if (line.lineType === "expense") {
      return expenseCostByLineId.get(line.id) ?? null;
    }
    return incomeRevenueByLineId.get(line.id) ?? null;
  });
};

async function loadExpenseRealCost(
  lineIds: number[],
): Promise<Map<number, number>> {
  if (!lineIds.length) {
    return new Map();
  }

  return db
    .select({
      lineId: paymentsTable.budgetLineId,
      cost: sql<number>`sum(${paymentsTable.quantity} * ${paymentsTable.unitPrice})`,
    })
    .from(paymentsTable)
    .where(
      and(
        inArray(paymentsTable.budgetLineId, lineIds),
        eq(invoicesTable.status, "PAID"),
      ),
    )
    .innerJoin(invoicesTable, eq(paymentsTable.invoiceId, invoicesTable.id))
    .groupBy(paymentsTable.budgetLineId)
    .then((rows) =>
      rows.reduce(
        (map, row) => map.set(row.lineId, row.cost),
        new Map<number, number>(),
      ),
    );
}

async function loadIncomeRealRevenue(
  lineIds: number[],
): Promise<Map<number, number>> {
  if (!lineIds.length) {
    return new Map();
  }

  return db
    .select({
      lineId: salesTable.budgetLineId,
      revenue: sql<number>`sum(${saleLineAmountSql})`,
    })
    .from(salesTable)
    .innerJoin(
      budgetLinesTable,
      eq(salesTable.budgetLineId, budgetLinesTable.id),
    )
    .where(inArray(salesTable.budgetLineId, lineIds))
    .groupBy(salesTable.budgetLineId)
    .then((rows) =>
      rows.reduce(
        (map, row) => map.set(row.lineId, row.revenue),
        new Map<number, number>(),
      ),
    );
}
