import { AnimatePresence, motion } from "framer-motion";
import { useCashRegister } from "../../hooks/useCashRegister";
import { CategoriesFilter } from "./categories-filter";
import { ProductItem } from "./product-item";

export const ProductsList = () => {
  const { catalogProductsFiltered } = useCashRegister();

  return (
    <div className="flex flex-col gap-4">
      <CategoriesFilter />
      <div className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        <AnimatePresence mode="popLayout">
          {catalogProductsFiltered.map((product) => (
            <motion.div
              key={product.id}
              layout
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
