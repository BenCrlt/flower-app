import { useState } from "react";
import { PaymentMethodDialog } from "./payment-method-dialog";
import { CartPanelDesktop } from "./cart-panel-desktop";
import { CartPanelMobile } from "./cart-panel-mobile";
import { useCashRegister } from "../../hooks/useCashRegister";

export const CartPanel = () => {
  const { allCartProducts } = useCashRegister();
  const [openPaymentMethodDialog, setOpenPaymentMethodDialog] = useState(false);

  const cartItems = allCartProducts.filter((product) => product.quantity > 0);
  const totalQuantity = cartItems.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (acc, product) => acc + product.quantity * product.unitPrice,
    0,
  );

  return (
    <>
      <CartPanelDesktop
        cartItems={cartItems}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
        onProceedToPayment={() => setOpenPaymentMethodDialog(true)}
      />
      <CartPanelMobile
        cartItems={cartItems}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
        onProceedToPayment={() => setOpenPaymentMethodDialog(true)}
      />
      <PaymentMethodDialog
        open={openPaymentMethodDialog}
        onOpenChange={setOpenPaymentMethodDialog}
      />
    </>
  );
};
