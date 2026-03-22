import { PinInput } from "@/components/pin-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormValues {
  actualPin: string;
  newPin: string;
}

const pinRules = {
  required: "Code PIN requis",
  minLength: { value: 6, message: "6 chiffres requis" },
  pattern: {
    value: /^\d{6}$/,
    message: "6 chiffres uniquement",
  },
} as const;

export function ChangePinDialog() {
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: {
      actualPin: "",
      newPin: "",
    },
    mode: "onSubmit",
  });

  const handleClose = () => {
    setOpen(false);
    clearErrors();
    reset();
  };

  const onSubmit = ({ actualPin, newPin }: FormValues) => {
    authClient.changePassword({
      newPassword: newPin,
      currentPassword: actualPin,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Code PIN modifié avec succès");
        },
        onError: ({ error }) => {
          toast.error("Erreur lors de la modification du code PIN", {
            description: error.message,
          });
        },
      },
    });
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <KeyRound className="size-4" />
          Modifier le code PIN
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="change-pin-dialog-description"
        showCloseButton={false}
        className="max-w-sm"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Modifier le code PIN</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Field>
              <FieldLabel htmlFor="actualPin">Code PIN actuel</FieldLabel>
              <Controller
                name="actualPin"
                control={control}
                rules={pinRules}
                render={({ field }) => (
                  <PinInput
                    id="actualPin"
                    {...field}
                    aria-invalid={!!errors.actualPin}
                  />
                )}
              />
              <FieldError errors={[errors.actualPin]} />
            </Field>
            <Field>
              <FieldLabel htmlFor="newPin">Nouveau code PIN</FieldLabel>
              <Controller
                name="newPin"
                control={control}
                rules={pinRules}
                render={({ field }) => (
                  <PinInput
                    id="newPin"
                    {...field}
                    aria-invalid={!!errors.newPin}
                  />
                )}
              />
              <FieldError errors={[errors.newPin]} />
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
