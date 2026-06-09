import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useCashRegister } from "../../hooks/useCashRegister";

export const CategoriesFilter = () => {
  const { allCategoriesInCatalog, selectedCategory, onSelectCategory } =
    useCashRegister();

  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-hide snap-x">
      <motion.div
        className="shrink-0 snap-start"
        whileHover={{ y: -2, scale: 1.04 }}
        whileTap={{ scale: 0.92 }}
        animate={{
          y: selectedCategory ? 0 : -1,
          scale: selectedCategory ? 1 : 1.05,
        }}
        transition={{ type: "spring", stiffness: 560, damping: 26 }}
      >
        <Badge
          variant={selectedCategory ? "secondary" : "default"}
          className="cursor-pointer px-3 py-1.5 text-sm transition-colors duration-150"
          onClick={() => onSelectCategory(null)}
        >
          Toutes
        </Badge>
      </motion.div>
      {allCategoriesInCatalog.map((category) => (
        <motion.div
          key={category.id}
          className="shrink-0 snap-start"
          whileHover={{ y: -2, scale: 1.04 }}
          whileTap={{ scale: 0.92 }}
          animate={{
            y: selectedCategory?.id === category.id ? -1 : 0,
            scale: selectedCategory?.id === category.id ? 1.05 : 1,
          }}
          transition={{ type: "spring", stiffness: 560, damping: 26 }}
        >
          <Badge
            style={{
              backgroundColor:
                selectedCategory?.id === category.id ? category.color : undefined,
              borderColor:
                selectedCategory?.id === category.id ? category.color : undefined,
              color: selectedCategory?.id === category.id ? "#fff" : undefined,
            }}
            onClick={() => onSelectCategory(category)}
            className="cursor-pointer px-3 py-1.5 text-sm transition-colors duration-150"
            variant="secondary"
          >
            {category.name}
          </Badge>
        </motion.div>
      ))}
    </div>
  );
};
