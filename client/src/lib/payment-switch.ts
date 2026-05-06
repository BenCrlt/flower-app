import { SumUpConfig } from "@/generated/graphql";

const PAYMENT_SWITCH_URL = "sumupmerchant://pay/1.0";

interface OpenPaymentSwitchLinkParams {
  amount: number;
  title?: string;
  foreignTxId: string;
  config: Omit<SumUpConfig, "__typename"> | null;
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
  config,
}: OpenPaymentSwitchLinkParams) => {
  const platform = getPlatform();
  const url = new URL(PAYMENT_SWITCH_URL);

  if (!config) {
    throw new Error("Config SumUp est manquante.");
  }

  if (!config.affiliateKey) {
    throw new Error("Affiliate key est manquante.");
  }

  url.searchParams.set("affiliate-key", config.affiliateKey);
  url.searchParams.set("currency", "EUR");
  url.searchParams.set("title", title);
  url.searchParams.set("foreign-tx-id", foreignTxId);

  if (platform === "android") {
    if (!config.appId) {
      throw new Error("App ID est manquante pour Android.");
    }
    if (!config.callbackUrl) {
      throw new Error("Callback URL est manquante pour Android.");
    }
    url.searchParams.set("app-id", config.appId);
    url.searchParams.set("callback", config.callbackUrl);
    url.searchParams.set("total", amount.toFixed(2));
  }

  if (platform === "ios") {
    const callbackSuccess = config.callbackUrl ?? "";
    const callbackFail = config.callbackUrl ?? "";

    if (!callbackSuccess || !callbackFail) {
      throw new Error(
        "Callback success et callback fail sont manquants pour iOS.",
      );
    }

    url.searchParams.set("amount", amount.toFixed(2));
    url.searchParams.set("callbacksuccess", callbackSuccess);
    url.searchParams.set("callbackfail", callbackFail);
  }

  window.location.href = url.toString();
};
