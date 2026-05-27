import { DataTable } from "@/components/Table/DataTable";
import { TypographyH2 } from "@/components/ui/typography";
import { useEdition } from "@/features/edition/EditionContext";
import { useMemo, useState } from "react";
import { useDeleteInvoiceMutation } from "../hooks/useDeleteInvoiceMutation";
import { useGetInvoicesQuery } from "../hooks/useGetInvoicesQuery";
import { mapInvoiceToRow } from "../utils/mapInvoiceToRow";
import { getColumns } from "./columns";
import { EditInvoiceSheet } from "./edit-invoice-sheet";
import { InvoicesTableFiltersAndActions } from "./invoices-table-filters";

export function InvoicesTable() {
  const { edition } = useEdition();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(
    null,
  );

  const { data } = useGetInvoicesQuery({
    variables: { editionId: edition.id },
  });

  const { mutate: deleteInvoice } = useDeleteInvoiceMutation();

  const rows = useMemo(
    () => data?.invoices.map(mapInvoiceToRow) ?? [],
    [data?.invoices],
  );

  const selectedRow = useMemo(() => {
    if (selectedInvoiceId === null) {
      return null;
    }
    return rows.find((row) => row.id === selectedInvoiceId) ?? null;
  }, [rows, selectedInvoiceId]);

  const handleDeleteInvoice = (id: number) => {
    deleteInvoice({ id });
    if (selectedInvoiceId === id) {
      setSelectedInvoiceId(null);
    }
  };

  const columns = getColumns({
    onDelete: handleDeleteInvoice,
    onEdit: (row) => setSelectedInvoiceId(row.id),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <TypographyH2>Factures / devis</TypographyH2>
      </div>
      <DataTable
        columns={columns}
        data={rows}
        onRowClick={(row) => setSelectedInvoiceId(row.id)}
        actions={(table) => <InvoicesTableFiltersAndActions table={table} />}
      />
      {selectedRow && (
        <EditInvoiceSheet
          open
          onOpenChange={(open) => {
            if (!open) {
              setSelectedInvoiceId(null);
            }
          }}
          invoice={selectedRow}
        />
      )}
    </div>
  );
}
