import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { TypographyP } from "@/components/ui/typography";
import { downloadInvoiceFile, uploadInvoiceFile } from "@/lib/invoice-file-api";
import { Download, FileText, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { ReactElement, useRef, useState } from "react";
import { toast } from "sonner";
import { useDeleteInvoiceFileMutation } from "../hooks/useDeleteInvoiceFileMutation";

const MAX_FILES = 10;
const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = "application/pdf,image/jpeg,image/png,image/webp";

export interface InvoiceFileItem {
  id: number;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
}

interface Props {
  invoiceId?: number;
  invoiceName: string;
  driveConfigured: boolean;
  existingFiles?: InvoiceFileItem[];
  pendingFiles?: File[];
  onPendingFilesChange?: (files: File[]) => void;
  readOnly?: boolean;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} o`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} Ko`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function InvoiceFilesSection({
  invoiceId,
  invoiceName,
  driveConfigured,
  existingFiles = [],
  pendingFiles = [],
  onPendingFilesChange,
  readOnly = false,
}: Props): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [fileToDelete, setFileToDelete] = useState<InvoiceFileItem | null>(
    null,
  );

  const queryClient = useQueryClient();
  const { mutate: deleteFile, isPending: isDeleting } =
    useDeleteInvoiceFileMutation();

  const totalCount = existingFiles.length + pendingFiles.length;
  const canAddMore = totalCount < MAX_FILES;

  const handleFilePick = async (files: FileList | null) => {
    if (!files?.length) {
      return;
    }

    const picked = Array.from(files);
    for (const file of picked) {
      if (file.size > MAX_BYTES) {
        toast.error(`${file.name} dépasse 10 Mo`);
        return;
      }
    }

    if (invoiceId) {
      setUploading(true);
      try {
        for (const file of picked) {
          if (existingFiles.length + pendingFiles.length >= MAX_FILES) {
            toast.error(`Maximum ${MAX_FILES} fichiers par facture`);
            break;
          }
          await uploadInvoiceFile(invoiceId, file);
        }
        toast.success("Fichier(s) ajouté(s)");
        await queryClient.invalidateQueries({ queryKey: ["invoices"] });
      } catch (err) {
        toast.error("Erreur d'upload", {
          description: err instanceof Error ? err.message : undefined,
        });
      } finally {
        setUploading(false);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
      return;
    }

    if (!onPendingFilesChange) {
      return;
    }
    const next = [...pendingFiles, ...picked].slice(0, MAX_FILES);
    if (next.length < pendingFiles.length + picked.length) {
      toast.error(`Maximum ${MAX_FILES} fichiers par facture`);
    }
    onPendingFilesChange(next);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const removePending = (index: number) => {
    onPendingFilesChange?.(pendingFiles.filter((_, i) => i !== index));
  };

  const handleDownload = async (file: InvoiceFileItem) => {
    if (!invoiceId) {
      return;
    }
    setDownloadingId(file.id);
    try {
      await downloadInvoiceFile(invoiceId, file.id, file.fileName);
    } catch (err) {
      toast.error("Erreur de téléchargement", {
        description: err instanceof Error ? err.message : undefined,
      });
    } finally {
      setDownloadingId(null);
    }
  };

  const confirmDelete = (deleteFromDrive: boolean) => {
    if (!fileToDelete) {
      return;
    }
    deleteFile(
      { id: fileToDelete.id, deleteFromDrive },
      {
        onSuccess: () => {
          toast.success(
            deleteFromDrive ? "Fichier supprimé du Drive" : "Lien retiré",
          );
          setFileToDelete(null);
        },
        onError: (error) =>
          toast.error("Erreur", { description: error.message }),
      },
    );
  };

  if (!driveConfigured) {
    return (
      <div className="rounded-lg border border-dashed p-4">
        <TypographyP className="text-muted-foreground text-sm">
          Les pièces jointes Google Drive ne sont pas disponibles pour cette
          édition.{" "}
          <Link to="/settings" className="text-primary underline">
            Configurez Google Drive dans les paramètres
          </Link>
          .
        </TypographyP>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Field>
        <FieldLabel>Pièces jointes</FieldLabel>
        <TypographyP className="text-muted-foreground text-xs">
          PDF ou images (max 10 Mo, {MAX_FILES} fichiers max). Dossier Drive :{" "}
          {invoiceId ? `${invoiceId}_${invoiceName}` : "à la création"}.
        </TypographyP>
      </Field>

      <ul className="flex flex-col gap-2">
        {existingFiles.map((file) => (
          <li
            key={file.id}
            className="flex items-center justify-between gap-2 rounded-md border px-3 py-2"
          >
            <span className="flex min-w-0 items-center gap-2">
              <FileText className="size-4 shrink-0" />
              <span className="truncate text-sm">{file.fileName}</span>
              <span className="text-muted-foreground shrink-0 text-xs">
                {formatSize(file.sizeBytes)}
              </span>
            </span>
            {!readOnly && (
              <div className="flex shrink-0 gap-1">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  disabled={downloadingId === file.id}
                  onClick={() => void handleDownload(file)}
                >
                  {downloadingId === file.id ? (
                    <Spinner />
                  ) : (
                    <Download className="size-4" />
                  )}
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => setFileToDelete(file)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            )}
          </li>
        ))}
        {pendingFiles.map((file, index) => (
          <li
            key={`${file.name}-${index}`}
            className="flex items-center justify-between gap-2 rounded-md border border-dashed px-3 py-2"
          >
            <span className="flex min-w-0 items-center gap-2">
              <FileText className="size-4 shrink-0" />
              <span className="truncate text-sm">{file.name}</span>
              <span className="text-muted-foreground text-xs">
                {formatSize(file.size)} (en attente)
              </span>
            </span>
            {!readOnly && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => removePending(index)}
              >
                <Trash2 className="size-4" />
              </Button>
            )}
          </li>
        ))}
      </ul>

      {!readOnly && canAddMore && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            multiple
            className="hidden"
            onChange={(e) => void handleFilePick(e.target.files)}
          />
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? <Spinner /> : "Ajouter un fichier"}
          </Button>
        </>
      )}

      <Dialog
        open={fileToDelete !== null}
        onOpenChange={(open) => !open && setFileToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer {fileToDelete?.fileName} ?</DialogTitle>
          </DialogHeader>
          <TypographyP className="text-muted-foreground text-sm">
            Choisissez si le fichier doit aussi être supprimé sur Google Drive.
          </TypographyP>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button
              type="button"
              variant="destructive"
              disabled={isDeleting}
              onClick={() => confirmDelete(true)}
            >
              {isDeleting ? <Spinner /> : "Supprimer du Drive"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isDeleting}
              onClick={() => confirmDelete(false)}
            >
              Retirer le lien seulement
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setFileToDelete(null)}
            >
              Annuler
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
