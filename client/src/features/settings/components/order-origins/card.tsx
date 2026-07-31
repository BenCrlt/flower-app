import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { useEdition } from "@/features/edition/EditionContext";
import { useGetOrderOriginsQuery } from "@/features/sales/hooks/useGetOrderOrigins";
import { Pencil, Plus, Store, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddOrUpdateOrderOriginMutation } from "../../hooks/useAddOrUpdateOrderOriginMutation";
import { useDeleteOrderOriginMutation } from "../../hooks/useDeleteOrderOrigin";
import { DeleteOrderOriginDialog } from "./delete-order-origin-dialog";
import { UpsertOrderOriginDialog } from "./upsert-order-origin-dialog";

export const OrderOriginsCard = () => {
  const { edition } = useEdition();
  const { data: orderOriginsData, isLoading } = useGetOrderOriginsQuery({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingOrigin, setEditingOrigin] = useState<{
    id: number;
    name: string;
    isPhysical: boolean;
  } | null>(null);
  const [deletingOrigin, setDeletingOrigin] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const { mutate: addOrUpdateOrderOrigin, isPending: isUpsertPending } =
    useAddOrUpdateOrderOriginMutation({
      onSuccess: () => {
        toast.success(
          editingOrigin
            ? "Point de vente modifié avec succès"
            : "Point de vente ajouté avec succès",
        );
        handleCloseFormDialog();
      },
      onError: (error) => {
        toast.error("Impossible d'enregistrer le point de vente", {
          description: error.message,
        });
      },
    });

  const { mutate: deleteOrderOrigin, isPending: isDeletePending } =
    useDeleteOrderOriginMutation({
      onSuccess: () => {
        toast.success("Point de vente supprimé avec succès");
        handleCloseDeleteDialog();
      },
      onError: (error) => {
        toast.error("Impossible de supprimer le point de vente", {
          description: error.message,
        });
      },
    });

  const orderOrigins = orderOriginsData?.orderOrigins ?? [];

  const handleCloseFormDialog = () => {
    setIsFormOpen(false);
    setEditingOrigin(null);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteOpen(false);
    setDeletingOrigin(null);
  };

  const handleCreateClick = () => {
    setEditingOrigin(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (origin: {
    id: number;
    name: string;
    isPhysical: boolean;
  }) => {
    setEditingOrigin(origin);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (origin: { id: number; name: string }) => {
    setDeletingOrigin(origin);
    setIsDeleteOpen(true);
  };

  const onSubmit = ({
    name,
    budgetLineIds,
  }: {
    name: string;
    budgetLineIds: number[];
  }) => {
    addOrUpdateOrderOrigin({
      id: editingOrigin?.id,
      name: name.trim(),
      budgetLineIds,
    });
  };

  const onDelete = () => {
    if (!deletingOrigin) {
      return;
    }

    deleteOrderOrigin({ id: deletingOrigin.id });
  };

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div className="space-y-1">
          <CardTitle>
            <TypographyH3>Points de ventes</TypographyH3>
          </CardTitle>
          <CardDescription>
            <TypographyP>Ajouter ou supprimer des points de ventes</TypographyP>
          </CardDescription>
        </div>
        <Button
          type="button"
          onClick={handleCreateClick}
          disabled={isUpsertPending || isDeletePending}
        >
          <Plus className="size-4" />
          Ajouter un point de vente
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Spinner />
            <span>Chargement des points de vente...</span>
          </div>
        ) : null}

        {!isLoading && orderOrigins.length === 0 ? (
          <TypographyP className="text-muted-foreground">
            Aucun point de vente pour le moment.
          </TypographyP>
        ) : null}

        {!isLoading &&
          orderOrigins.map((origin) => (
            <div
              key={origin.id}
              className="flex items-center justify-between gap-3 rounded-md border p-3"
            >
              <div className="flex items-center gap-2">
                <Store className="size-4 text-muted-foreground" />
                <span className="font-medium">{origin.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Modifier ${origin.name}`}
                  onClick={() => handleEditClick(origin)}
                  disabled={isUpsertPending || isDeletePending}
                >
                  <Pencil className="size-4" />
                </Button>
                {origin.isPhysical && (
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Supprimer ${origin.name}`}
                    onClick={() => handleDeleteClick(origin)}
                    disabled={isUpsertPending || isDeletePending}
                  >
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                )}
              </div>
            </div>
          ))}
      </CardContent>

      <UpsertOrderOriginDialog
        open={isFormOpen}
        editionId={edition.id}
        editingOrigin={editingOrigin}
        isPending={isUpsertPending}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseFormDialog();
            return;
          }
          setIsFormOpen(true);
        }}
        onSubmit={onSubmit}
      />

      <DeleteOrderOriginDialog
        open={isDeleteOpen}
        origin={deletingOrigin}
        isPending={isDeletePending}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseDeleteDialog();
            return;
          }
          setIsDeleteOpen(true);
        }}
        onConfirm={onDelete}
      />
    </Card>
  );
};
