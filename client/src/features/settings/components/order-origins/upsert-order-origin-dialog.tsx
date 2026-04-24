import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface OrderOriginFormValues {
  name: string;
}

interface UpsertOrderOriginDialogProps {
  open: boolean;
  editingOrigin: { id: number; name: string } | null;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: OrderOriginFormValues) => void;
}

export const UpsertOrderOriginDialog = ({
  open,
  editingOrigin,
  isPending,
  onOpenChange,
  onSubmit,
}: UpsertOrderOriginDialogProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<OrderOriginFormValues>({
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!open) {
      reset({ name: "" });
      return;
    }

    reset({ name: editingOrigin?.name ?? "" });
  }, [editingOrigin, open, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={!isValid || isPending}>
              {isPending ? <Spinner /> : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
