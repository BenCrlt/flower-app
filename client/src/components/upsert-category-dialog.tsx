import { useUpsertBudgetCategoryMutation } from "@/features/budget/hooks/useUpsertBudgetCategoryMutation";
import { useDeleteBudgetCategoryMutation } from "@/features/settings/hooks/useDeleteBudgetCategoryMutation";
import {
  GetBudgetCategoriesQuery,
  UpsertBudgetCategoryMutationVariables,
} from "@/generated/graphql";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";

interface Props {
  onSubmit: (id: number) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  editingCategory?: GetBudgetCategoriesQuery["budgetCategories"][number];
}

export const DEFAULT_CATEGORY = {
  name: "",
  color: "#3b82f6",
};

export function UpsertCategoryDialog({
  onSubmit,
  open,
  setOpen,
  editingCategory,
}: Props) {
  const [category, setCategory] =
    useState<UpsertBudgetCategoryMutationVariables>(
      editingCategory
        ? {
            id: editingCategory.id,
            name: editingCategory.name,
            color: editingCategory.color,
          }
        : DEFAULT_CATEGORY,
    );
  const { mutateAsync: addCategory } = useUpsertBudgetCategoryMutation();
  const { mutateAsync: deleteCategory, isPending: isDeletePending } =
    useDeleteBudgetCategoryMutation();

  const handleUpsertCategory = (): void => {
    if (!category.name) return;
    void addCategory(category)
      .then((data) => {
        if (data.upsertBudgetCategory?.id) {
          onSubmit(data.upsertBudgetCategory.id);
          setOpen(false);
          setCategory(DEFAULT_CATEGORY);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteCategory = (): void => {
    if (!editingCategory?.id || editingCategory.isUsed) return;

    void deleteCategory({ id: editingCategory.id })
      .then(() => {
        onSubmit(editingCategory.id);
        setOpen(false);
        setCategory(DEFAULT_CATEGORY);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const description = editingCategory
    ? "Modifier ou supprimer la catégorie existante"
    : "Ajouter une nouvelle catégorie pour mieux organiser vos dépenses/recettes";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingCategory ? "Modifier" : "Ajouter"} une catégorie
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Nom de la catégorie"
            value={category.name}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          />
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={category.color}
              onChange={(e) =>
                setCategory({ ...category, color: e.target.value })
              }
              className="h-9 w-9 cursor-pointer rounded border border-input"
            />
            <span className="text-sm text-muted-foreground">
              Couleur de la catégorie
            </span>
          </div>
          <Button onClick={handleUpsertCategory}>Sauvegarder</Button>
          {editingCategory && (
            <Button
              variant="destructive"
              onClick={handleDeleteCategory}
              disabled={editingCategory.isUsed || isDeletePending}
              title={
                editingCategory.isUsed
                  ? "Catégorie utilisée dans une ligne budgétaire"
                  : undefined
              }
            >
              Supprimer
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
