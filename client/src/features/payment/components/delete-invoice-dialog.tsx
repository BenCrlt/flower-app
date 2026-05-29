import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { TypographyP } from "@/components/ui/typography";
import type { InvoiceTableRow } from "./columns";

interface Props {
  open: boolean;
  invoice: InvoiceTableRow | null;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function DeleteInvoiceDialog({
  open,
  invoice,
  isPending,
  onOpenChange,
  onConfirm,
}: Props) {
  const label = invoice?.name?.trim() || invoice?.vendorName || "cette facture";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer cette facture ?</DialogTitle>
        </DialogHeader>
        <TypographyP className="text-muted-foreground">
          Cette action est définitive pour{" "}
          <span className="font-semibold text-foreground">{label}</span>. Les
          paiements associés seront également supprimés.
        </TypographyP>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Annuler
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Supprimer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
