export const INVOICE_FILE_MAX_BYTES = 10 * 1024 * 1024;
export const INVOICE_FILES_MAX_COUNT = 10;

export const ALLOWED_INVOICE_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type AllowedInvoiceMimeType = (typeof ALLOWED_INVOICE_MIME_TYPES)[number];

export function isAllowedInvoiceMimeType(
  mimeType: string,
): mimeType is AllowedInvoiceMimeType {
  return (ALLOWED_INVOICE_MIME_TYPES as readonly string[]).includes(mimeType);
}
