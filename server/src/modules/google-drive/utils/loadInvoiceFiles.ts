import _ from "lodash";
import { db } from "../../../db/index.js";
import { InvoiceFile } from "../../../db/schema/invoice-files.js";

export const loadInvoiceFiles = async (
  invoiceIds: number[],
): Promise<InvoiceFile[][]> => {
  if (!invoiceIds.length) {
    return [];
  }
  const files = await db.query.invoiceFilesTable.findMany({
    where: (table, { inArray }) => inArray(table.invoiceId, invoiceIds),
  });
  const filesByInvoiceId = _.groupBy(files, "invoiceId");
  return invoiceIds.map((id) => filesByInvoiceId[id] ?? []);
};
