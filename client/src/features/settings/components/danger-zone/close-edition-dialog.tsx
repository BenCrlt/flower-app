import { DateRangePicker, StrictDateRange } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useEdition } from "@/features/edition/EditionContext";
import { useCloseEditionMutation } from "@/features/settings/hooks/useCloseEditionMutation";
import { useGetEditionClosingSummaryQuery } from "@/features/settings/hooks/useGetEditionClosingSummaryQuery";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { dateAndTimeToIso } from "@/utils/DateUtils";
import { format } from "date-fns";
import { Lock } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CloseEditionFormValues {
  incomeAdjustment: number;
  nextEditionName: string;
  startTime: string;
  endTime: string;
}

const timeRules = {
  required: "Heure requise",
} as const;

export function CloseEditionDialog() {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<StrictDateRange>();
  const { editions, handleSetEdition } = useEdition();
  const activeEdition = editions.find((e) => e.active);

  const { data: summary, isLoading: isSummaryLoading } =
    useGetEditionClosingSummaryQuery({
      variables: { id: activeEdition?.id ?? 0 },
      enabled: open && !!activeEdition,
    });

  const { mutate, isPending } = useCloseEditionMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CloseEditionFormValues>({
    defaultValues: {
      incomeAdjustment: 0,
      nextEditionName: "",
      startTime: "",
      endTime: "",
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) {
      reset({
        incomeAdjustment: 0,
        nextEditionName: "",
        startTime: "",
        endTime: "",
      });
      setDateRange(undefined);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: CloseEditionFormValues) => {
    if (!activeEdition) {
      return;
    }
    if (!dateRange) {
      toast.error("Merci de sélectionner les dates de la prochaine édition");
      return;
    }

    let nextEditionStartDate: string;
    let nextEditionEndDate: string;
    try {
      nextEditionStartDate = dateAndTimeToIso(
        format(dateRange.from, "yyyy-MM-dd"),
        data.startTime,
      );
      nextEditionEndDate = dateAndTimeToIso(
        format(dateRange.to, "yyyy-MM-dd"),
        data.endTime,
      );
    } catch {
      toast.error("Date ou heure invalide");
      return;
    }

    mutate(
      {
        editionId: activeEdition.id,
        incomeAdjustment: data.incomeAdjustment,
        nextEditionName: data.nextEditionName,
        nextEditionStartDate,
        nextEditionEndDate,
      },
      {
        onSuccess: (result) => {
          const newEdition = result.closeEdition;
          if (newEdition) {
            handleSetEdition(newEdition);
          }
          toast.success("Édition clôturée, nouvelle édition créée");
          handleClose();
        },
        onError: (error: Error) => {
          toast.error("Erreur lors de la clôture de l'édition", {
            description: error.message,
          });
        },
      },
    );
  };

  const openingBalance = summary?.edition?.openingBalance ?? 0;
  const totalIncome = summary?.edition?.totalIncome ?? 0;
  const totalExpense = summary?.edition?.totalExpense ?? 0;
  const currentBalance = openingBalance + totalIncome - totalExpense;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="destructive" disabled={!activeEdition}>
          <Lock className="size-4" />
          Clôturer l'édition
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="close-edition-dialog-description"
        className="max-w-md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>
              Clôturer {activeEdition?.name ?? "l'édition"} ?
            </DialogTitle>
            <DialogDescription id="close-edition-dialog-description">
              Cette action désactive l'édition en cours et crée immédiatement la
              prochaine édition, sélectionnée automatiquement.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-1 rounded-md border p-3 text-sm">
            {isSummaryLoading ? (
              <Spinner />
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Recettes réelles
                  </span>
                  <span className="font-medium">
                    {formatPriceToEuros(totalIncome)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Dépenses réelles
                  </span>
                  <span className="font-medium">
                    {formatPriceToEuros(totalExpense)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Solde actuel</span>
                  <span className="font-medium">
                    {formatPriceToEuros(currentBalance)}
                  </span>
                </div>
              </>
            )}
          </div>

          <Field>
            <FieldLabel htmlFor="close-edition-income-adjustment">
              Écart de recettes
            </FieldLabel>
            <Input
              id="close-edition-income-adjustment"
              type="number"
              step="0.01"
              {...register("incomeAdjustment", {
                required: "Le montant est requis",
                valueAsNumber: true,
              })}
              aria-invalid={!!errors.incomeAdjustment}
            />
            <FieldDescription>
              Corrige les recettes réelles en cas d'erreur de saisie pendant
              l'événement (montant positif ou négatif, 0 si aucun écart).
            </FieldDescription>
            <FieldError errors={[errors.incomeAdjustment]} />
          </Field>

          <Field>
            <FieldLabel>Dates de la prochaine édition</FieldLabel>
            <DateRangePicker
              dateRange={dateRange ?? { from: new Date(), to: new Date() }}
              handleSelectDateRange={setDateRange}
              disableFutureDates={false}
            />
            <div className="flex min-w-0 flex-row items-end gap-2">
              <Field>
                <FieldLabel htmlFor="close-edition-start-time">
                  Heure de début
                </FieldLabel>
                <Input
                  id="close-edition-start-time"
                  type="text"
                  inputMode="numeric"
                  placeholder="hh:mm"
                  autoComplete="off"
                  className="w-24 shrink-0 font-mono tabular-nums"
                  {...register("startTime", timeRules)}
                  aria-invalid={!!errors.startTime}
                />
                <FieldError errors={[errors.startTime]} />
              </Field>
              <Field>
                <FieldLabel htmlFor="close-edition-end-time">
                  Heure de fin
                </FieldLabel>
                <Input
                  id="close-edition-end-time"
                  type="text"
                  inputMode="numeric"
                  placeholder="hh:mm"
                  autoComplete="off"
                  className="w-24 shrink-0 font-mono tabular-nums"
                  {...register("endTime", timeRules)}
                  aria-invalid={!!errors.endTime}
                />
                <FieldError errors={[errors.endTime]} />
              </Field>
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="close-edition-next-name">
              Nom de la prochaine édition
            </FieldLabel>
            <Input
              id="close-edition-next-name"
              {...register("nextEditionName", {
                required: "Le nom est requis",
                minLength: { value: 2, message: "Au moins 2 caractères" },
                maxLength: { value: 100, message: "Au plus 100 caractères" },
              })}
              aria-invalid={!!errors.nextEditionName}
            />
            <FieldError errors={[errors.nextEditionName]} />
          </Field>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Annuler
            </Button>
            <Button type="submit" variant="destructive" disabled={isPending}>
              {isPending ? <Spinner /> : <Lock className="size-4" />}
              Clôturer et créer la prochaine édition
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
