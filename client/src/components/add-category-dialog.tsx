import { useAddBudgetCategoryMutation } from "@/features/budget/hooks/useAddBudgetCategoryMutation";
import { AddBudgetCategoryMutationVariables } from "@/generated/graphql";
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
  onAdded: (id: number) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function AddCategoryDialog({ onAdded, open, setOpen }: Props) {
  const [categoryToAdd, setCategoryToAdd] =
    useState<AddBudgetCategoryMutationVariables>({
      name: "",
      color: "#3b82f6",
    });
  const { mutateAsync: addCategory } = useAddBudgetCategoryMutation();

  const handleAddCategory = (): void => {
    if (!categoryToAdd.name) return;
    void addCategory(categoryToAdd)
      .then((data) => {
        if (data.addBudgetCategory?.id) {
          onAdded(data.addBudgetCategory.id);
          setOpen(false);
          setCategoryToAdd({ name: "", color: "#3b82f6" });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une catégorie</DialogTitle>
          <DialogDescription>
            Ajouter une nouvelle catégorie pour mieux organiser vos
            dépenses/recettes
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Nom de la catégorie"
            value={categoryToAdd.name}
            onChange={(e) =>
              setCategoryToAdd({ ...categoryToAdd, name: e.target.value })
            }
          />
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={categoryToAdd.color}
              onChange={(e) =>
                setCategoryToAdd({ ...categoryToAdd, color: e.target.value })
              }
              className="h-9 w-9 cursor-pointer rounded border border-input"
            />
            <span className="text-sm text-muted-foreground">
              Couleur de la catégorie
            </span>
          </div>
          <Button onClick={handleAddCategory}>Ajouter</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
