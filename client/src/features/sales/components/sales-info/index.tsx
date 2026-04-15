import { StrictDateRange } from "@/components/date-picker";
import { BudgetCategoriesItem, GetOrdersQuery } from "@/generated/graphql";
import { useMemo, useState } from "react";
import { SalesChart } from "./sales-chart";
import { TopProductsCard } from "./top-products-card";

interface Props {
  orders: GetOrdersQuery["orders"];
  dateRange: StrictDateRange;
}

export const SalesInfo = ({ orders, dateRange }: Props) => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

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
      />
      <TopProductsCard filteredSales={filteredSales} />
    </div>
  );
};
