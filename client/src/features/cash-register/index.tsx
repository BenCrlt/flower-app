import { TypographyH2 } from "@/components/ui/typography";
import { CartPanel } from "./component/cart-panel";
import { ProductsList } from "./component/products-list";
import { SelectOrderOriginsDialog } from "./component/select-order-origins-dialog";
import { useCashRegister } from "./hooks/useCashRegister";

export const CashRegister = () => {
  const { orderOrigin } = useCashRegister();

  return (
    <>
      <div className="flex h-full flex-col gap-6 pb-24 lg:pb-0">
        <TypographyH2>
          Point de vente :{" "}
          {orderOrigin?.name ?? "Sélectionnez un point de vente"}
        </TypographyH2>
        <div className="grid h-full min-h-0 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <ProductsList />
          <CartPanel />
        </div>
      </div>
      <SelectOrderOriginsDialog />
    </>
  );
};
