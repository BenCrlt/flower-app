import { TypographyH2 } from "@/components/ui/typography";
import { ProductsList } from "./component/products-list";
import { SelectOrderOriginsDialog } from "./component/select-order-origins-dialog";
import { useCashRegister } from "./hooks/useCashRegister";

export const CashRegister = () => {
  const {
    orderOrigin,
    handleSelectOrigin,
    openSelectOriginDialog,
    onAddProductToCart,
    onRemoveProductToCart,
    cartProducts,
  } = useCashRegister();

  return (
    <div>
      <TypographyH2>
        {orderOrigin?.name ?? "Sélectionnez un point de vente"}
      </TypographyH2>
      <div>
        <ProductsList
          cartProducts={cartProducts}
          onAddProductToCart={onAddProductToCart}
          onRemoveProductToCart={onRemoveProductToCart}
        />
      </div>
      <SelectOrderOriginsDialog
        open={openSelectOriginDialog}
        onSelectOrigin={handleSelectOrigin}
      />
    </div>
  );
};
