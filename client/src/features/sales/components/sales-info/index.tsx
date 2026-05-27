import { StrictDateRange } from "@/components/date-picker";
import { GetOrdersQuery } from "@/generated/graphql";
import { SalesChart } from "./sales-chart";
import { TopProductsCard } from "./top-products-card";

interface Props {
  dateRange: StrictDateRange;
  filteredSales: GetOrdersQuery["orders"][number]["sales"];
}

export const SalesInfo = ({ dateRange, filteredSales }: Props) => {
  return (
    <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
      <SalesChart filteredSales={filteredSales} range={dateRange} />
      <TopProductsCard filteredSales={filteredSales} />
    </div>
  );
};
