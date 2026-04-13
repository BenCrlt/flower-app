import { BudgetCategoriesItem } from "@/generated/graphql";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { AddCategoryDialog } from "./add-category-dialog";
import { CategoryBadge } from "./CategoryBadge";
import { PopoverCommand } from "./PopoverCommand";
import { CommandItem } from "./ui/command";
import { Field, FieldError } from "./ui/field";

interface Props<T extends FieldValues> {
  control: Control<T>;
  error?: string;
  fieldName: Path<T>;
  allCategories: BudgetCategoriesItem[];
  onAdded: (categoryId: number) => void;
  title?: string;
}

export const CategoryCommand = <T extends FieldValues>({
  onAdded,
  control,
  error,
  fieldName,
  allCategories,
  title = "Catégorie",
}: Props<T>) => {
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);

  const getCategoryColor = (categoryId: number) => {
    return allCategories?.find((category) => category.id === categoryId)?.color;
  };

  return (
    <Field data-invalid={!!error}>
      <span className="text-sm font-medium text-foreground">{title}</span>
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <PopoverCommand
            items={
              allCategories?.map((category) => ({
                label: category.name,
                value: category.id,
              })) || []
            }
            selectedValue={field.value}
            setSelectedValue={(value) => field.onChange(value)}
            actions={[
              <CommandItem
                key="add-category"
                onSelect={() => setOpenAddCategoryDialog(true)}
              >
                <Plus className="h-4 w-4" />
                Ajouter une catégorie
              </CommandItem>,
            ]}
            inputPlaceholder="Sélectionnez une catégorie..."
            commandInputPlaceholder="Rechercher une catégorie..."
            title="Catégories"
            emptyMessage="Pas de catégorie trouvée."
            renderItem={(item) => (
              <CategoryBadge
                name={item.label}
                color={getCategoryColor(item.value)}
              />
            )}
            renderTriggerValue={(item) =>
              item ? (
                <CategoryBadge
                  name={item.label}
                  color={getCategoryColor(item.value)}
                />
              ) : (
                <span className="text-muted-foreground">
                  Sélectionnez une catégorie...
                </span>
              )
            }
          />
        )}
      />
      <FieldError errors={error ? [{ message: error }] : undefined} />
      <AddCategoryDialog
        onAdded={onAdded}
        open={openAddCategoryDialog}
        setOpen={setOpenAddCategoryDialog}
      />
    </Field>
  );
};
