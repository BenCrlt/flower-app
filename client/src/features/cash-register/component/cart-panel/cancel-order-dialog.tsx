import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancelOrder: () => void;
}

export const CancelOrderDialog = ({
  open,
  onOpenChange,
  onCancelOrder,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Annuler la commande</DialogTitle>
        </DialogHeader>
        Êtes-vous sûr de vouloir annuler la commande ?
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Non
          </Button>
          <Button variant="destructive" onClick={onCancelOrder}>
            Oui
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
