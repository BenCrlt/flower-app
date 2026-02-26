import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  BudgetCategoriesItem,
  BudgetLinesBudgetLineTypeInput,
} from "@/generated/graphql";
import { CirclePlus } from "lucide-react";
import { ReactElement, useState } from "react";
import { Controller } from "react-hook-form";
import { useAddBudgetLineForm } from "../hooks/useAddBudgetLineForm";
import { getBudgetLineTypeString } from "../utils";

interface Props {
  lineType: BudgetLinesBudgetLineTypeInput;
  allCategories?: BudgetCategoriesItem[];
}

export function AddBudgetLineSheet({
  lineType,
  allCategories,
}: Props): ReactElement {
  const lineTypeString = getBudgetLineTypeString(lineType);
  const [open, setOpen] = useState(false);

  const { register, control, errors, handleClose, handleSubmit } =
    useAddBudgetLineForm({
      setOpen,
      lineType,
    });

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
          <SheetTitle>Ajout d'une nouvelle {lineTypeString} </SheetTitle>
          <SheetDescription>
            Rentrez les informations prévisionnels. Les quantités/couts réels
            seront calculées automatiquement.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="add-budget-line-input-name">Nom</FieldLabel>
              <Input
                id="add-budget-line-input-name"
                placeholder={`Nom de la ${lineTypeString}`}
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              <FieldError errors={[errors.name]} />
            </Field>
            <Field>
              <FieldLabel htmlFor="add-budget-line-input-desc">
                Description
              </FieldLabel>
              <Input
                id="add-budget-line-input-desc"
                placeholder="Description..."
                {...register("description")}
              />
            </Field>
            <Field data-invalid={!!errors.estimatedQuantity}>
              <FieldLabel htmlFor="add-budget-line-input-quantity">
                Quantité prévisionnelle
              </FieldLabel>
              <Input
                id="add-budget-line-input-quantity"
                aria-invalid={!!errors.estimatedQuantity}
                {...register("estimatedQuantity", { valueAsNumber: true })}
              />
              <FieldError errors={[errors.estimatedQuantity]} />
            </Field>
            <Field data-invalid={!!errors.estimatedUnitPrice}>
              <FieldLabel htmlFor="add-budget-line-input-cost">
                Coût prévisionnel
              </FieldLabel>
              <Input
                id="add-budget-line-input-cost"
                aria-invalid={!!errors.estimatedUnitPrice}
                {...register("estimatedUnitPrice", { valueAsNumber: true })}
              />
              <FieldError errors={[errors.estimatedUnitPrice]} />
            </Field>
            <Field data-invalid={!!errors.budgetCategoryId}>
              <FieldLabel htmlFor="add-budget-line-input-category">
                Catégorie
              </FieldLabel>
              <Controller
                name="budgetCategoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    aria-invalid={!!errors.budgetCategoryId}
                    value={field.value?.toString()}
                    onValueChange={(val) => field.onChange(Number(val))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une catégorie..." />
                    </SelectTrigger>
                    <SelectContent>
                      {allCategories?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.budgetCategoryId]} />
            </Field>
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
