import { CartPanel } from "./component/cart-panel";
import { OrderOriginBar } from "./component/order-origin-bar";
import { ProductsList } from "./component/products-list";
import { SelectOrderOriginsDialog } from "./component/select-order-origins-dialog";

export const CashRegister = () => {
  return (
    <>
      <div className="grid h-full min-h-0 gap-6 pb-24 md:grid-cols-[minmax(0,1fr)_22rem] md:items-start md:pb-0">
        <div className="flex flex-col gap-6">
          <OrderOriginBar />
          <ProductsList />
        </div>
        <CartPanel />
      </div>
      <SelectOrderOriginsDialog />
    </>
  );
};
