import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import {
  DEFAULT_CATEGORY,
  UpsertCategoryDialog,
} from "@/components/upsert-category-dialog";
import { useGetBudgetCategoriesQuery } from "@/features/budget/hooks/useGetBudgetCategoriesQuery";
import { UpsertBudgetCategoryMutationVariables } from "@/generated/graphql";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

export function CategoriesCard() {
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<UpsertBudgetCategoryMutationVariables>();

  const { data } = useGetBudgetCategoriesQuery();

  const handleSelectCategory = (
    category: UpsertBudgetCategoryMutationVariables,
  ) => {
    setEditingCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingCategory(undefined);
    setOpen(false);
  };

  return (
    <>
      <Card className="flex flex-col gap-4">
        <CardHeader>
          <CardTitle>
            <TypographyH3>Catégories</TypographyH3>
          </CardTitle>
          <CardDescription>
            <TypographyP>
              Modifiez les catégories définis sur les dépenses / recettes.
            </TypographyP>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          {data?.budgetCategories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 560, damping: 26 }}
            >
              <Badge
                style={{
                  backgroundColor: category.color,
                  borderColor: category.color,
                  color: "#fff",
                }}
                onClick={() => handleSelectCategory(category)}
                className="cursor-pointer px-3 py-1.5 text-sm transition-colors duration-150"
                variant="secondary"
              >
                {category.name}
              </Badge>
            </motion.div>
          ))}
          <motion.div
            key={"create-category"}
            whileHover={{ y: -2, scale: 1.04 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 560, damping: 26 }}
          >
            <Badge
              onClick={() => setOpen(true)}
              className="cursor-pointer px-3 py-1.5 text-sm transition-colors duration-150"
            >
              <Plus />
              Ajouter une catégorie
            </Badge>
          </motion.div>
        </CardContent>
      </Card>
      <UpsertCategoryDialog
        key={editingCategory?.id}
        open={open}
        setOpen={handleClose}
        editingCategory={editingCategory}
        onSubmit={handleClose}
      />
    </>
  );
}
