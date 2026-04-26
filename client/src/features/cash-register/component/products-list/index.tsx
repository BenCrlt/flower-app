import { useCashRegister } from "../../hooks/useCashRegister";
import { CategoriesFilter } from "./categories-filter";
import { ProductItem } from "./product-item";

export const ProductsList = () => {
  const {
    cartProducts,
    allCategoriesInProducts,
    onSelectCategory,
    selectedCategories,
  } = useCashRegister();

  return (
    <div className="flex flex-col gap-4">
      <CategoriesFilter
        allCategoriesInProducts={allCategoriesInProducts}
        onSelectCategory={onSelectCategory}
        selectedCategories={selectedCategories}
      />
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {cartProducts.map((product) => (
          <ProductItem product={product} />
        ))}
      </div>
    </div>
  );
};
