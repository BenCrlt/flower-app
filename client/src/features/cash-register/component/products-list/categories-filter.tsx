import { Badge } from "@/components/ui/badge";
import { UseCashRegisterReturn } from "../../hooks/useCashRegister";

export const CategoriesFilter = ({
  allCategoriesInProducts,
  onSelectCategory,
  selectedCategories,
}: Pick<
  UseCashRegisterReturn,
  "allCategoriesInProducts" | "onSelectCategory" | "selectedCategories"
>) => {
  return (
    <div className="flex gap-2">
      {allCategoriesInProducts.map((category) => (
        <Badge
          key={category.id}
          style={{
            backgroundColor: selectedCategories.includes(category)
              ? category.color
              : "gray",
            borderColor: selectedCategories.includes(category)
              ? category.color
              : "gray",
            color: "#fff",
          }}
          onClick={() => onSelectCategory(category)}
          className="cursor-pointer text-md"
        >
          {category.name}
        </Badge>
      ))}
    </div>
  );
};
