import { StrictDateRange } from "@/components/date-picker";
import {
  BudgetCategoriesItem,
  GetOrdersQuery,
  LineTypeEnum,
} from "@/generated/graphql";
import { useEdition } from "@/features/edition/EditionContext";
import { useGetBudgetLinesQuery } from "@/features/budget/hooks/useGetBudgetLinesQuery";
import { eachDayOfInterval, endOfDay, startOfDay } from "date-fns";
import { useMemo, useState } from "react";
import { SalesChart } from "./sales-chart";
import { TopProductsCard } from "./top-products-card";

interface Props {
  orders: GetOrdersQuery["orders"];
  dateRange: StrictDateRange;
}

export const SalesInfo = ({ orders, dateRange }: Props) => {
  const { edition } = useEdition();
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const { data: incomeBudgetLines } = useGetBudgetLinesQuery({
    variables: {
      editionId: edition.id,
      budgetLineType: LineTypeEnum.Income,
    },
  });

  const forecastAvgDailyQuantity = useMemo(() => {
    const lines = incomeBudgetLines?.budgetLines ?? [];
    const filtered =
      selectedCategoryIds.length === 0
        ? lines
        : lines.filter(
            (line) =>
              line.category?.id != null &&
              selectedCategoryIds.includes(line.category.id),
          );
    const totalForecastUnits = filtered.reduce(
      (sum, line) => sum + line.estimatedQuantity,
      0,
    );
    const editionDays = Math.max(
      1,
      eachDayOfInterval({
        start: startOfDay(new Date(edition.startDate)),
        end: endOfDay(new Date(edition.endDate)),
      }).length,
    );
    return totalForecastUnits / editionDays;
  }, [
    edition.endDate,
    edition.startDate,
    incomeBudgetLines?.budgetLines,
    selectedCategoryIds,
  ]);

  const handleSelectCategory = (categoryId: number, checked: boolean) => {
    setSelectedCategoryIds((previous) => {
      if (checked) {
        return [...previous, categoryId];
      }
      return previous.filter((id) => id !== categoryId);
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

  const filteredSales = useMemo(
    () =>
      orders.flatMap((order) =>
        order.sales.filter((sale) => {
          if (!selectedCategoryIds.length || !sale.budgetLine?.category?.id) {
            return true;
          }
          return selectedCategoryIds.includes(sale.budgetLine.category.id);
        }),
      ),
    [orders, selectedCategoryIds],
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
      <SalesChart
        filteredSales={filteredSales}
        selectedCategoryIds={selectedCategoryIds}
        categoryOptions={categoryOptions}
        handleSelectCategory={handleSelectCategory}
        range={dateRange}
        forecastAvgDailyQuantity={forecastAvgDailyQuantity}
      />
      <TopProductsCard filteredSales={filteredSales} />
    </div>
  );
};
