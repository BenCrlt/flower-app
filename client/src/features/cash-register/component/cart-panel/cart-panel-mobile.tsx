import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { ShoppingBag } from "lucide-react";
import { CartProduct } from "../../CashRegisterContext";

interface Props {
  cartItems: CartProduct[];
  totalQuantity: number;
  totalPrice: number;
}

export const CartPanelMobile = ({
  cartItems,
  totalQuantity,
  totalPrice,
}: Props) => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-3 backdrop-blur lg:hidden">
      <Sheet>
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-xs text-muted-foreground">
              {totalQuantity} article(s)
            </span>
            <span className="truncate text-base font-semibold">
              {formatPriceToEuros(totalPrice)}
            </span>
          </div>
          <SheetTrigger asChild>
            <Button variant="outline">Payer</Button>
          </SheetTrigger>
        </div>
        <SheetContent side="bottom" className="max-h-[85vh] rounded-t-xl pb-4">
          <SheetHeader>
            <SheetTitle>Panier en cours</SheetTitle>
            <SheetDescription>
              Vérifiez le détail puis continuez le paiement.
            </SheetDescription>
          </SheetHeader>
          <div className="min-h-0 flex-1 space-y-3 overflow-auto px-4">
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
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatPriceToEuros(item.unitPrice)} / unite
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge>{item.quantity}</Badge>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatPriceToEuros(item.unitPrice * item.quantity)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <SheetFooter className="border-t px-4 pt-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-lg font-semibold">
                {formatPriceToEuros(totalPrice)}
              </span>
            </div>
            <Button size="lg" disabled={!cartItems.length}>
              <ShoppingBag />
              Passer au paiement
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
