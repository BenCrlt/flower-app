import { useAddBudgetCategoryMutation } from "@/features/budget/hooks/useAddBudgetCategoryMutation";
import { AddBudgetCategoryMutationVariables } from "@/generated/graphql";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

interface AddCategoryFieldProps {
  onAdded: (id: number) => void;
}

export function AddCategoryField({ onAdded }: AddCategoryFieldProps) {
  const [open, setOpen] = useState(false);
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
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          onPointerDown={(e) => e.preventDefault()}
        >
          <Plus /> Ajouter une catégorie
        </Button>
      </DialogTrigger>
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
