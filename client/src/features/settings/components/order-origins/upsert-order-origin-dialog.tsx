import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useGetBudgetLinesQuery } from "@/features/budget/hooks/useGetBudgetLinesQuery";
import { useGetOrderOriginQuery } from "@/features/cash-register/hooks/useGetOrderOriginQuery";
import { LineTypeEnum } from "@/generated/graphql";
import { useForm } from "react-hook-form";

interface OrderOriginFormValues {
  name: string;
  budgetLineIds: number[];
}

export interface UpsertOrderOriginSubmitValues {
  name: string;
  budgetLineIds: number[];
}

interface UpsertOrderOriginDialogProps {
  open: boolean;
  editionId: number;
  editingOrigin: { id: number; name: string; isPhysical: boolean } | null;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: UpsertOrderOriginSubmitValues) => void;
}

export const UpsertOrderOriginDialog = ({
  open,
  editionId,
  editingOrigin,
  isPending,
  onOpenChange,
  onSubmit,
}: UpsertOrderOriginDialogProps) => {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<OrderOriginFormValues>({
    defaultValues: {
      name: "",
      budgetLineIds: [],
    },
    mode: "onChange",
  });

  const budgetLineIds = watch("budgetLineIds");
  const showBudgetLinesSection = !editingOrigin || editingOrigin.isPhysical;

  const { data: budgetLinesData, isSuccess: budgetLinesReady } =
    useGetBudgetLinesQuery({
      variables: {
        editionId,
        budgetLineType: LineTypeEnum.Income,
        excludeHelloAsso: true,
      },
      enabled: open && editionId > 0 && showBudgetLinesSection,
    });

  const { isSuccess: orderOriginReady } = useGetOrderOriginQuery({
    variables: { id: editingOrigin?.id ?? 0, editionId },
    enabled: open && !!editingOrigin?.id,
    onComplete: (data) => {
      const linkedIds =
        data?.orderOrigin?.budgetLines?.map((line) => line.id) ?? [];
      setValue("budgetLineIds", linkedIds, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("name", data?.orderOrigin?.name ?? "", {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
  });

  const budgetSectionReady = !showBudgetLinesSection || budgetLinesReady;
  const linkedBudgetLinesReady = !editingOrigin || orderOriginReady;
  const formReady = budgetSectionReady && linkedBudgetLinesReady;
  const showBudgetLinesSpinner =
    !budgetSectionReady || (!!editingOrigin && !orderOriginReady);

  const toggleBudgetLine = (id: number) => {
    const next = budgetLineIds.includes(id)
      ? budgetLineIds.filter((x) => x !== id)
      : [...budgetLineIds, id];
    setValue("budgetLineIds", next, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      reset({ name: "", budgetLineIds: [] });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] gap-4 overflow-y-auto sm:max-w-lg">
        <form
          onSubmit={handleSubmit((values) =>
            onSubmit({
              name: values.name,
              budgetLineIds: values.budgetLineIds,
            }),
          )}
          className="flex flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>
              {editingOrigin
                ? "Modifier un point de vente"
                : "Ajouter un point de vente"}
            </DialogTitle>
          </DialogHeader>
          <Field>
            <FieldLabel htmlFor="order-origin-name">Nom</FieldLabel>
            <Input
              id="order-origin-name"
              aria-invalid={!!errors.name}
              autoComplete="off"
              {...register("name", {
                required: "Le nom est requis",
                minLength: {
                  value: 2,
                  message: "Le nom doit contenir au moins 2 caractères",
                },
              })}
            />
            <FieldError errors={[errors.name]} />
          </Field>

          {showBudgetLinesSection && (
            <FieldGroup>
              <FieldLabel>Produits à la caisse (recettes)</FieldLabel>
              <FieldDescription>
                Choisissez les lignes budgétaires proposées lors des ventes
                pour ce point de vente (édition en cours, hors HelloAsso).
              </FieldDescription>
              {showBudgetLinesSpinner ? (
                <div className="flex items-center gap-2 py-6 text-muted-foreground">
                  <Spinner />
                  <span className="text-sm">Chargement des lignes…</span>
                </div>
              ) : budgetLinesData?.budgetLines.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Aucune ligne de recette disponible pour cette édition.
                </p>
              ) : (
                <div className="max-h-56 space-y-2 overflow-y-auto rounded-md border p-3">
                  {budgetLinesData?.budgetLines.map((line) => {
                    const checkboxId = `order-origin-budget-line-${line.id}`;
                    return (
                      <Field key={line.id} orientation="horizontal">
                        <Checkbox
                          id={checkboxId}
                          checked={budgetLineIds.includes(line.id)}
                          onCheckedChange={() => toggleBudgetLine(line.id)}
                        />
                        <FieldLabel
                          htmlFor={checkboxId}
                          className="font-normal leading-snug"
                        >
                          <span>{line.name}</span>
                          {line.category?.name ? (
                            <span className="block text-xs text-muted-foreground">
                              {line.category.name}
                            </span>
                          ) : null}
                        </FieldLabel>
                      </Field>
                    );
                  })}
                </div>
              )}
            </FieldGroup>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={!isValid || !formReady || isPending}
            >
              {isPending ? <Spinner /> : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
