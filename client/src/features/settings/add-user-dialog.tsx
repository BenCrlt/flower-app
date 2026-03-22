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
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormValues {
  username: string;
  password: string;
}

const pinRules = {
  required: "Code PIN requis",
  minLength: { value: 6, message: "6 chiffres requis" },
  pattern: {
    value: /^\d{6}$/,
    message: "6 chiffres uniquement",
  },
} as const;

/** Email technique unique dérivé du username (obligatoire pour l’API admin, non utilisé à la connexion). */
function syntheticEmailForUsername(username: string): string {
  const trimmed = username.trim().toLowerCase();
  const local = trimmed.replace(/[^a-z0-9._+-]/g, "_").replace(/_+/g, "_");
  return `${local || "user"}@users.flower-app.local`;
}

export function AddUserDialog() {
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const handleClose = () => {
    setOpen(false);
    clearErrors();
    reset();
  };

  const onSubmit = ({ username, password }: FormValues) => {
    const name = username.trim();
    const normalizedUsername = name.toLowerCase();

    authClient.admin.createUser({
      email: syntheticEmailForUsername(name),
      name,
      password,
      role: "user",
      data: {
        username: normalizedUsername,
        displayUsername: name,
      },
      fetchOptions: {
        onSuccess: () => {
          toast.success("Utilisateur créé avec succès !");
          handleClose();
        },
        onError: ({ error }) => {
          toast.error("Impossible de créer l’utilisateur !", {
            description: error.message,
          });
          handleClose();
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UserPlus className="size-4" />
          Ajouter un utilisateur
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby="add-user-dialog-description"
        className="max-w-sm"
      >
        <p id="add-user-dialog-description" className="sr-only">
          Créer un compte avec nom d’utilisateur et code PIN à six chiffres.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <DialogHeader>
            <DialogTitle>Nouvel utilisateur</DialogTitle>
          </DialogHeader>
          <Field>
            <FieldLabel htmlFor="new-user-username">
              Nom d’utilisateur
            </FieldLabel>
            <Input
              id="new-user-username"
              {...register("username", {
                required: "Nom d’utilisateur requis",
                minLength: { value: 3, message: "Au moins 3 caractères" },
                maxLength: { value: 30, message: "30 caractères maximum" },
              })}
              autoComplete="off"
              aria-invalid={!!errors.username}
              className="w-full"
            />
            <FieldError errors={[errors.username]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="new-user-pin">
              Code PIN (6 chiffres)
            </FieldLabel>
            <Controller
              name="password"
              control={control}
              rules={pinRules}
              render={({ field }) => (
                <PinInput
                  id="new-user-pin"
                  {...field}
                  aria-invalid={!!errors.password}
                />
              )}
            />
            <FieldError errors={[errors.password]} />
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={!isValid}>
              Créer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
