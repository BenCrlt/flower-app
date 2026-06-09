import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Store } from "lucide-react";
import { useCashRegister } from "../hooks/useCashRegister";

export const OrderOriginBar = () => {
  const { orderOrigin, handleSelectOrigin } = useCashRegister();

  return (
    <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 px-3 py-3 text-sm md:flex-row md:items-center md:justify-between md:gap-4">
      <div className="flex min-w-0 items-center gap-2">
        <Store className="size-4 shrink-0 text-muted-foreground" />
        <span className="shrink-0 font-medium">Point de vente</span>
        {orderOrigin ? (
          <Badge
            variant="outline"
            className="min-w-0 max-w-full truncate text-sm md:max-w-xs"
          >
            {orderOrigin.name}
          </Badge>
        ) : null}
      </div>

      <Button
        variant="outline"
        size="sm"
        className="min-h-11 w-full md:min-h-0 md:w-auto md:shrink-0"
        onClick={() => handleSelectOrigin(null)}
      >
        <RefreshCcw className="size-4" />
        Changer
      </Button>
    </div>
  );
};
