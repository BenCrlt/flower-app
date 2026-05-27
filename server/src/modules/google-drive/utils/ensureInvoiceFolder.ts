import { GoogleDriveClient } from "../api/client.js";
import { sanitizeInvoiceFolderName } from "./sanitizeFolderName.js";

export async function ensureInvoiceFolder(
  client: GoogleDriveClient,
  invoiceFolderId: string,
  invoiceId: number,
  invoiceName: string,
): Promise<string> {
  const folderName = sanitizeInvoiceFolderName(invoiceId, invoiceName);
  return client.ensureFolder(folderName, invoiceFolderId);
}
