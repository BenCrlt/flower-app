import { Badge } from "@/components/ui/badge";
import { useCashRegister } from "../../hooks/useCashRegister";

export const CategoriesFilter = () => {
  const { allCategoriesInProducts, selectedCategory, onSelectCategory } =
    useCashRegister();

  return (
    <div className="flex gap-2">
      <Badge
        variant={selectedCategory ? "secondary" : "default"}
        className="cursor-pointer text-md"
        onClick={() => onSelectCategory(null)}
      >
        Toutes
      </Badge>
      {allCategoriesInProducts.map((category) => (
        <Badge
          key={category.id}
          style={{
            backgroundColor:
              selectedCategory?.id === category.id ? category.color : undefined,
            borderColor:
              selectedCategory?.id === category.id ? category.color : undefined,
            color: selectedCategory?.id === category.id ? "#fff" : undefined,
          }}
          onClick={() => onSelectCategory(category)}
          className="cursor-pointer text-md"
          variant="secondary"
        >
          {category.name}
        </Badge>
      ))}
    </div>
  );
};
