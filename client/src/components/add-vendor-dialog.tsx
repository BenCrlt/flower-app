import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useAddOrUpdateVendor } from "@/features/payment/hooks/useAddOrUpdateVendor";
import { AddOrUpdateVendorMutationVariables } from "@/generated/graphql";
import { ReactElement, useMemo, useState } from "react";
import { toast } from "sonner";

interface Props {
  onAdded: (vendorId: number) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function AddVendorDialog({
  onAdded,
  open,
  setOpen,
}: Props): ReactElement {
  const [vendorToAdd, setVendorToAdd] =
    useState<AddOrUpdateVendorMutationVariables>({
      name: "",
    });

  const { mutateAsync: addOrUpdateVendor, isPending } = useAddOrUpdateVendor();

  const handleAddOrUpdateVendor = (): void => {
    if (!vendorToAdd.name.length) return;

    void addOrUpdateVendor(vendorToAdd)
      .then((data) => {
        if (data.addOrUpdateVendor?.id) {
          onAdded(data.addOrUpdateVendor.id);
          toast.success("Fournisseur ajouté avec succès");
        }
      })
      .catch((error) => {
        toast.error("Erreur lors de l'ajout du fournisseur", {
          description: error.message,
        });
      })
      .finally(() => {
        setOpen(false);
      });
  };

  const isValidForm = useMemo(
    () => vendorToAdd.name.length > 0,
    [vendorToAdd.name],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un fournisseur</DialogTitle>
          <DialogDescription>
            Ajouter un nouveau fournisseur pour vos factures
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="* Nom du fournisseur"
            value={vendorToAdd.name}
            onChange={(e) =>
              setVendorToAdd({ ...vendorToAdd, name: e.target.value })
            }
          />
          <Input
            placeholder="Adresse du fournisseur"
            value={vendorToAdd.address ?? ""}
            onChange={(e) =>
              setVendorToAdd({ ...vendorToAdd, address: e.target.value })
            }
          />
          <Input
            placeholder="Email du fournisseur"
            value={vendorToAdd.email ?? ""}
            onChange={(e) =>
              setVendorToAdd({ ...vendorToAdd, email: e.target.value })
            }
          />
          <Input
            placeholder="Téléphone du fournisseur"
            value={vendorToAdd.phone ?? ""}
            onChange={(e) =>
              setVendorToAdd({ ...vendorToAdd, phone: e.target.value })
            }
          />
          <Input
            placeholder="Description du fournisseur"
            value={vendorToAdd.description ?? ""}
            onChange={(e) =>
              setVendorToAdd({ ...vendorToAdd, description: e.target.value })
            }
          />
        </div>
        <Button
          type="button"
          onClick={handleAddOrUpdateVendor}
          disabled={!isValidForm || isPending}
        >
          {isPending ? <Spinner /> : "Ajouter"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
