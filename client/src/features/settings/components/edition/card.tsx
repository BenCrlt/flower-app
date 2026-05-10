import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { useEdition } from "@/features/edition/EditionContext";
import { useUpdateEdition } from "@/features/settings/hooks/useUpdateEdition";
import type { UpdateEditionMutation } from "@/generated/graphql";
import { format, parse } from "date-fns";
import { Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditionFormValues {
  name: string;
  openingBalance: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

function parseEditionDateTime(raw: string): Date | null {
  const s = raw?.trim() ?? "";
  if (!s) return null;

  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) {
    const parsed = parse(s, "d/M/yyyy", new Date());
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const parsed = parse(s, "yyyy-MM-dd", new Date());
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  const numeric = /^\d+$/.test(s);
  const d = numeric ? new Date(Number(s)) : new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

function toDatePart(raw: string): string {
  const d = parseEditionDateTime(raw);
  if (!d) return "";
  return format(d, "yyyy-MM-dd");
}

function toTimePart(raw: string): string {
  const d = parseEditionDateTime(raw);
  if (!d) return "";
  return format(d, "HH:mm");
}

/** Accepte par ex. `9:30`, `09:30`, `14:05`. */
function normalizeTimeInput(timeStr: string): string {
  const t = timeStr.trim();
  const m = /^(\d{1,2}):(\d{1,2})$/.exec(t);
  if (!m) {
    throw new Error("Heure invalide");
  }
  const hh = Number(m[1]);
  const mm = Number(m[2]);
  if (hh > 23 || mm > 59) {
    throw new Error("Heure invalide");
  }
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

/** Combine date + heure locales en ISO UTC pour l’API. */
function dateAndTimeToIso(dateStr: string, timeStr: string): string {
  const dPart = dateStr.trim();
  const tNorm = normalizeTimeInput(timeStr);
  const d = parse(`${dPart}T${tNorm}`, "yyyy-MM-dd'T'HH:mm", new Date());
  if (Number.isNaN(d.getTime())) {
    throw new Error("Date ou heure invalide");
  }
  return d.toISOString();
}

const DATE_TIME_ROW_CLASS = "flex min-w-0 flex-row items-end gap-2";

export const EditionCard = () => {
  const { edition, handleSetEdition } = useEdition();
  const { mutate, isPending } = useUpdateEdition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditionFormValues>({
    defaultValues: {
      name: edition.name,
      openingBalance: edition.openingBalance,
      startDate: toDatePart(edition.startDate),
      startTime: toTimePart(edition.startDate),
      endDate: toDatePart(edition.endDate),
      endTime: toTimePart(edition.endDate),
    },
  });

  useEffect(() => {
    reset({
      name: edition.name,
      openingBalance: edition.openingBalance,
      startDate: toDatePart(edition.startDate),
      startTime: toTimePart(edition.startDate),
      endDate: toDatePart(edition.endDate),
      endTime: toTimePart(edition.endDate),
    });
  }, [
    edition.endDate,
    edition.id,
    edition.name,
    edition.openingBalance,
    edition.startDate,
    reset,
  ]);

  const onSubmit = (data: EditionFormValues) => {
    let startDateIso: string;
    let endDateIso: string;
    try {
      startDateIso = dateAndTimeToIso(data.startDate, data.startTime);
      endDateIso = dateAndTimeToIso(data.endDate, data.endTime);
    } catch {
      toast.error("Date ou heure invalide");
      return;
    }

    mutate(
      {
        id: edition.id,
        name: data.name,
        openingBalance: data.openingBalance,
        startDate: startDateIso,
        endDate: endDateIso,
      },
      {
        onSuccess: (result: UpdateEditionMutation) => {
          const updated = result.updateEdition;
          if (updated) {
            handleSetEdition({
              ...edition,
              name: updated.name,
              startDate: updated.startDate,
              endDate: updated.endDate,
              openingBalance: updated.openingBalance,
            });
          }
          toast.success("Édition mise à jour");
        },
        onError: (error: Error) => {
          toast.error("Erreur lors de la mise à jour", {
            description: error.message,
          });
        },
      },
    );
  };

  const timeRules = {
    required: "Heure requise",
    validate: (value: string) => {
      try {
        normalizeTimeInput(value);
        return true;
      } catch {
        return "Format hh:mm (ex. 9:30)";
      }
    },
  } as const;

  const dateRules = {
    required: "Date requise",
  } as const;

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>
          <TypographyH3>Édition</TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyP>Gérez les informations de l'édition.</TypographyP>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <form
          key={edition.id}
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-md flex-col gap-4"
        >
          <Field>
            <FieldLabel htmlFor="edition-name">Nom</FieldLabel>
            <Input
              id="edition-name"
              {...register("name", {
                required: "Le nom est requis",
                minLength: {
                  value: 2,
                  message: "Au moins 2 caractères",
                },
                maxLength: {
                  value: 100,
                  message: "Au plus 100 caractères",
                },
              })}
              aria-invalid={!!errors.name}
            />
            <FieldError errors={[errors.name]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="edition-opening-balance">
              Solde initial
            </FieldLabel>
            <Input
              id="edition-opening-balance"
              type="number"
              step="0.01"
              min={0}
              {...register("openingBalance", {
                required: "Le solde est requis",
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Le solde doit être positif ou nul",
                },
              })}
              aria-invalid={!!errors.openingBalance}
            />
            <FieldError errors={[errors.openingBalance]} />
          </Field>
          <Field>
            <FieldLabel>Début</FieldLabel>
            <div className={DATE_TIME_ROW_CLASS}>
              <Input
                id="edition-start-date"
                type="date"
                className="min-w-0 flex-1"
                {...register("startDate", dateRules)}
                aria-invalid={!!errors.startDate}
              />
              <Input
                id="edition-start-time"
                type="text"
                inputMode="numeric"
                placeholder="hh:mm"
                autoComplete="off"
                className="w-22 shrink-0 font-mono tabular-nums md:w-24"
                {...register("startTime", timeRules)}
                aria-invalid={!!errors.startTime}
                aria-label="Heure de début"
              />
            </div>
            <FieldError errors={[errors.startDate, errors.startTime]} />
          </Field>
          <Field>
            <FieldLabel>Fin</FieldLabel>
            <div className={DATE_TIME_ROW_CLASS}>
              <Input
                id="edition-end-date"
                type="date"
                className="min-w-0 flex-1"
                {...register("endDate", dateRules)}
                aria-invalid={!!errors.endDate}
              />
              <Input
                id="edition-end-time"
                type="text"
                inputMode="numeric"
                placeholder="hh:mm"
                autoComplete="off"
                className="w-22 shrink-0 font-mono tabular-nums md:w-24"
                {...register("endTime", timeRules)}
                aria-invalid={!!errors.endTime}
                aria-label="Heure de fin"
              />
            </div>
            <FieldError errors={[errors.endDate, errors.endTime]} />
          </Field>
          <Button type="submit" disabled={isPending} className="w-fit">
            {isPending ? <Spinner /> : <Save />}
            Enregistrer
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
