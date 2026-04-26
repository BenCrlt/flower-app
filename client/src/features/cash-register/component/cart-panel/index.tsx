import { useState } from "react";
import { toast } from "sonner";
import { useCashRegister } from "../../hooks/useCashRegister";
import { CancelOrderDialog } from "./cancel-order-dialog";
import { CartPanelDesktop } from "./cart-panel-desktop";
import { CartPanelMobile } from "./cart-panel-mobile";
import { PaymentMethodDialog } from "./payment-method-dialog";

export const CartPanel = () => {
  const { allCartProducts, onValidateOrder, onCancelOrder } = useCashRegister();
  const [openPaymentMethodDialog, setOpenPaymentMethodDialog] = useState(false);
  const [openCancelOrderDialog, setOpenCancelOrderDialog] = useState(false);

  const cartItems = allCartProducts.filter((product) => product.quantity > 0);
  const totalQuantity = cartItems.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (acc, product) => acc + product.quantity * product.unitPrice,
    0,
  );

  const handleCancelOrder = () => {
    setOpenCancelOrderDialog(false);
    onCancelOrder();
    toast.success("Commande annulée avec succès");
  };

  return (
    <>
      <CartPanelDesktop
        cartItems={cartItems}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
        onProceedToPayment={() => setOpenPaymentMethodDialog(true)}
        onCancelOrder={() => setOpenCancelOrderDialog(true)}
      />
      <CartPanelMobile
        cartItems={cartItems}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
        onProceedToPayment={() => setOpenPaymentMethodDialog(true)}
        onCancelOrder={() => setOpenCancelOrderDialog(true)}
      />
      <PaymentMethodDialog
        open={openPaymentMethodDialog}
        onOpenChange={setOpenPaymentMethodDialog}
        onSelectMethod={onValidateOrder}
      />
      <CancelOrderDialog
        open={openCancelOrderDialog}
        onOpenChange={setOpenCancelOrderDialog}
        onCancelOrder={handleCancelOrder}
      />
    </>
  );
};
