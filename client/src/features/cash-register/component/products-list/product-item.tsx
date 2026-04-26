import { CategoryBadge } from "@/components/CategoryBadge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { CartProduct } from "../../hooks/useCashRegister";

interface Props {
  product: CartProduct;
  onAddProductToCart: (productId: number) => void;
  onRemoveProductToCart: (productId: number) => void;
}

export const ProductItem = ({
  onAddProductToCart,
  onRemoveProductToCart,
  product,
}: Props) => {
  return (
    <Card
      key={product.id}
      className="aspect-square cursor-pointer p-3 transition-colors hover:bg-muted/50"
      onClick={() => onAddProductToCart(product.id)}
    >
      <div className="flex h-full flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center justify-between gap-2">
          <CardTitle className="text-center text-base">
            {product.name}
          </CardTitle>
          <CategoryBadge
            name={product.category.name}
            color={product.category.color}
          />
        </div>
        <div className="flex gap-4 self-center align-middle text-center">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveProductToCart(product.id);
            }}
            disabled={!product.quantity}
            size="icon-sm"
          >
            <Minus />
          </Button>
          <span className="text-2xl">{product.quantity}</span>
          <Button
            onClick={(e) => {
              e.stopPropagation();
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
