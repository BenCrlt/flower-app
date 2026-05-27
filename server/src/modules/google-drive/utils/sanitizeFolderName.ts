const MAX_FOLDER_NAME_LENGTH = 100;

export function sanitizeInvoiceFolderName(
  invoiceId: number,
  invoiceName: string,
): string {
  const sanitizedName = invoiceName
    .replace(/[/\\?%*:|"<>]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_FOLDER_NAME_LENGTH);
  return `${invoiceId}_${sanitizedName || "facture"}`;
}
