import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { useEdition } from "@/features/edition/EditionContext";
import { authClient } from "@/lib/auth-client";
import { getGoogleDriveOAuthStartUrl } from "@/lib/invoice-file-api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDisconnectGoogleDriveMutation } from "../../hooks/useDisconnectGoogleDriveMutation";
import { useGetGoogleDriveConfigQuery } from "../../hooks/useGetGoogleDriveConfigQuery";
import { useUpdateGoogleDriveConfigMutation } from "../../hooks/useUpdateGoogleDriveConfigMutation";

export function GoogleDriveCard() {
  const { edition } = useEdition();
  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.role === "admin";

  const { data, isLoading, refetch } = useGetGoogleDriveConfigQuery({
    variables: { editionId: edition.id },
  });

  const config = data?.googleDriveConfig;
  const [folderId, setFolderId] = useState("");

  useEffect(() => {
    setFolderId(config?.invoiceFolderId ?? "");
  }, [config?.invoiceFolderId]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const driveStatus = params.get("drive");
    if (!driveStatus) {
      return;
    }
    if (driveStatus === "connected") {
      toast.success("Google Drive connecté");
      void refetch();
    } else if (driveStatus === "error") {
      toast.error("Échec de la connexion Google Drive", {
        description: params.get("message") ?? undefined,
      });
    }
    params.delete("drive");
    params.delete("message");
    const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}`;
    window.history.replaceState({}, "", next);
  }, [refetch]);

  const { mutate: updateConfig, isPending: isUpdating } =
    useUpdateGoogleDriveConfigMutation();
  const { mutate: disconnect, isPending: isDisconnecting } =
    useDisconnectGoogleDriveMutation();

  const handleConnect = () => {
    window.location.href = getGoogleDriveOAuthStartUrl(edition.id);
  };

  const handleSaveFolder = () => {
    if (!folderId.trim()) {
      toast.error("L'ID du dossier est requis");
      return;
    }
    updateConfig(
      { editionId: edition.id, invoiceFolderId: folderId.trim() },
      {
        onSuccess: () => toast.success("Dossier Facture / Devis enregistré"),
        onError: (error) =>
          toast.error("Erreur", { description: error.message }),
      },
    );
  };

  const handleDisconnect = () => {
    disconnect(
      { editionId: edition.id },
      {
        onSuccess: () => {
          setFolderId("");
          toast.success("Google Drive déconnecté");
        },
        onError: (error) =>
          toast.error("Erreur", { description: error.message }),
      },
    );
  };

  const isConfigured =
    config?.isConnected && Boolean(config.invoiceFolderId?.trim());

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>
          <TypographyH3>Google Drive</TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyP>
            Connectez Google Drive pour joindre des factures et devis aux
            factures de l&apos;édition.
          </TypographyP>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {config?.isConnected ? (
              <TypographyP className="text-muted-foreground text-sm">
                Connecté en tant que {config.googleAccountEmail ?? "—"}
              </TypographyP>
            ) : (
              <TypographyP className="text-muted-foreground text-sm">
                Non connecté pour cette édition.
              </TypographyP>
            )}

            {isAdmin && !config?.isConnected && (
              <Button type="button" className="w-fit" onClick={handleConnect}>
                Connecter Google Drive
              </Button>
            )}

            {isAdmin && config?.isConnected && (
              <>
                <Field>
                  <FieldLabel htmlFor="invoiceFolderId">
                    ID du dossier contenant les factures et devis
                  </FieldLabel>
                  <Input
                    id="invoiceFolderId"
                    value={folderId}
                    onChange={(e) => setFolderId(e.target.value)}
                    placeholder="Collez l'ID depuis l'URL Google Drive"
                  />
                </Field>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    onClick={handleSaveFolder}
                    disabled={isUpdating}
                  >
                    {isUpdating ? <Spinner /> : "Enregistrer le dossier"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleDisconnect}
                    disabled={isDisconnecting}
                  >
                    Déconnecter
                  </Button>
                </div>
              </>
            )}

            {!isAdmin && config?.isConnected && (
              <TypographyP className="text-muted-foreground text-sm">
                Dossier configuré :{" "}
                {isConfigured ? "oui" : "en attente (admin)"}
              </TypographyP>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
