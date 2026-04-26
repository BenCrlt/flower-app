import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Store } from "lucide-react";
import { useCashRegister } from "../hooks/useCashRegister";

export const OrderOriginBar = () => {
  const { orderOrigin, handleSelectOrigin } = useCashRegister();
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border bg-muted/30 px-3 py-2 text-sm">
      <div className="flex items-center gap-2">
        <Store className="size-4 text-muted-foreground" />
        <span className="text-muted-foreground">Point de vente</span>
        <Badge variant="outline" className="text-sm">
          {orderOrigin?.name ?? "Sélectionnez un point de vente"}
        </Badge>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleSelectOrigin(null)}
      >
        <RefreshCcw className="size-4" />
        Changer
      </Button>
    </div>
  );
};
