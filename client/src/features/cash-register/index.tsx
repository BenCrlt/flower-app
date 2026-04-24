import { TypographyH2 } from "@/components/ui/typography";
import { SelectOrderOriginsDialog } from "./component/select-order-origins-dialog";
import { useCashRegister } from "./hooks/useCashRegister";

export const CashRegister = () => {
  const { selectedOriginId, handleSelectOrigin, openSelectOriginDialog } =
    useCashRegister();

  return (
    <div>
      <TypographyH2>
        Caisse -{" "}
        {selectedOriginId ? selectedOriginId : "Sélectionnez un point de vente"}
      </TypographyH2>
      <SelectOrderOriginsDialog
        open={openSelectOriginDialog}
        onSelectOrigin={handleSelectOrigin}
      />
    </div>
  );
};
