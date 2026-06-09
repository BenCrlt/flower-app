import { CategoryBadge } from "@/components/CategoryBadge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { CatalogProduct } from "../../CashRegisterContext";
import { useCashRegister } from "../../hooks/useCashRegister";
import { FreePriceAmountSheet } from "./free-price-amount-sheet";

interface Props {
  product: CatalogProduct;
}

export const ProductItem = ({ product }: Props) => {
  const isMobile = useIsMobile();
  const {
    getFixedProductQuantity,
    onAddFixedProduct,
    onRemoveFixedProduct,
    onAddFreePriceProduct,
  } = useCashRegister();
  const [quantityDirection, setQuantityDirection] = useState<"up" | "down">("up");
  const [freePriceSheetOpen, setFreePriceSheetOpen] = useState(false);

  const quantity = getFixedProductQuantity(product.id);

  const handleAddProduct = () => {
    if (product.isFreePrice) {
      setFreePriceSheetOpen(true);
      return;
    }
    setQuantityDirection("up");
    onAddFixedProduct(product.id);
  };

  const handleRemoveProduct = () => {
    if (!quantity) {
      return;
    }
    setQuantityDirection("down");
    onRemoveFixedProduct(product.id);
  };

  return (
    <>
      <motion.div
        className="mx-auto aspect-square h-auto w-full min-w-0 max-h-44 max-w-44"
        whileHover={isMobile ? undefined : { y: -4 }}
        whileTap={{ scale: 0.975 }}
        transition={{ type: "spring", stiffness: 460, damping: 26, mass: 0.45 }}
      >
        <Card
          key={product.id}
          className="h-full min-h-0 cursor-pointer p-2 transition-colors hover:bg-muted/50 hover:shadow-md sm:p-3"
          onClick={handleAddProduct}
        >
          <div className="flex h-full flex-col">
            <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
              <CardTitle className="line-clamp-2 text-center text-sm sm:text-base">
                {product.name}
              </CardTitle>
              <CategoryBadge
                name={product.category.name}
                color={product.category.color}
              />
            </div>
            {product.isFreePrice ? (
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Appuyer pour choisir le montant
              </p>
            ) : (
              <div
                className="mt-2 flex items-center gap-2 self-center text-center sm:mt-3 sm:gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  whileHover={
                    !isMobile && quantity ? { scale: 1.1 } : undefined
                  }
                  whileTap={quantity ? { scale: 0.84 } : undefined}
                  transition={{ type: "spring", stiffness: 560, damping: 24 }}
                >
                  <Button
                    onClick={handleRemoveProduct}
                    disabled={!quantity}
                    size="icon"
                    className="size-11 min-[400px]:size-8"
                  >
                    <Minus />
                  </Button>
                </motion.div>
                <div className="relative flex h-9 w-8 items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={quantity}
                      className="absolute text-2xl"
                      initial={{
                        opacity: 0,
                        y: quantityDirection === "up" ? 10 : -10,
                        scale: 0.9,
                      }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{
                        opacity: 0,
                        y: quantityDirection === "up" ? -10 : 10,
                        scale: 0.9,
                      }}
                      transition={{ duration: 0.11, ease: "easeOut" }}
                    >
                      {quantity}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <motion.div
                  whileHover={!isMobile ? { scale: 1.1 } : undefined}
                  whileTap={{ scale: 0.84 }}
                  transition={{ type: "spring", stiffness: 560, damping: 24 }}
                >
                  <Button
                    onClick={handleAddProduct}
                    size="icon"
                    className="size-11 min-[400px]:size-8"
                  >
                    <Plus />
                  </Button>
                </motion.div>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {product.isFreePrice ? (
        <FreePriceAmountSheet
          open={freePriceSheetOpen}
          onOpenChange={setFreePriceSheetOpen}
          productName={product.name}
          onConfirm={(amount) => onAddFreePriceProduct(product.id, amount)}
        />
      ) : null}
    </>
  );
};
