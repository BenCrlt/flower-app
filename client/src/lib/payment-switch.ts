const PAYMENT_SWITCH_URL = "sumupmerchant://pay/1.0";
const PAYMENT_SWITCH_AFFILIATE_KEY = import.meta.env.VITE_SUMUP_AFFILIATE_KEY;
const PAYMENT_SWITCH_APP_ID = import.meta.env.VITE_SUMUP_APP_ID;
const PAYMENT_SWITCH_CALLBACK_URL = import.meta.env.VITE_SUMUP_CALLBACK_URL;
const PAYMENT_SWITCH_CALLBACK_SUCCESS_URL = import.meta.env
  .VITE_SUMUP_CALLBACK_SUCCESS_URL;
const PAYMENT_SWITCH_CALLBACK_FAIL_URL = import.meta.env
  .VITE_SUMUP_CALLBACK_FAIL_URL;

interface OpenPaymentSwitchLinkParams {
  amount: number;
  title?: string;
  foreignTxId: string;
}

const getPlatform = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/android/.test(userAgent)) {
    return "android";
  }
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return "ios";
  }
  return "other";
};

export const openPaymentSwitchLink = ({
  amount,
  title = "Paiement caisse",
  foreignTxId,
}: OpenPaymentSwitchLinkParams) => {
  const platform = getPlatform();
  const url = new URL(PAYMENT_SWITCH_URL);

  if (!PAYMENT_SWITCH_AFFILIATE_KEY) {
    throw new Error("VITE_SUMUP_AFFILIATE_KEY est manquante.");
  }

  url.searchParams.set("affiliate-key", PAYMENT_SWITCH_AFFILIATE_KEY);
  url.searchParams.set("currency", "EUR");
  url.searchParams.set("title", title);
  url.searchParams.set("foreign-tx-id", foreignTxId);

  if (platform === "android") {
    if (!PAYMENT_SWITCH_APP_ID) {
      throw new Error("VITE_SUMUP_APP_ID est manquante pour Android.");
    }
    if (!PAYMENT_SWITCH_CALLBACK_URL) {
      throw new Error("VITE_SUMUP_CALLBACK_URL est manquante pour Android.");
    }
    url.searchParams.set("app-id", PAYMENT_SWITCH_APP_ID);
    url.searchParams.set("callback", PAYMENT_SWITCH_CALLBACK_URL);
    url.searchParams.set("total", amount.toFixed(2));
  }

  if (platform === "ios") {
    const callbackSuccess =
      PAYMENT_SWITCH_CALLBACK_SUCCESS_URL ?? PAYMENT_SWITCH_CALLBACK_URL;
    const callbackFail =
      PAYMENT_SWITCH_CALLBACK_FAIL_URL ?? PAYMENT_SWITCH_CALLBACK_URL;

    if (!callbackSuccess || !callbackFail) {
      throw new Error(
        "VITE_SUMUP_CALLBACK_SUCCESS_URL / VITE_SUMUP_CALLBACK_FAIL_URL (ou VITE_SUMUP_CALLBACK_URL) sont manquantes pour iOS.",
      );
    }

    url.searchParams.set("amount", amount.toFixed(2));
    url.searchParams.set("callbacksuccess", callbackSuccess);
    url.searchParams.set("callbackfail", callbackFail);
  }

  window.location.href = url.toString();
};
