import { DataTable } from "@/components/Table/DataTable";
import { TypographyH2 } from "@/components/ui/typography";
import { useEdition } from "@/features/edition/EditionContext";
import { useMemo } from "react";
import { useGetOrdersQuery } from "../hooks/getOrdersQuery";
import { getColumns, SalesTableRow } from "./columns";

export function SalesTable() {
  const { edition } = useEdition();

  const { data } = useGetOrdersQuery({
    variables: { editionId: edition.id },
  });

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
      })) || [],
    [data],
  );

  const columns = getColumns();

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Ventes</TypographyH2>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
