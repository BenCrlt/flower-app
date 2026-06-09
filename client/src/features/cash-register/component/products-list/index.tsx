import { AnimatePresence, motion } from "framer-motion";
import { useCashRegister } from "../../hooks/useCashRegister";
import { CategoriesFilter } from "./categories-filter";
import { ProductItem } from "./product-item";

export const ProductsList = () => {
  const { catalogProductsFiltered } = useCashRegister();

  return (
    <div className="flex min-w-0 flex-col gap-4 overflow-x-hidden">
      <CategoriesFilter />
      <div className="grid w-full min-w-0 grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] sm:gap-4">
        <AnimatePresence mode="popLayout">
          {catalogProductsFiltered.map((product) => (
            <motion.div
              key={product.id}
              layout
              className="min-w-0 justify-self-stretch"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{
                type: "spring",
                stiffness: 520,
                damping: 30,
                mass: 0.5,
              }}
            >
              <ProductItem product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
