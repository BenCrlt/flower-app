import { TypographyH2 } from "@/components/ui/typography";
import { ProductsList } from "./component/products-list";
import { SelectOrderOriginsDialog } from "./component/select-order-origins-dialog";
import { useCashRegister } from "./hooks/useCashRegister";

export const CashRegister = () => {
  const { orderOrigin } = useCashRegister();

  return (
    <div className="flex flex-col gap-6">
      <TypographyH2>
        Point de vente : {orderOrigin?.name ?? "Sélectionnez un point de vente"}
      </TypographyH2>
      <div>
        <ProductsList />
      </div>
      <SelectOrderOriginsDialog />
    </div>
  );
};
