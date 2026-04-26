import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { ShoppingBag } from "lucide-react";
import { CartProduct } from "../../CashRegisterContext";

interface Props {
  cartItems: CartProduct[];
  totalQuantity: number;
  totalPrice: number;
  onProceedToPayment: () => void;
}

export const CartPanelDesktop = ({
  cartItems,
  totalQuantity,
  totalPrice,
  onProceedToPayment,
}: Props) => {
  return (
    <Card className="hidden h-full min-h-0 pb-4 lg:flex lg:flex-col">
      <CardHeader className="px-4 sm:px-6">
        <div className="flex items-center justify-between gap-2">
          <CardTitle>Panier en cours</CardTitle>
          <Badge variant="secondary">{totalQuantity} article(s)</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3 overflow-auto px-4 sm:px-6">
        {!cartItems.length ? (
          <p className="text-sm text-muted-foreground">
            Aucun article dans le panier pour le moment.
          </p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-md border p-3"
            >
              <p className="line-clamp-2 text-sm font-medium">{item.name}</p>
              <div className="flex items-center gap-2">
                <Badge>{item.quantity}</Badge>
                <span className="text-xs text-muted-foreground">
                  {formatPriceToEuros(item.unitPrice * item.quantity)}
                </span>
              </div>
            </div>
          ))
        )}
      </CardContent>
      <div className="mt-auto space-y-3 border-t px-4 pt-4 sm:px-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-lg font-semibold">
            {formatPriceToEuros(totalPrice)}
          </span>
        </div>
        <Button
          className="w-full"
          size="lg"
          disabled={!cartItems.length}
          onClick={onProceedToPayment}
        >
          <ShoppingBag />
          Passer au paiement
        </Button>
      </div>
    </Card>
  );
};
