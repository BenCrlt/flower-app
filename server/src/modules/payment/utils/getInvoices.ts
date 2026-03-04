import { and, eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import { invoicesTable, invoiceStatusSchema } from "../../../db/schema";

export const getInvoicesInput = z.object({
  editionId: z.number().min(1),
  status: invoiceStatusSchema.optional(),
});

export function getInvoices({
  editionId,
  status,
}: z.infer<typeof getInvoicesInput>) {
  return db.query.invoicesTable.findMany({
    where: and(
      eq(invoicesTable.editionId, editionId),
      status ? eq(invoicesTable.status, status) : undefined,
    ),
  });
}
