import { StrictDateRange } from "@/components/date-picker";
import { useEdition } from "@/features/edition/EditionContext";
import { GetOrdersQuery } from "@/generated/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { subMonths } from "date-fns";
import { useMemo, useState } from "react";
import { getColumns, SalesTableRow } from "../components/columns";
import { getSaleEffectiveUnitPrice } from "../utils/salePrice";
import { useGetOrdersQuery } from "./getOrdersQuery";
import { useGetOrderOriginsQuery } from "./useGetOrderOrigins";

interface UseSalesPanelResult {
  originIdsFilter: number[];
  handleSelectOrigin: (originId: number, checked: boolean) => void;
  originOptions: { id: number; name: string }[];
  dateRange: StrictDateRange;
  handleSelectDateRange: (dateRange: StrictDateRange) => void;
  orders: GetOrdersQuery["orders"];
  columns: ColumnDef<SalesTableRow>[];
  rows: SalesTableRow[];
}

export function useSalesPanel(): UseSalesPanelResult {
  const { edition } = useEdition();
  const [originIdsFilter, setOriginIdsFilter] = useState<number[]>([]);
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

  const handleSelectOrigin = (originId: number, checked: boolean) => {
    setOriginIdsFilter((previous) => {
      if (checked) {
        return [...previous, originId];
      }
      return previous.filter((id) => id !== originId);
    });
  };

  const rows = useMemo<SalesTableRow[]>(
    () =>
      data?.orders.map((order) => ({
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
          quantity: sale.quantity,
          budgetLineName: sale.budgetLine?.name ?? "Article inconnu",
          estimatedUnitPrice: getSaleEffectiveUnitPrice(sale),
          categoryName: sale.budgetLine?.category?.name ?? null,
          categoryColor: sale.budgetLine?.category?.color ?? null,
        })),
        originName: order.origin?.name ?? "Inconnu",
      })) || [],
    [data],
  );

  const columns = getColumns();

  const handleSelectDateRange = (dateRange: StrictDateRange) => {
    setDateRange(dateRange);
  };

  return {
    originIdsFilter,
    handleSelectOrigin,
    originOptions: orderOriginsOptions?.orderOrigins ?? [],
    dateRange,
    handleSelectDateRange,
    columns,
    rows,
    orders: data?.orders ?? [],
  };
}
