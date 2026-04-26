import { CategoryBadge } from "@/components/CategoryBadge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { CartProduct } from "../../CashRegisterContext";
import { useCashRegister } from "../../hooks/useCashRegister";

interface Props {
  product: CartProduct;
}

export const ProductItem = ({ product }: Props) => {
  const { onAddProductToCart, onRemoveProductToCart } = useCashRegister();
  const [quantityDirection, setQuantityDirection] = useState<"up" | "down">("up");

  const handleAddProduct = () => {
    setQuantityDirection("up");
    onAddProductToCart(product.id);
  };

  const handleRemoveProduct = () => {
    if (!product.quantity) {
      return;
    }
    setQuantityDirection("down");
    onRemoveProductToCart(product.id);
  };

  return (
    <motion.div
      className="aspect-square"
      whileHover={{ y: -4, scale: 1.015 }}
      whileTap={{ scale: 0.975 }}
      transition={{ type: "spring", stiffness: 460, damping: 26, mass: 0.45 }}
    >
      <Card
        key={product.id}
        className="h-full cursor-pointer p-3 transition-colors hover:bg-muted/50 hover:shadow-md"
        onClick={handleAddProduct}
      >
        <div className="flex h-full flex-col">
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
            <CardTitle className="line-clamp-2 text-center text-base">
              {product.name}
            </CardTitle>
            <CategoryBadge
              name={product.category.name}
              color={product.category.color}
            />
          </div>
          <div
            className="mt-3 flex items-center gap-4 self-center text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              whileHover={product.quantity ? { scale: 1.1 } : undefined}
              whileTap={product.quantity ? { scale: 0.84 } : undefined}
              transition={{ type: "spring", stiffness: 560, damping: 24 }}
            >
              <Button
                onClick={handleRemoveProduct}
                disabled={!product.quantity}
                size="icon-sm"
              >
                <Minus />
              </Button>
            </motion.div>
            <div className="relative flex h-9 w-8 items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={product.quantity}
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
                  {product.quantity}
                </motion.span>
              </AnimatePresence>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.84 }}
              transition={{ type: "spring", stiffness: 560, damping: 24 }}
            >
              <Button
                onClick={handleAddProduct}
                size="icon-sm"
              >
                <Plus />
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
