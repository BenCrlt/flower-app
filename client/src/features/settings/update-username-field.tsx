import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Pencil, Save, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormValues {
  username: string;
}

export const UpdateUsernameField = () => {
  const { data: session } = authClient.useSession();
  const [editMode, setEditMode] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      username: session?.user?.username ?? "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: FormValues) => {
    authClient.updateUser({
      username: data.username,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Le nom d'utilisateur a été modifié avec succès");
          handleClose(data.username);
        },
        onError: ({ error }) => {
          toast.error("Erreur lors de la modification du nom d'utilisateur", {
            description: error.message,
          });
          handleClose();
        },
      },
    });
  };

  const handleClose = (newUsername?: string) => {
    setEditMode(false);
    clearErrors();

    if (newUsername) {
      reset({ username: newUsername });
    } else {
      reset();
    }
  };

  return (
    <Field>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <div className="flex flex-row gap-2">
          <Input
            {...register("username", { required: true })}
            disabled={!editMode}
            aria-invalid={!!errors.username}
            className="w-sm"
          />
          {editMode ? (
            <div className="flex flex-row gap-2">
              <Button type="submit" variant="outline">
                <Save />
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleClose()}
              >
                <X />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              onClick={() => setEditMode(true)}
              variant="outline"
            >
              <Pencil />
            </Button>
          )}
        </div>
        <FieldError errors={[errors.username]} />
      </form>
    </Field>
  );
};
