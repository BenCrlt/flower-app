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
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Trash } from "lucide-react";
import { useState } from "react";
import { CartLine } from "../../CashRegisterContext";
import { useCashRegister } from "../../hooks/useCashRegister";

interface Props {
  cartItems: CartLine[];
  totalQuantity: number;
  totalPrice: number;
  onProceedToPayment: () => void;
  onCancelOrder: () => void;
}

export const CartPanelMobile = ({
  cartItems,
  totalQuantity,
  totalPrice,
  onProceedToPayment,
  onCancelOrder,
}: Props) => {
  const { onRemoveCartLine } = useCashRegister();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 p-3 backdrop-blur lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <div
          className="mx-auto flex max-w-5xl items-center gap-3"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-xs text-muted-foreground">
              {totalQuantity} article(s)
            </span>
            <div className="relative h-6 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`mobile-header-${totalPrice}`}
                  className="absolute truncate text-base font-semibold"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                >
                  {formatPriceToEuros(totalPrice)}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <SheetTrigger asChild>
            <Button variant="outline">Payer</Button>
          </SheetTrigger>
          <Button
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              onCancelOrder();
            }}
          >
            <Trash />
            Annuler
          </Button>
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
                  key={item.cartLineId}
                  className="flex items-center justify-between gap-3 rounded-md border p-3"
                >
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-medium">
                      {item.name}
                    </p>
                    {item.isFreePrice ? (
                      <p className="text-xs text-muted-foreground">Don</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {formatPriceToEuros(item.unitPrice)} / unité ×{" "}
                        {item.quantity}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <p className="text-sm font-medium">
                      {formatPriceToEuros(item.unitPrice * item.quantity)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onRemoveCartLine(item.cartLineId)}
                      aria-label="Retirer du panier"
                    >
                      <Trash className="size-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          <SheetFooter className="border-t px-4 pt-4">
            <div className="flex w-full items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <div className="relative h-7 min-w-24 overflow-hidden text-right">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={`mobile-footer-${totalPrice}`}
                    className="absolute right-0 text-lg font-semibold"
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.96 }}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                  >
                    {formatPriceToEuros(totalPrice)}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <Button
              size="lg"
              className="min-h-12 w-full"
              disabled={!cartItems.length}
              onClick={() => {
                setIsOpen(false);
                onProceedToPayment();
              }}
            >
              <ShoppingBag />
              Passer au paiement
            </Button>
            <Button
              variant="destructive"
              size="lg"
              className="min-h-12 w-full"
              onClick={() => {
                setIsOpen(false);
                onCancelOrder();
              }}
            >
              <Trash />
              Annuler la commande
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
