import { StrictDateRange } from "@/components/date-picker";
import { DataTable } from "@/components/Table/DataTable";
import { TypographyH2 } from "@/components/ui/typography";
import { useEdition } from "@/features/edition/EditionContext";
import { uniqBy } from "lodash";
import { useMemo, useState } from "react";
import { useGetOrdersQuery } from "../hooks/getOrdersQuery";
import { SalesPanelActionsAndFiltersCard } from "./actions-and-filters-card";
import { getColumns, SalesTableRow } from "./columns";
import { SalesInfo } from "./sales-info";

export function SalesPanel() {
  const { edition } = useEdition();
  const [authorIdsFilter, setAuthorIdsFilter] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<StrictDateRange>({
    from: new Date(),
    to: new Date(),
  });

  const { data } = useGetOrdersQuery({
    variables: {
      editionId: edition.id,
      from: dateRange.from ? dateRange.from.toISOString() : undefined,
      to: dateRange.to ? dateRange.to.toISOString() : undefined,
    },
  });

  const handleSelectAuthor = (authorId: string, checked: boolean) => {
    setAuthorIdsFilter((previous) => {
      if (checked) {
        return [...previous, authorId];
      }
      return previous.filter((id) => id !== authorId);
    });
  };

  const authorOptions = useMemo(() => {
    return uniqBy(
      data?.orders.map((order) => ({
        id: order.authorId,
        name: order.author?.username ?? "",
      })),
      "id",
    );
  }, [data]);

  const filteredOrders = useMemo(() => {
    return (
      data?.orders.filter((order) => {
        if (!authorIdsFilter.length) {
          return true;
        }
        console.log(order.authorId);
        console.log(authorIdsFilter);

        return authorIdsFilter.includes(order.authorId);
      }) || []
    );
  }, [authorIdsFilter, data]);

  const rows = useMemo<SalesTableRow[]>(
    () =>
      filteredOrders.map((order) => ({
        id: order.id,
        totalAmount: order.totalAmount,
        executedAt: order.executedAt,
        payerFirstName: order.payerFirstName ?? null,
        payerLastName: order.payerLastName ?? null,
        payerEmail: order.payerEmail ?? null,
        helloAssoOrderId: order.helloAssoOrderId ?? null,
        authorUsername: order.author?.username ?? null,
      })) || [],
    [filteredOrders],
  );

  const columns = getColumns();

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Ventes</TypographyH2>

      <SalesPanelActionsAndFiltersCard
        authorIdsFilter={authorIdsFilter}
        handleSelectAuthor={handleSelectAuthor}
        authorOptions={authorOptions}
        dateRange={dateRange}
        handleSelectDateRange={setDateRange}
      />

      <SalesInfo filteredOrders={filteredOrders} dateRange={dateRange} />

      <DataTable columns={columns} data={rows} />
    </div>
  );
}
