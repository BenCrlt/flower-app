import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { downloadInvoiceFile } from "@/lib/invoice-file-api";
import { Download, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { InvoiceTableRow } from "./columns";

interface Props {
  row: InvoiceTableRow;
  onDelete: (id: number) => void;
  onEdit: (row: InvoiceTableRow) => void;
}

function truncateFileName(name: string, maxLength = 28): string {
  if (name.length <= maxLength) {
    return name;
  }
  const extension = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
  const base = name.slice(0, maxLength - extension.length - 1);
  return `${base}…${extension}`;
}

export function InvoiceActionsMenu({ onDelete, onEdit, row }: Props) {
  const files = row.invoiceFiles;

  const handleDownload = async (fileId: number, fileName: string) => {
    try {
      await downloadInvoiceFile(row.id, fileId, fileName);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Échec du téléchargement",
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-9 p-0">
          <span className="sr-only">Ouvrir le menu</span>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <Separator />
        <DropdownMenuItem onSelect={() => onEdit(row)}>
          <Pencil /> Modifier
        </DropdownMenuItem>
        {files.length === 0 ? (
          <DropdownMenuItem disabled>
            <Download /> Aucun fichier
          </DropdownMenuItem>
        ) : files.length === 1 ? (
          <DropdownMenuItem
            onSelect={() => void handleDownload(files[0].id, files[0].fileName)}
          >
            <Download /> Télécharger
          </DropdownMenuItem>
        ) : (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Download /> Télécharger
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {files.map((file) => (
                <DropdownMenuItem
                  key={file.id}
                  onSelect={() => void handleDownload(file.id, file.fileName)}
                >
                  {truncateFileName(file.fileName)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}
        <Separator />
        <DropdownMenuItem
          variant="destructive"
          onSelect={() => onDelete(row.id)}
        >
          <Trash /> Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
