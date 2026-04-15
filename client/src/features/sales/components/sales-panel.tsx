import { DataTable } from "@/components/Table/DataTable";
import { TypographyH2 } from "@/components/ui/typography";
import { useSalesPanel } from "../hooks/useSalesPanel";
import { SalesPanelActionsAndFiltersCard } from "./actions-and-filters-card";
import { OrderSalesExpandedRow } from "./order-sales-expanded-row";
import { SalesInfo } from "./sales-info";

export function SalesPanel() {
  const {
    authorIdsFilter,
    handleSelectAuthor,
    authorOptions,
    dateRange,
    columns,
    rows,
    handleSelectDateRange,
    filteredOrders,
  } = useSalesPanel();

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Ventes</TypographyH2>
      <SalesPanelActionsAndFiltersCard
        authorIdsFilter={authorIdsFilter}
        handleSelectAuthor={handleSelectAuthor}
        authorOptions={authorOptions}
        dateRange={dateRange}
        handleSelectDateRange={handleSelectDateRange}
      />
      <SalesInfo filteredOrders={filteredOrders} dateRange={dateRange} />
      <DataTable
        columns={columns}
        data={rows}
        getRowId={(row) => String(row.id)}
        isRowExpandable={(row) => row.sales.length > 0}
        expandOnRowClick
        renderExpandedRow={(row) => <OrderSalesExpandedRow row={row} />}
      />
    </div>
  );
}
