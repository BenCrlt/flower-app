import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BudgetCategoriesItem } from "@/generated/graphql";
import { ReactElement } from "react";
import { useEditBudgetLineForm } from "../hooks/useEditBudgetLineForm";
import { BudgetLineFormFields } from "./budget-line-form-fields";

interface BudgetLineData {
  id: number;
  name: string;
  description: string;
  estimatedQuantity: number;
  estimatedUnitPrice: number;
  budgetCategoryId: number;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  line: BudgetLineData;
  allCategories?: BudgetCategoriesItem[];
}

export function EditBudgetLineSheet({
  open,
  onOpenChange,
  line,
  allCategories,
}: Props): ReactElement {
  const { register, control, errors, handleClose, handleSubmit } =
    useEditBudgetLineForm({
      setOpen: onOpenChange,
      defaultValues: line,
    });

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => (o ? onOpenChange(true) : handleClose())}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{line.name}</SheetTitle>
          <SheetDescription>
            Cliquez sur un champ pour le modifier.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <BudgetLineFormFields
              register={register}
              control={control}
              errors={errors}
              allCategories={allCategories}
              mode="edit"
              currentValues={line}
            />
          </div>
          <SheetFooter>
            <Button type="submit" disabled={Object.keys(errors).length > 0}>
              Enregistrer
            </Button>
            <SheetClose asChild>
              <Button variant="outline" onClick={handleClose}>
                Annuler
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
