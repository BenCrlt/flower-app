import { count, eq } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { invoiceFilesTable, InvoiceFile } from "../../../db/schema/invoice-files.js";
import { invoicesTable } from "../../../db/schema/invoices.js";
import {
  INVOICE_FILES_MAX_COUNT,
  isAllowedInvoiceMimeType,
} from "../constants.js";
import { ensureInvoiceFolder } from "./ensureInvoiceFolder.js";
import {
  createDriveClientFromConfig,
  getGoogleDriveConfigForEdition,
  isDriveConfigured,
} from "./getConfigForEdition.js";

interface UploadInvoiceFileParams {
  invoiceId: number;
  uploadedById: string;
  fileName: string;
  mimeType: string;
  buffer: Buffer;
}

export async function uploadInvoiceFile({
  invoiceId,
  uploadedById,
  fileName,
  mimeType,
  buffer,
}: UploadInvoiceFileParams): Promise<InvoiceFile> {
  if (!isAllowedInvoiceMimeType(mimeType)) {
    throw new Error("Format de fichier non supporté");
  }

  const invoice = await db.query.invoicesTable.findFirst({
    where: eq(invoicesTable.id, invoiceId),
  });
  if (!invoice) {
    throw new Error("Facture introuvable");
  }

  const config = await getGoogleDriveConfigForEdition(invoice.editionId);
  if (!isDriveConfigured(config)) {
    throw new Error(
      "Google Drive non configuré. Configurez-le dans les paramètres.",
    );
  }

  const countRows = await db
    .select({ value: count() })
    .from(invoiceFilesTable)
    .where(eq(invoiceFilesTable.invoiceId, invoiceId));
  const existingCount = countRows[0]?.value ?? 0;
  if (existingCount >= INVOICE_FILES_MAX_COUNT) {
    throw new Error(`Maximum ${INVOICE_FILES_MAX_COUNT} fichiers par facture`);
  }

  const client = createDriveClientFromConfig(config);
  const folderId = await ensureInvoiceFolder(
    client,
    config.invoiceFolderId,
    invoice.id,
    invoice.name,
  );
  const driveFile = await client.uploadFile(
    folderId,
    fileName,
    mimeType,
    buffer,
  );

  const [row] = await db
    .insert(invoiceFilesTable)
    .values({
      invoiceId,
      driveFileId: driveFile.id,
      fileName,
      mimeType,
      sizeBytes: buffer.length,
      uploadedById,
    })
    .returning();

  if (!row) {
    throw new Error("Échec de l'enregistrement du fichier");
  }

  return row;
}
