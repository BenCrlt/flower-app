import { useState } from "react";
import { toast } from "sonner";
import { useCashRegister } from "../../hooks/useCashRegister";
import { CancelOrderDialog } from "./cancel-order-dialog";
import { CartPanelDesktop } from "./cart-panel-desktop";
import { CartPanelMobile } from "./cart-panel-mobile";
import { PaymentMethodDialog } from "./payment-method-dialog";

export const CartPanel = () => {
  const { cartLines, onCancelOrder } = useCashRegister();
  const [openPaymentMethodDialog, setOpenPaymentMethodDialog] = useState(false);
  const [openCancelOrderDialog, setOpenCancelOrderDialog] = useState(false);

  const cartItems = cartLines;
  const totalQuantity = cartItems.length;
  const totalPrice = cartItems.reduce(
    (acc, line) => acc + line.quantity * line.unitPrice,
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
        totalPrice={totalPrice}
        onOpenChange={setOpenPaymentMethodDialog}
      />
      <CancelOrderDialog
        open={openCancelOrderDialog}
        onOpenChange={setOpenCancelOrderDialog}
        onCancelOrder={handleCancelOrder}
      />
    </>
  );
};
