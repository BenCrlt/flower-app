import { StrictDateRange } from "@/components/date-picker";
import { useEdition } from "@/features/edition/EditionContext";
import { GetOrdersQuery } from "@/generated/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { subMonths } from "date-fns";
import _ from "lodash";
import { useMemo, useState } from "react";
import { getColumns, SalesTableRow } from "../components/columns";
import { useGetOrdersQuery } from "./getOrdersQuery";

interface UseSalesPanelResult {
  authorIdsFilter: string[];
  handleSelectAuthor: (authorId: string, checked: boolean) => void;
  authorOptions: { id: string; name: string }[];
  dateRange: StrictDateRange;
  handleSelectDateRange: (dateRange: StrictDateRange) => void;
  filteredOrders: GetOrdersQuery["orders"];
  columns: ColumnDef<SalesTableRow>[];
  rows: SalesTableRow[];
}

export function useSalesPanel(): UseSalesPanelResult {
  const { edition } = useEdition();
  const [authorIdsFilter, setAuthorIdsFilter] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<StrictDateRange>({
    from: subMonths(new Date(), 2),
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
    return _.uniqBy(
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

  const handleSelectDateRange = (dateRange: StrictDateRange) => {
    setDateRange(dateRange);
  };

  return {
    authorIdsFilter,
    handleSelectAuthor,
    authorOptions,
    dateRange,
    handleSelectDateRange,
    filteredOrders,
    columns,
    rows,
  };
}
