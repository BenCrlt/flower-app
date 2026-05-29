import { useGetBudgetLinesQuery } from "@/features/budget/hooks/useGetBudgetLinesQuery";
import { useEdition } from "@/features/edition/EditionContext";
import { GetBudgetLinesQuery, InvoiceStatus, LineTypeEnum } from "@/generated/graphql";
import { useMemo, useState } from "react";
import { InvoiceTableRow } from "../components/columns";
import { mapInvoiceToRow } from "../utils/mapInvoiceToRow";
import { useGetInvoicesQuery } from "./useGetInvoicesQuery";
import { useGetVendorsQuery } from "./useGetVendorsQuery";

export interface UncoveredBudgetLine {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
    color: string;
  } | null;
  forecastAmount: number;
}

export interface InvoicesKpi {
  paidAmount: number;
  paidCount: number;
  pendingAmount: number;
  pendingCount: number;
}

function filterInvoiceRows(
  rows: InvoiceTableRow[],
  searchQuery: string,
  vendorIdsFilter: number[],
  statusFilter: InvoiceStatus[],
): InvoiceTableRow[] {
  const query = searchQuery.trim().toLowerCase();

  return rows.filter((row) => {
    if (
      vendorIdsFilter.length > 0 &&
      !vendorIdsFilter.includes(row.vendorId)
    ) {
      return false;
    }
    if (statusFilter.length > 0 && !statusFilter.includes(row.status)) {
      return false;
    }
    if (query) {
      const haystack = [row.name, row.vendorName, row.note, row.status]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) {
        return false;
      }
    }
    return true;
  });
}

function sumTotalAmount(
  invoices: { totalAmount: string }[],
): number {
  return invoices.reduce((acc, invoice) => acc + Number(invoice.totalAmount), 0);
}

function mapUncoveredBudgetLines(
  budgetLines: GetBudgetLinesQuery["budgetLines"],
  budgetLineIdsWithPayment: Set<number>,
): UncoveredBudgetLine[] {
  return budgetLines
    .filter((line) => !budgetLineIdsWithPayment.has(line.id))
    .map((line) => ({
      id: line.id,
      name: line.name,
      category: line.category
        ? {
            id: line.category.id,
            name: line.category.name,
            color: line.category.color,
          }
        : null,
      forecastAmount:
        line.estimatedQuantity * Number(line.estimatedUnitPrice),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

export function useInvoicesPanel() {
  const { edition } = useEdition();
  const [searchQuery, setSearchQuery] = useState("");
  const [vendorIdsFilter, setVendorIdsFilter] = useState<number[]>([]);
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus[]>([]);
  const [uncoveredSheetOpen, setUncoveredSheetOpen] = useState(false);

  const { data: invoicesData, isLoading: invoicesLoading } =
    useGetInvoicesQuery({
      variables: { editionId: edition.id },
    });

  const { data: budgetData, isLoading: budgetLoading } =
    useGetBudgetLinesQuery({
      variables: {
        editionId: edition.id,
        budgetLineType: LineTypeEnum.Expense,
      },
    });

  const { data: vendorsData } = useGetVendorsQuery();

  const allRows = useMemo(
    () => invoicesData?.invoices.map(mapInvoiceToRow) ?? [],
    [invoicesData?.invoices],
  );

  const filteredRows = useMemo(
    () =>
      filterInvoiceRows(
        allRows,
        searchQuery,
        vendorIdsFilter,
        statusFilter,
      ),
    [allRows, searchQuery, vendorIdsFilter, statusFilter],
  );

  const kpi = useMemo<InvoicesKpi>(() => {
    const invoices = invoicesData?.invoices ?? [];
    const paid = invoices.filter(
      (invoice) => invoice.status === InvoiceStatus.Paid,
    );
    const pending = invoices.filter(
      (invoice) => invoice.status === InvoiceStatus.Pending,
    );
    return {
      paidAmount: sumTotalAmount(paid),
      paidCount: paid.length,
      pendingAmount: sumTotalAmount(pending),
      pendingCount: pending.length,
    };
  }, [invoicesData?.invoices]);

  const uncoveredBudgetLines = useMemo(() => {
    const invoices = invoicesData?.invoices ?? [];
    const budgetLineIdsWithPayment = new Set(
      invoices.flatMap((invoice) =>
        invoice.payments.map((payment) => payment.budgetLineId),
      ),
    );

    return mapUncoveredBudgetLines(
      budgetData?.budgetLines ?? [],
      budgetLineIdsWithPayment,
    );
  }, [budgetData?.budgetLines, invoicesData?.invoices]);

  const uncoveredForecastTotal = useMemo(
    () =>
      uncoveredBudgetLines.reduce(
        (acc, line) => acc + line.forecastAmount,
        0,
      ),
    [uncoveredBudgetLines],
  );

  const handleSelectVendor = (vendorId: number, checked: boolean) => {
    setVendorIdsFilter((previous) => {
      if (checked) {
        return [...previous, vendorId];
      }
      return previous.filter((id) => id !== vendorId);
    });
  };

  const handleSelectStatus = (status: InvoiceStatus, checked: boolean) => {
    setStatusFilter((previous) => {
      if (checked) {
        return [...previous, status];
      }
      return previous.filter((value) => value !== status);
    });
  };

  return {
    editionId: edition.id,
    searchQuery,
    setSearchQuery,
    vendorIdsFilter,
    handleSelectVendor,
    vendorOptions: vendorsData?.vendors ?? [],
    statusFilter,
    handleSelectStatus,
    allRows,
    filteredRows,
    kpi,
    uncoveredBudgetLines,
    uncoveredForecastTotal,
    uncoveredSheetOpen,
    setUncoveredSheetOpen,
    isLoading: invoicesLoading || budgetLoading,
    invoicesLoading,
  };
}
