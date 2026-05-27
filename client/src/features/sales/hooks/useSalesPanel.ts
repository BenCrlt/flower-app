import {
  DateRangeQuickFilter,
  StrictDateRange,
} from "@/components/date-picker";
import { useEdition } from "@/features/edition/EditionContext";
import { BudgetCategoriesItem, GetOrdersQuery } from "@/generated/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { subMonths } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { getColumns, SalesTableRow } from "../components/columns";
import {
  filterSalesForChart,
  orderMatchesChartFilters,
} from "../utils/salesFilters";
import { buildSalesDateRangeQuickFilters } from "../utils/salesDateRangeQuickFilters";
import { getSaleEffectiveUnitPrice } from "../utils/salePrice";
import { useGetOrdersQuery } from "./getOrdersQuery";
import { useGetOrderOriginsQuery } from "./useGetOrderOrigins";

interface UseSalesPanelResult {
  originIdsFilter: number[];
  handleSelectOrigin: (originId: number, checked: boolean) => void;
  originOptions: { id: number; name: string }[];
  dateRange: StrictDateRange;
  handleSelectDateRange: (dateRange: StrictDateRange) => void;
  dateRangeQuickFilters: DateRangeQuickFilter[];
  orders: GetOrdersQuery["orders"];
  columns: ColumnDef<SalesTableRow>[];
  rows: SalesTableRow[];
  selectedCategoryIds: number[];
  selectedBudgetLineIds: number[];
  handleSelectCategory: (categoryId: number, checked: boolean) => void;
  handleSelectBudgetLine: (budgetLineId: number, checked: boolean) => void;
  categoryOptions: Pick<BudgetCategoriesItem, "id" | "name" | "color">[];
  articleOptions: { id: number; name: string }[];
  chartFilteredSales: GetOrdersQuery["orders"][number]["sales"];
}

function mapOrderToTableRow(
  order: GetOrdersQuery["orders"][number],
): SalesTableRow {
  return {
    id: order.id,
    totalAmount: order.totalAmount,
    executedAt: order.executedAt,
    payerFirstName: order.payerFirstName ?? null,
    payerLastName: order.payerLastName ?? null,
    payerEmail: order.payerEmail ?? null,
    helloAssoOrderId: order.helloAssoOrderId ?? null,
    authorUsername: order.author?.username ?? null,
    sales: order.sales.map((sale) => ({
      id: sale.id,
      budgetLineId: sale.budgetLineId,
      quantity: sale.quantity,
      budgetLineName: sale.budgetLine?.name ?? "Article inconnu",
      estimatedUnitPrice: getSaleEffectiveUnitPrice(sale),
      categoryName: sale.budgetLine?.category?.name ?? null,
      categoryColor: sale.budgetLine?.category?.color ?? null,
    })),
    originName: order.origin?.name ?? "Inconnu",
  };
}

export function useSalesPanel(): UseSalesPanelResult {
  const { edition } = useEdition();
  const [originIdsFilter, setOriginIdsFilter] = useState<number[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [selectedBudgetLineIds, setSelectedBudgetLineIds] = useState<number[]>(
    [],
  );
  const [dateRange, setDateRange] = useState<StrictDateRange>({
    from: subMonths(new Date(), 2),
    to: new Date(),
  });

  const { data: orderOriginsOptions } = useGetOrderOriginsQuery({});

  const { data } = useGetOrdersQuery({
    variables: {
      editionId: edition.id,
      from: dateRange.from ? dateRange.from.toISOString() : undefined,
      to: dateRange.to ? dateRange.to.toISOString() : undefined,
      originIds: originIdsFilter.length ? originIdsFilter : undefined,
    },
  });

  const orders = data?.orders ?? [];

  const handleSelectOrigin = (originId: number, checked: boolean) => {
    setOriginIdsFilter((previous) => {
      if (checked) {
        return [...previous, originId];
      }
      return previous.filter((id) => id !== originId);
    });
  };

  const handleSelectCategory = (categoryId: number, checked: boolean) => {
    setSelectedCategoryIds((previous) => {
      if (checked) {
        return [...previous, categoryId];
      }
      return previous.filter((id) => id !== categoryId);
    });
  };

  const handleSelectBudgetLine = (budgetLineId: number, checked: boolean) => {
    setSelectedBudgetLineIds((previous) => {
      if (checked) {
        return [...previous, budgetLineId];
      }
      return previous.filter((id) => id !== budgetLineId);
    });
  };

  const categoryOptions = useMemo(() => {
    const categories = new Map<
      number,
      Pick<BudgetCategoriesItem, "id" | "name" | "color">
    >();
    orders.forEach((order) =>
      order.sales.forEach((sale) => {
        if (!sale.budgetLine?.category) {
          return;
        }
        categories.set(sale.budgetLine.category.id, {
          id: sale.budgetLine.category.id,
          name: sale.budgetLine.category.name,
          color: sale.budgetLine.category.color,
        });
      }),
    );

    return Array.from(categories.values()).map(({ id, name, color }) => ({
      id,
      name,
      color,
    }));
  }, [orders]);

  const articleOptions = useMemo(() => {
    const articles = new Map<number, { id: number; name: string }>();
    orders.forEach((order) =>
      order.sales.forEach((sale) => {
        if (!sale.budgetLine) {
          return;
        }
        const categoryId = sale.budgetLine.category?.id;
        if (
          selectedCategoryIds.length > 0 &&
          (categoryId == null || !selectedCategoryIds.includes(categoryId))
        ) {
          return;
        }
        articles.set(sale.budgetLine.id, {
          id: sale.budgetLine.id,
          name: sale.budgetLine.name,
        });
      }),
    );

    return Array.from(articles.values()).sort((a, b) =>
      a.name.localeCompare(b.name, "fr"),
    );
  }, [orders, selectedCategoryIds]);

  useEffect(() => {
    setSelectedBudgetLineIds((previous) => {
      if (!previous.length) {
        return previous;
      }
      const validIds = new Set(articleOptions.map((article) => article.id));
      const next = previous.filter((id) => validIds.has(id));
      return next.length === previous.length ? previous : next;
    });
  }, [articleOptions]);

  const chartFilteredSales = useMemo(
    () =>
      filterSalesForChart(orders, selectedCategoryIds, selectedBudgetLineIds),
    [orders, selectedCategoryIds, selectedBudgetLineIds],
  );

  const rows = useMemo<SalesTableRow[]>(() => {
    const ordersForTable = orders.filter((order) =>
      orderMatchesChartFilters(
        order,
        selectedCategoryIds,
        selectedBudgetLineIds,
      ),
    );

    return ordersForTable.map(mapOrderToTableRow);
  }, [orders, selectedCategoryIds, selectedBudgetLineIds]);

  const columns = getColumns();

  const handleSelectDateRange = (nextRange: StrictDateRange) => {
    setDateRange(nextRange);
    setOriginIdsFilter([]);
    setSelectedCategoryIds([]);
    setSelectedBudgetLineIds([]);
  };

  const dateRangeQuickFilters = useMemo<DateRangeQuickFilter[]>(
    () => buildSalesDateRangeQuickFilters(edition),
    [edition.endDate, edition.startDate],
  );

  return {
    originIdsFilter,
    handleSelectOrigin,
    originOptions: orderOriginsOptions?.orderOrigins ?? [],
    dateRange,
    handleSelectDateRange,
    dateRangeQuickFilters,
    columns,
    rows,
    orders,
    selectedCategoryIds,
    selectedBudgetLineIds,
    handleSelectCategory,
    handleSelectBudgetLine,
    categoryOptions,
    articleOptions,
    chartFilteredSales,
  };
}
