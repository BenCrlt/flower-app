import { UseCashRegisterReturn } from "../../hooks/useCashRegister";
import { ProductItem } from "./product-item";

export const ProductsList = ({
  cartProducts,
  onAddProductToCart,
  onRemoveProductToCart,
}: Pick<
  UseCashRegisterReturn,
  "cartProducts" | "onRemoveProductToCart" | "onAddProductToCart"
>) => {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {cartProducts.map((product) => (
          <ProductItem
            product={product}
            onAddProductToCart={onAddProductToCart}
            onRemoveProductToCart={onRemoveProductToCart}
          />
        ))}
      </div>
    </div>
  );
};
