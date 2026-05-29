import { DataTable } from "@/components/Table/DataTable";
import { TypographyH2 } from "@/components/ui/typography";
import { useCallback, useMemo, useState } from "react";
import { useDeleteInvoiceMutation } from "../hooks/useDeleteInvoiceMutation";
import { useInvoicesPanel } from "../hooks/useInvoicesPanel";
import { EditInvoiceSheet } from "./edit-invoice-sheet";
import { getColumns, InvoiceTableRow } from "./columns";
import { InvoicesFiltersCard } from "./invoices-filters-card";
import { InvoicesKpiCards } from "./invoices-kpi-cards";
import { UncoveredBudgetLinesSheet } from "./uncovered-budget-lines-sheet";

export function InvoicesPanel() {
  const {
    searchQuery,
    setSearchQuery,
    vendorIdsFilter,
    handleSelectVendor,
    vendorOptions,
    statusFilter,
    handleSelectStatus,
    allRows,
    filteredRows,
    kpi,
    uncoveredBudgetLines,
    uncoveredForecastTotal,
    uncoveredSheetOpen,
    setUncoveredSheetOpen,
    isLoading,
    invoicesLoading,
  } = useInvoicesPanel();

  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(
    null,
  );

  const { mutate: deleteInvoice } = useDeleteInvoiceMutation();

  const selectedRow = useMemo(() => {
    if (selectedInvoiceId === null) {
      return null;
    }
    return allRows.find((row) => row.id === selectedInvoiceId) ?? null;
  }, [allRows, selectedInvoiceId]);

  const handleDeleteInvoice = useCallback(
    (id: number) => {
      deleteInvoice({ id });
      setSelectedInvoiceId((current) => (current === id ? null : current));
    },
    [deleteInvoice],
  );

  const columns = useMemo(
    () =>
      getColumns({
        onDelete: handleDeleteInvoice,
        onEdit: (row: InvoiceTableRow) => setSelectedInvoiceId(row.id),
      }),
    [handleDeleteInvoice],
  );

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Factures / devis</TypographyH2>
      <InvoicesKpiCards
        kpi={kpi}
        uncoveredLineCount={uncoveredBudgetLines.length}
        uncoveredForecastTotal={uncoveredForecastTotal}
        isLoading={invoicesLoading}
        isUncoveredLoading={isLoading}
        onViewUncoveredList={() => setUncoveredSheetOpen(true)}
      />
      <InvoicesFiltersCard
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        vendorIdsFilter={vendorIdsFilter}
        onSelectVendor={handleSelectVendor}
        vendorOptions={vendorOptions}
        statusFilter={statusFilter}
        onSelectStatus={handleSelectStatus}
      />
      <DataTable
        columns={columns}
        data={filteredRows}
        onRowClick={(row) => setSelectedInvoiceId(row.id)}
      />
      {selectedRow ? (
        <EditInvoiceSheet
          open
          onOpenChange={(open) => {
            if (!open) {
              setSelectedInvoiceId(null);
            }
          }}
          invoice={selectedRow}
        />
      ) : null}
      <UncoveredBudgetLinesSheet
        open={uncoveredSheetOpen}
        onOpenChange={setUncoveredSheetOpen}
        lines={uncoveredBudgetLines}
      />
    </div>
  );
}
