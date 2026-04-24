import { TypographyH2 } from "@/components/ui/typography";
import { SelectOrderOriginsDialog } from "./component/select-order-origins-dialog";
import { useCashRegister } from "./hooks/useCashRegister";

export const CashRegister = () => {
  const { orderOrigin, handleSelectOrigin, openSelectOriginDialog } =
    useCashRegister();

  return (
    <div>
      <TypographyH2>
        Caisse - {orderOrigin?.name ?? "Sélectionnez un point de vente"}
      </TypographyH2>
      <SelectOrderOriginsDialog
        open={openSelectOriginDialog}
        onSelectOrigin={handleSelectOrigin}
      />
    </div>
  );
};
