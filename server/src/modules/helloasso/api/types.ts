import z from "zod";

export const getTokenResponse = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
});

export const helloAssoItemSchema = z
  .object({
    id: z.number(),
    tierId: z.number(),
    tierDescription: z.string(),
    name: z.string(),
    amount: z.number(),
    ticketUrl: z.string(),
    qrCode: z.string(),
    priceCategory: z.string(),
    state: z.string(),
    initialAmount: z.number(),
    type: z.string(),
  })
  .passthrough();

const paginationSchema = z.object({
  pageSize: z.number(),
  totalCount: z.number(),
  pageIndex: z.number(),
  totalPages: z.number(),
  continuationToken: z.string().nullable().optional(),
});

export const getFormItemsResponse = z.object({
  data: z.array(helloAssoItemSchema),
  pagination: paginationSchema,
});

export const tierSchema = z
  .object({
    id: z.number(),
    label: z.string().nullable(),
    description: z.string().nullable(),
    tierType: z.string(),
    price: z.number().nullable(),
  })
  .passthrough();

export const getFormInfoResponse = z
  .object({
    id: z.number(),
    organizationLogo: z.string().nullable(),
    organizationName: z.string().nullable(),
    tiers: z.array(tierSchema).nullable(),
    formSlug: z.string().nullable(),
    formType: z.string().nullable(),
    url: z.string().nullable(),
    organizationSlug: z.string().nullable(),
    title: z.string().nullable(),
    state: z.string(),
  })
  .passthrough();
