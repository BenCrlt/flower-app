const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export interface UploadedInvoiceFile {
  id: number;
  invoiceId: number;
  driveFileId: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}

export async function uploadInvoiceFile(
  invoiceId: number,
  file: File,
): Promise<UploadedInvoiceFile> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/files/invoices/${invoiceId}`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const json = (await res.json()) as {
    file?: UploadedInvoiceFile;
    error?: string;
  };

  if (!res.ok) {
    throw new Error(json.error ?? "Échec de l'upload");
  }

  if (!json.file) {
    throw new Error("Réponse upload invalide");
  }

  return json.file;
}

export async function downloadInvoiceFile(
  invoiceId: number,
  fileId: number,
  fileName: string,
): Promise<void> {
  const res = await fetch(
    `${API_URL}/files/invoices/${invoiceId}/${fileId}/download`,
    { credentials: "include" },
  );

  if (!res.ok) {
    const json = (await res.json()) as { error?: string };
    throw new Error(json.error ?? "Échec du téléchargement");
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function getGoogleDriveOAuthStartUrl(editionId: number): string {
  return `${API_URL}/api/google-drive/oauth/start?editionId=${editionId}`;
}
