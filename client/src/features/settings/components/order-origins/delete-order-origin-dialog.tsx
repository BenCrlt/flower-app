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

interface DeleteOrderOriginDialogProps {
  open: boolean;
  origin: { id: number; name: string } | null;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeleteOrderOriginDialog = ({
  open,
  origin,
  isPending,
  onOpenChange,
  onConfirm,
}: DeleteOrderOriginDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supprimer ce point de vente ?</DialogTitle>
        </DialogHeader>
        <TypographyP className="text-muted-foreground">
          Cette action est définitive pour{" "}
          <span className="font-semibold">{origin?.name}</span>.
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
};
