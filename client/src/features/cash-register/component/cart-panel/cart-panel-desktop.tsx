import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Trash } from "lucide-react";
import { CartLine } from "../../CashRegisterContext";
import { useCashRegister } from "../../hooks/useCashRegister";

interface Props {
  cartItems: CartLine[];
  totalQuantity: number;
  totalPrice: number;
  onProceedToPayment: () => void;
  onCancelOrder: () => void;
}

export const CartPanelDesktop = ({
  cartItems,
  totalQuantity,
  totalPrice,
  onProceedToPayment,
  onCancelOrder,
}: Props) => {
  const { onRemoveCartLine } = useCashRegister();

  return (
    <Card className="hidden h-full min-h-0 pb-4 md:flex md:flex-col">
      <CardHeader className="px-4 sm:px-6">
        <div className="flex items-center justify-between gap-2">
          <CardTitle>Panier en cours</CardTitle>
          <motion.div layout transition={{ type: "spring", stiffness: 560, damping: 30 }}>
            <Badge variant="secondary">{totalQuantity} article(s)</Badge>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3 overflow-auto px-4 sm:px-6">
        <AnimatePresence mode="popLayout" initial={false}>
          {!cartItems.length ? (
            <motion.p
              key="empty-cart"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.14, ease: "easeOut" }}
              className="text-sm text-muted-foreground"
            >
              Aucun article dans le panier pour le moment.
            </motion.p>
          ) : (
            cartItems.map((item) => (
              <motion.div
                key={item.cartLineId}
                layout
                initial={{ opacity: 0, x: 18, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -18, scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 560,
                  damping: 32,
                  mass: 0.55,
                }}
                className="flex items-center justify-between gap-3 rounded-md border p-3"
              >
                <p className="line-clamp-2 text-sm font-medium">{item.name}</p>
                <div className="flex items-center gap-2">
                  {!item.isFreePrice ? (
                    <motion.div
                      key={`${item.cartLineId}-${item.quantity}`}
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 650, damping: 22 }}
                    >
                      <Badge>{item.quantity}</Badge>
                    </motion.div>
                  ) : null}
                  <span className="text-xs text-muted-foreground">
                    {formatPriceToEuros(item.unitPrice * item.quantity)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onRemoveCartLine(item.cartLineId)}
                    aria-label="Retirer du panier"
                  >
                    <Trash className="size-4" />
                  </Button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </CardContent>
      <div className="mt-auto space-y-3 px-4 sm:px-6">
        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-sm text-muted-foreground">Total</span>
          <div className="relative h-7 min-w-24 overflow-hidden text-right">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={totalPrice}
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
          className="w-full"
          disabled={!cartItems.length}
          onClick={onProceedToPayment}
        >
          <ShoppingBag />
          Passer au paiement
        </Button>
        <Button
          variant="destructive"
          className="w-full"
          disabled={!cartItems.length}
          onClick={onCancelOrder}
        >
          <Trash />
          Annuler la commande
        </Button>
      </div>
    </Card>
  );
};
