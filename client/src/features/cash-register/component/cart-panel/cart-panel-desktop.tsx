import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Trash } from "lucide-react";
import { CartProduct } from "../../CashRegisterContext";

interface Props {
  cartItems: CartProduct[];
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
  return (
    <Card className="hidden h-full min-h-0 pb-4 lg:flex lg:flex-col">
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
                key={item.id}
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
                  <motion.div
                    key={`${item.id}-${item.quantity}`}
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 650, damping: 22 }}
                  >
                    <Badge>{item.quantity}</Badge>
                  </motion.div>
                  <span className="text-xs text-muted-foreground">
                    {formatPriceToEuros(item.unitPrice * item.quantity)}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </CardContent>
      <div className="mt-auto space-y-3 border-t px-4 pt-4 sm:px-6">
        <div className="flex items-center justify-between">
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
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
          <Button
            className="w-full"
            size="lg"
            disabled={!cartItems.length}
            onClick={onProceedToPayment}
          >
            <ShoppingBag />
            Passer au paiement
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="destructive"
            className="w-full"
            size="lg"
            onClick={onCancelOrder}
          >
            <Trash />
            Annuler la commande
          </Button>
        </motion.div>
      </div>
    </Card>
  );
};
