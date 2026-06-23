import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Store } from "lucide-react";
import { useCashRegister } from "../hooks/useCashRegister";

export const OrderOriginBar = () => {
  const { orderOrigin, handleSelectOrigin } = useCashRegister();

  return (
    <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-2.5 py-2 text-sm md:gap-4 md:px-3 md:py-3">
      <Store className="size-4 shrink-0 text-muted-foreground" />

      <div className="min-w-0 flex-1 md:hidden">
        <p className="truncate font-medium">
          {orderOrigin?.name ?? "Point de vente"}
        </p>
      </div>

      <div className="hidden min-w-0 flex-1 items-center gap-2 md:flex">
        <span className="shrink-0 font-medium">Point de vente</span>
        {orderOrigin ? (
          <Badge
            variant="outline"
            className="min-w-0 max-w-xs truncate text-sm"
          >
            {orderOrigin.name}
          </Badge>
        ) : null}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="size-9 shrink-0 md:hidden"
        onClick={() => handleSelectOrigin(null)}
        aria-label="Changer de point de vente"
      >
        <RefreshCcw className="size-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="hidden shrink-0 md:inline-flex"
        onClick={() => handleSelectOrigin(null)}
      >
        <RefreshCcw className="size-4" />
        Changer
      </Button>
    </div>
  );
};
