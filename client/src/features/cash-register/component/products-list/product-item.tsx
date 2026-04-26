import { CategoryBadge } from "@/components/CategoryBadge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { CartProduct } from "../../CashRegisterContext";
import { useCashRegister } from "../../hooks/useCashRegister";

interface Props {
  product: CartProduct;
}

export const ProductItem = ({ product }: Props) => {
  const { onAddProductToCart, onRemoveProductToCart } = useCashRegister();
  return (
    <Card
      key={product.id}
      className="aspect-square cursor-pointer p-3 transition-colors hover:bg-muted/50"
      onClick={() => onAddProductToCart(product.id)}
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
          <Button
            onClick={() => {
              onRemoveProductToCart(product.id);
            }}
            disabled={!product.quantity}
            size="icon-sm"
          >
            <Minus />
          </Button>
          <span className="text-2xl">{product.quantity}</span>
          <Button
            onClick={() => {
              onAddProductToCart(product.id);
            }}
            size="icon-sm"
          >
            <Plus />
          </Button>
        </div>
      </div>
    </Card>
  );
};
