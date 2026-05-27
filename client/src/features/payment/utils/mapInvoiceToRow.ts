import { GetInvoicesQuery, InvoiceStatus } from "@/generated/graphql";
import { InvoiceTableRow } from "../components/columns";

export function mapInvoiceToRow(
  invoice: GetInvoicesQuery["invoices"][number],
): InvoiceTableRow {
  return {
    id: invoice.id,
    name: invoice.name,
    vendorId: invoice.vendorId,
    vendorName: invoice.vendor?.name ?? "-",
    status: invoice.status as unknown as InvoiceStatus,
    totalAmount: Number(invoice.totalAmount),
    note: invoice.note ?? "-",
    executedAt: invoice.executedAt ?? "-",
    payments: invoice.payments.map((p) => ({
      id: p.id,
      budgetLineId: p.budgetLineId,
      quantity: p.quantity,
      unitPrice: Number(p.unitPrice),
    })),
    invoiceFiles: (invoice.invoiceFiles ?? []).map((f) => ({
      id: f.id,
      fileName: f.fileName,
      mimeType: f.mimeType,
      sizeBytes: f.sizeBytes,
    })),
  };
}
