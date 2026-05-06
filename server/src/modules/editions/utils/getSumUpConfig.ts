import z from "zod";

export const SumUpConfig = z.object({
  appId: z.string(),
  affiliateKey: z.string(),
});

export const getSumUpConfig = () => ({
  appId: process.env.SUMUP_APP_ID ?? "",
  affiliateKey: process.env.SUMUP_AFFILIATE_KEY ?? "",
});
