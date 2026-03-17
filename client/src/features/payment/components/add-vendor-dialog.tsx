import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AddOrUpdateVendorMutationVariables } from "@/generated/graphql";
import { Plus } from "lucide-react";
import { ReactElement, useState } from "react";
import { useAddOrUpdateVendor } from "../hooks/useAddOrUpdateVendor";

export function AddVendorDialog(): ReactElement {
  const [vendorToAdd, setVendorToAdd] =
    useState<AddOrUpdateVendorMutationVariables>({
      name: "",
    });

  const { mutateAsync: addOrUpdateVendor } = useAddOrUpdateVendor();

  const handleAddOrUpdateVendor = (
    e: React.FormEvent<HTMLFormElement>,
  ): void => {
    console.log("handleAddOrUpdateVendor", e);
    e.preventDefault();
    e.stopPropagation();
    if (!vendorToAdd.name.length) return;

    void addOrUpdateVendor(vendorToAdd);
  };

  return (
    <Dialog>
      <form onSubmit={handleAddOrUpdateVendor}>
        <DialogTrigger asChild>
          <div className="flex itemVjjs-center gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un fournisseur
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un fournisseur</DialogTitle>
            <DialogDescription>
              Ajouter un nouveau fournisseur pour vos factures
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Nom du fournisseur"
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
          <Button type="submit">Ajouter</Button>
        </DialogContent>
      </form>
    </Dialog>
  );
}
