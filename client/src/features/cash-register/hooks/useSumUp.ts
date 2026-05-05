import { openPaymentSwitchLink } from "@/lib/payment-switch";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export const PENDING_CARD_PAYMENT_KEY = "cash-register-pending-card-payment";

interface UseSumUpParams {
  onValidateCardPayment: () => void;
}

export const useSumUp = ({ onValidateCardPayment }: UseSumUpParams) => {
  const hasHandledPaymentCallbackRef = useRef(false);

  const startCardPayment = (amount: number) => {
    try {
      const foreignTxId = `cash-register-${Date.now()}`;
      localStorage.setItem(
        PENDING_CARD_PAYMENT_KEY,
        JSON.stringify({ foreignTxId }),
      );
      openPaymentSwitchLink({
        amount,
        foreignTxId,
      });
      return true;
    } catch (error) {
      toast.error("Impossible de lancer SumUp", {
        description:
          error instanceof Error ? error.message : "Une erreur est survenue.",
      });
      return false;
    }
  };

  useEffect(() => {
    if (hasHandledPaymentCallbackRef.current) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("smp-status");
    if (!paymentStatus) {
      return;
    }

    hasHandledPaymentCallbackRef.current = true;

    const txCode = params.get("smp-tx-code");
    const paymentMessage = params.get("smp-message");
    const callbackForeignTxId = params.get("foreign-tx-id");

    const pendingPaymentRaw = localStorage.getItem(PENDING_CARD_PAYMENT_KEY);
    let pendingForeignTxId: string | null = null;
    if (pendingPaymentRaw) {
      try {
        const pendingPayment = JSON.parse(pendingPaymentRaw) as {
          foreignTxId?: string;
        };
        pendingForeignTxId = pendingPayment.foreignTxId ?? null;
      } catch {
        pendingForeignTxId = null;
      }
    }

    localStorage.removeItem(PENDING_CARD_PAYMENT_KEY);

    const url = new URL(window.location.href);
    [
      "smp-status",
      "smp-tx-code",
      "smp-message",
      "smp-receipt-sent",
      "foreign-tx-id",
    ].forEach((key) => url.searchParams.delete(key));
    window.history.replaceState(
      {},
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );

    if (
      callbackForeignTxId &&
      pendingForeignTxId &&
      callbackForeignTxId !== pendingForeignTxId
    ) {
      toast.error("Paiement recu mais transaction inattendue", {
        description:
          "Le foreign-tx-id du callback ne correspond pas au paiement en cours.",
      });
      return;
    }

    if (paymentStatus === "success") {
      onValidateCardPayment();
      toast.success("Paiement carte confirme", {
        description: txCode ? `Transaction SumUp: ${txCode}` : undefined,
      });
      return;
    }

    toast.error("Paiement carte non valide", {
      description: paymentMessage ?? `Statut SumUp: ${paymentStatus}`,
    });
  }, [onValidateCardPayment]);

  return {
    startCardPayment,
  };
};
