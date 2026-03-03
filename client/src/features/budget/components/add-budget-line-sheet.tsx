import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BudgetCategoriesItem, LineTypeEnum } from "@/generated/graphql";
import { CirclePlus } from "lucide-react";
import { ReactElement, useState } from "react";
import { useAddBudgetLineForm } from "../hooks/useAddBudgetLineForm";
import { getBudgetLineTypeString } from "../utils";
import { BudgetLineFormFields } from "./budget-line-form-fields";

interface Props {
  lineType: LineTypeEnum;
  allCategories?: BudgetCategoriesItem[];
}

export function AddBudgetLineSheet({
  lineType,
  allCategories,
}: Props): ReactElement {
  const lineTypeString = getBudgetLineTypeString(lineType);
  const [open, setOpen] = useState(false);

  const { register, control, errors, handleClose, handleSubmit } =
    useAddBudgetLineForm({ setOpen, lineType });

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => (o ? setOpen(true) : handleClose())}
    >
      <SheetTrigger asChild>
        <Button variant="default">
          Ajouter <CirclePlus />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ajout d'une nouvelle {lineTypeString}</SheetTitle>
          <SheetDescription>
            Rentrez les informations prévisionnels. Les quantités/couts réels
            seront calculées automatiquement.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <BudgetLineFormFields
              register={register}
              control={control}
              errors={errors}
              allCategories={allCategories}
              namePlaceholder={`Nom de la ${lineTypeString}`}
            />
          </div>
          <SheetFooter>
            <Button type="submit" disabled={Object.keys(errors).length > 0}>
              Ajouter
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
