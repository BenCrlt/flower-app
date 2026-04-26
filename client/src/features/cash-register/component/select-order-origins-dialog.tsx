import { Card, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Store } from "lucide-react";
import { useGetOrderOriginsQuery } from "../../sales/hooks/useGetOrderOrigins";
import { useCashRegister } from "../hooks/useCashRegister";

export const SelectOrderOriginsDialog = () => {
  const { handleSelectOrigin, openSelectOriginDialog } = useCashRegister();
  const { data: orderOrigins } = useGetOrderOriginsQuery({
    variables: { onlyPhysical: true },
  });

  return (
    <Dialog open={openSelectOriginDialog}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Sélectionnez un point de vente</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
          {orderOrigins?.orderOrigins.map((origin) => (
            <Card
              key={origin.id}
              className="aspect-square cursor-pointer p-3 transition-colors hover:bg-muted/50"
              onClick={() => handleSelectOrigin(origin.id)}
            >
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <Store className="size-8 text-muted-foreground" />
                <CardTitle className="text-center text-base">
                  {origin.name}
                </CardTitle>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
