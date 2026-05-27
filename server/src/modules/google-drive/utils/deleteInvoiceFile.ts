import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import { invoiceFilesTable } from "../../../db/schema/invoice-files.js";
import { invoicesTable } from "../../../db/schema/invoices.js";
import {
  createDriveClientFromConfig,
  getGoogleDriveConfigForEdition,
  isDriveConfigured,
} from "./getConfigForEdition.js";

export const deleteInvoiceFileInput = z.object({
  id: z.number().min(1),
  deleteFromDrive: z.boolean(),
});

export async function deleteInvoiceFile({
  id,
  deleteFromDrive,
}: z.infer<typeof deleteInvoiceFileInput>): Promise<boolean> {
  const file = await db.query.invoiceFilesTable.findFirst({
    where: eq(invoiceFilesTable.id, id),
  });

  if (!file) {
    return false;
  }

  if (deleteFromDrive) {
    const invoice = await db.query.invoicesTable.findFirst({
      where: eq(invoicesTable.id, file.invoiceId),
    });
    if (!invoice) {
      throw new Error("Facture introuvable");
    }
    const config = await getGoogleDriveConfigForEdition(invoice.editionId);
    if (!isDriveConfigured(config)) {
      throw new Error("Google Drive non configuré pour cette édition");
    }
    const client = createDriveClientFromConfig(config);
    await client.deleteFile(file.driveFileId);
  }

  await db.delete(invoiceFilesTable).where(eq(invoiceFilesTable.id, id));
  return true;
}
