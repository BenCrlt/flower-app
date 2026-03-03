import { groupBy } from "lodash";
import { db } from "../../../db";
import { Payment } from "../../../db/schema";

export const loadPayments = async (
  invoiceIds: number[],
): Promise<Payment[][]> => {
  if (!invoiceIds.length) {
    return [];
  }
  const payments = await db.query.paymentsTable.findMany({
    where: (table, { inArray }) => inArray(table.invoiceId, invoiceIds),
  });
  const paymentsByInvoiceId = groupBy(payments, "invoiceId");
  return invoiceIds.map((id) => paymentsByInvoiceId[id] ?? []);
};
