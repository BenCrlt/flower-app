import { DataTable } from "@/components/Table/DataTable";
import { TypographyH2 } from "@/components/ui/typography";
import { useEdition } from "@/features/edition/EditionContext";
import { useDeleteInvoiceMutation } from "../hooks/useDeleteInvoiceMutation";
import { useGetInvoicesQuery } from "../hooks/useGetInvoicesQuery";
import { getColumns, PaymentTableRow } from "./columns";
import { PaymentsTableFilter } from "./payments-table-filters";

export function PaymentsTable() {
  const { edition } = useEdition();
  const { data } = useGetInvoicesQuery({
    variables: { editionId: edition.id },
  });

  const { mutate: deleteInvoice } = useDeleteInvoiceMutation();

  const handleDeleteInvoice = (id: number) => {
    deleteInvoice({ id });
  };

  const rows: PaymentTableRow[] =
    data?.invoices.map((invoice) => ({
      id: invoice.id,
      vendorName: invoice.vendor?.name ?? "-",
      status: invoice.status,
      totalAmount: Number(invoice.totalAmount),
      note: invoice.note ?? "-",
      executedAt: invoice.executedAt ?? "-",
    })) || [];

  const columns = getColumns({ onDelete: handleDeleteInvoice });

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Paiements</TypographyH2>
      <DataTable
        columns={columns}
        data={rows}
        actions={(table) => <PaymentsTableFilter table={table} />}
      />
    </div>
  );
}
