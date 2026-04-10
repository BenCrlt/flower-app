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
