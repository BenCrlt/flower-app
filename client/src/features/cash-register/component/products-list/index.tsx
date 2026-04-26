import { useCashRegister } from "../../hooks/useCashRegister";
import { CategoriesFilter } from "./categories-filter";
import { ProductItem } from "./product-item";

export const ProductsList = () => {
  const { cartProducts } = useCashRegister();

  return (
    <div className="flex flex-col gap-4">
      <CategoriesFilter />
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5">
        {cartProducts.map((product) => (
          <ProductItem product={product} />
        ))}
      </div>
    </div>
  );
};
