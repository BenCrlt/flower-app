import { DataTable } from "@/components/Table/DataTable";
import { TypographyH2 } from "@/components/ui/typography";
import { useEdition } from "@/features/edition/EditionContext";
import { useState } from "react";
import { useDeleteInvoiceMutation } from "../hooks/useDeleteInvoiceMutation";
import { useGetInvoicesQuery } from "../hooks/useGetInvoicesQuery";
import { AddInvoiceSheet } from "./add-invoice-sheet";
import { getColumns, PaymentTableRow } from "./columns";
import { EditInvoiceSheet } from "./edit-invoice-sheet";
import { PaymentsTableFilter } from "./payments-table-filters";

export function PaymentsTable() {
  const { edition } = useEdition();
  const [selectedRow, setSelectedRow] = useState<PaymentTableRow | null>(null);

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
      vendorId: invoice.vendorId,
      vendorName: invoice.vendor?.name ?? "-",
      status: invoice.status,
      totalAmount: Number(invoice.totalAmount),
      note: invoice.note ?? "-",
      executedAt: invoice.executedAt ?? "-",
      payments: invoice.payments.map((p) => ({
        id: p.id,
        budgetLineId: p.budgetLineId,
        quantity: p.quantity,
        unitPrice: Number(p.unitPrice),
      })),
    })) || [];

  const columns = getColumns({
    onDelete: handleDeleteInvoice,
    onEdit: (row) => setSelectedRow(row),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <TypographyH2>Paiements</TypographyH2>
        <AddInvoiceSheet />
      </div>
      <DataTable
        columns={columns}
        data={rows}
        onRowClick={(row) => setSelectedRow(row)}
        actions={(table) => <PaymentsTableFilter table={table} />}
      />
      {selectedRow && (
        <EditInvoiceSheet
          open={!!selectedRow}
          onOpenChange={(open) => {
            if (!open) setSelectedRow(null);
          }}
          invoice={selectedRow}
        />
      )}
    </div>
  );
}
