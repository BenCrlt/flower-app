import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ValidateOrderPaymentMethodInput } from "@/generated/graphql";
import { Banknote, CreditCard } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectMethod?: (method: ValidateOrderPaymentMethodInput) => void;
}

export const PaymentMethodDialog = ({
  open,
  onOpenChange,
  onSelectMethod,
}: Props) => {
  const handleSelectMethod = (method: ValidateOrderPaymentMethodInput) => {
    onSelectMethod?.(method);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choisir un moyen de paiement</DialogTitle>
          <DialogDescription>
            Sélectionnez le mode de règlement pour finaliser la vente.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            variant="outline"
            className="h-20 flex-col gap-2"
            onClick={() =>
              handleSelectMethod(ValidateOrderPaymentMethodInput.Card)
            }
          >
            <CreditCard />
            Carte
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col gap-2"
            onClick={() =>
              handleSelectMethod(ValidateOrderPaymentMethodInput.Cash)
            }
          >
            <Banknote />
            Espece
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
