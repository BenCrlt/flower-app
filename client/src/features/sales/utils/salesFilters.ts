import { GetOrdersQuery } from "@/generated/graphql";

export type OrderSale = GetOrdersQuery["orders"][number]["sales"][number];

export function saleMatchesChartFilters(
  sale: OrderSale,
  selectedCategoryIds: number[],
  selectedBudgetLineIds: number[],
): boolean {
  if (selectedCategoryIds.length > 0) {
    const categoryId = sale.budgetLine?.category?.id;
    if (categoryId == null || !selectedCategoryIds.includes(categoryId)) {
      return false;
    }
  }

  if (selectedBudgetLineIds.length > 0) {
    if (!selectedBudgetLineIds.includes(sale.budgetLineId)) {
      return false;
    }
  }

  return true;
}

export function orderMatchesChartFilters(
  order: GetOrdersQuery["orders"][number],
  selectedCategoryIds: number[],
  selectedBudgetLineIds: number[],
): boolean {
  if (!selectedCategoryIds.length && !selectedBudgetLineIds.length) {
    return true;
  }

  return order.sales.some((sale) =>
    saleMatchesChartFilters(sale, selectedCategoryIds, selectedBudgetLineIds),
  );
}

export function filterSalesForChart(
  orders: GetOrdersQuery["orders"],
  selectedCategoryIds: number[],
  selectedBudgetLineIds: number[],
): OrderSale[] {
  return orders.flatMap((order) =>
    order.sales.filter((sale) =>
      saleMatchesChartFilters(sale, selectedCategoryIds, selectedBudgetLineIds),
    ),
  );
}
