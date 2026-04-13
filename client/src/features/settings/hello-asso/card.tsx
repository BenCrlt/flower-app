import { Badge } from "@/components/ui/badge";
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
import { addDays, formatDate, subYears } from "date-fns";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { useGetHelloAssoConfigQuery } from "../hooks/useGetHelloAssoConfigQuery";
import { useSynchroSalesMutation } from "../hooks/useSynchroSalesMutation";
import { CreateConfigDialog } from "./create-config-dialog";

export const HelloAssoCard = () => {
  const { edition } = useEdition();
  const { data: helloAssoConfig } = useGetHelloAssoConfigQuery({
    variables: {
      editionId: edition.id,
    },
  });

  const { mutate: synchroSales, isPending } = useSynchroSalesMutation({
    onSuccess: () => {
      toast.success("Synchronisation réussie");
    },
    onError: (error) => {
      toast.error("Erreur lors de la synchronisation", {
        description: error.message,
      });
    },
  });

  const handleSynchroSales = () => {
    if (!helloAssoConfig?.helloAssoConfig) {
      toast.error("Configuration non trouvée");
      return;
    }
    void synchroSales({
      helloAssoConfigId: helloAssoConfig.helloAssoConfig.id,
      from: formatDate(subYears(new Date(), 1), "yyyy-MM-dd"),
      to: formatDate(addDays(new Date(), 1), "yyyy-MM-dd"),
    });
  };

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>
          <TypographyH3>Hello Asso</TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyP>
            Connectez votre compte Hello Asso pour synchroniser vos données.
          </TypographyP>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        {helloAssoConfig?.helloAssoConfig ? (
          <div className="flex flex-col gap-4">
            <Badge variant="secondary">
              {helloAssoConfig.helloAssoConfig.formSlug}
            </Badge>
            <div className="flex flex-col gap-2 w-fit">
              <Button onClick={handleSynchroSales} disabled={isPending}>
                {isPending ? <Spinner /> : <Check />}
                Relancer la synchronisation
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-fit">
            <CreateConfigDialog />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
