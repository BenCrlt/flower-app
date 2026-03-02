import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import { Invoice, invoicesTable } from "../../../db/schema";

export const deleteInvoiceInput = z.object({
  id: z.number().min(1),
});

export const deleteInvoice = async ({
  id,
}: z.infer<typeof deleteInvoiceInput>): Promise<Invoice | null> => {
  return db
    .delete(invoicesTable)
    .where(eq(invoicesTable.id, id))
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
};
