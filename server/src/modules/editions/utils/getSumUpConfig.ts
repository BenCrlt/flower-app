import z from "zod";

export const SumUpConfig = z.object({
  appId: z.string(),
  affiliateKey: z.string(),
  callbackUrl: z.string(),
});

export const getSumUpConfig = () => ({
  appId: process.env.SUMUP_APP_ID ?? "",
  affiliateKey: process.env.SUMUP_AFFILIATE_KEY ?? "",
  callbackUrl: process.env.SUMUP_CALLBACK_URL ?? "",
});
