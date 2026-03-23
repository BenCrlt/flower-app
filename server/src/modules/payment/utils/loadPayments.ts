import _ from "lodash";
import { db } from "../../../db/index.js";
import { Payment } from "../../../db/schema/index.js";

export const loadPayments = async (
  invoiceIds: number[],
): Promise<Payment[][]> => {
  if (!invoiceIds.length) {
    return [];
  }
  const payments = await db.query.paymentsTable.findMany({
    where: (table, { inArray }) => inArray(table.invoiceId, invoiceIds),
  });
  const paymentsByInvoiceId = _.groupBy(payments, "invoiceId");
  return invoiceIds.map((id) => paymentsByInvoiceId[id] ?? []);
};
