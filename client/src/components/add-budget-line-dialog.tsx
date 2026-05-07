import { useEdition } from "@/features/edition/EditionContext";
import { useAddBudgetLineMutation } from "@/features/budget/hooks/useAddBudgetLineMutation";
import { useGetBudgetCategoriesQuery } from "@/features/budget/hooks/useGetBudgetCategoriesQuery";
import { LineTypeEnum } from "@/generated/graphql";
import { CategoryCommand } from "./category-command";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import { ReactElement, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAdded: (budgetLineId: number) => void;
}

interface FormValues {
  budgetCategoryId: number;
}

export function AddBudgetLineDialog({
  open,
  setOpen,
  onAdded,
}: Props): ReactElement {
  const { edition } = useEdition();
  const { data: budgetCategoriesData } = useGetBudgetCategoriesQuery();
  const { mutateAsync: addBudgetLine, isPending } = useAddBudgetLineMutation();
  const [name, setName] = useState("");
  const { control, setValue, reset } = useForm<FormValues>();
  const budgetCategoryId = useWatch({ control, name: "budgetCategoryId" });

  const isValidForm = useMemo(
    () => name.trim().length > 0 && !!budgetCategoryId,
    [name, budgetCategoryId],
  );

  const handleAddBudgetLine = (): void => {
    if (!isValidForm || !budgetCategoryId) return;

    void addBudgetLine({
      name: name.trim(),
      budgetCategoryId,
      editionId: edition.id,
      estimatedQuantity: 1,
      estimatedUnitPrice: 0,
      lineType: LineTypeEnum.Expense,
    })
      .then((data) => {
        if (data.addBudgetLine?.id) {
          onAdded(data.addBudgetLine.id);
          toast.success("Article ajouté avec succès");
          setName("");
          reset();
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout de l'article", {
          description: error.message,
        });
      })
      .finally(() => {
        setOpen(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un article</DialogTitle>
          <DialogDescription>
            Ajouter un article simple avec son nom et sa categorie.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="* Nom de l'article"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CategoryCommand
            control={control}
            fieldName="budgetCategoryId"
            allCategories={budgetCategoriesData?.budgetCategories ?? []}
            onAdded={(categoryId) => setValue("budgetCategoryId", categoryId)}
            title="Catégorie"
          />
        </div>
        <Button
          type="button"
          onClick={handleAddBudgetLine}
          disabled={!isValidForm || isPending}
        >
          {isPending ? <Spinner /> : "Ajouter"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
