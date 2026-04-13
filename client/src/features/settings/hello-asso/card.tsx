import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { useEdition } from "@/features/edition/EditionContext";
import { useGetHelloAssoConfigQuery } from "../hooks/useGetHelloAssoConfigQuery";
import { CreateConfigDialog } from "./create-config-dialog";

export const HelloAssoCard = () => {
  const { edition } = useEdition();
  const { data: helloAssoConfig } = useGetHelloAssoConfigQuery({
    variables: {
      editionId: edition.id,
    },
  });
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
      <CardContent className="flex flex-col gap-4">
        {helloAssoConfig?.helloAssoConfig ? (
          <div className="flex flex-col gap-2 w-fit">
            <TypographyP>
              {helloAssoConfig.helloAssoConfig.formSlug}
            </TypographyP>
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
