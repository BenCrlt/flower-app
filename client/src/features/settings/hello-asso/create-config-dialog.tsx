import { CategoryCommand } from "@/components/category-command";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useGetBudgetCategoriesQuery } from "@/features/budget/hooks/useGetBudgetCategoriesQuery";
import { useEdition } from "@/features/edition/EditionContext";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { useAddHelloAssoConfigMutation } from "../hooks/useAddHelloAssoConfigMutation";

interface CreateConfigFormValues {
  formSlug: string;
  enableSynchro: boolean;
  budgetCategoryId?: number;
}

export const CreateConfigDialog = () => {
  const { edition } = useEdition();
  const [open, setOpen] = useState(false);
  const { data } = useGetBudgetCategoriesQuery();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
    clearErrors,
    setValue,
  } = useForm<CreateConfigFormValues>({
    defaultValues: {
      formSlug: "",
      enableSynchro: true,
      budgetCategoryId: 0,
    },
    mode: "onChange",
  });

  const { mutate: addHelloAssoConfig, isPending } =
    useAddHelloAssoConfigMutation({
      onError: (error) => {
        toast.error("Erreur lors de la création de la configuration", {
          description: error.message,
        });
        handleClose();
      },
      onSuccess: () => {
        toast.success("Configuration créée avec succès");
        reset();
        handleClose();
      },
    });

  const handleClose = () => {
    setOpen(false);
    reset();
    clearErrors();
  };

  const onSubmit = (data: CreateConfigFormValues) => {
    void addHelloAssoConfig({
      formSlug: data.formSlug,
      enableSynchro: data.enableSynchro,
      editionId: edition.id,
      budgetCategoryId: data.budgetCategoryId,
    });
  };

  const isEnableSynchro = useWatch({
    control,
    name: "enableSynchro",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="size-4" />
          Créer une configuration
        </Button>
      </DialogTrigger>
      <DialogContent onCloseAutoFocus={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Créer une configuration</DialogTitle>
          </DialogHeader>
          <Field>
            <Input
              placeholder="form-slug"
              {...register("formSlug", { required: "Le form slug est requis" })}
              aria-invalid={!!errors.formSlug}
            />
            <FieldError errors={[errors.formSlug]} />
          </Field>
          <FieldGroup className="mx-auto">
            <Field orientation="horizontal">
              <Controller
                control={control}
                name="enableSynchro"
                render={({ field }) => (
                  <Checkbox
                    id="enable-synchro-checkbox"
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                )}
              />
              <FieldLabel htmlFor="enable-synchro-checkbox">
                Ajouter et synchroniser automatiquement les produits
              </FieldLabel>
            </Field>
          </FieldGroup>
          {isEnableSynchro && (
            <CategoryCommand
              title="Catégorie de budget pour les produits"
              control={control}
              fieldName="budgetCategoryId"
              allCategories={data?.budgetCategories || []}
              onAdded={(categoryId) => setValue("budgetCategoryId", categoryId)}
              error={errors.budgetCategoryId?.message}
            />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button disabled={!isValid || isPending} type="submit">
              {isPending ? <Spinner /> : "Synchroniser"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
