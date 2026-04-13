import z from "zod";

export const getTokenResponse = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
});

const helloAssoPayerSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
  })
  .passthrough();

const paginationSchema = z.object({
  pageSize: z.number(),
  totalCount: z.number(),
  pageIndex: z.number(),
  totalPages: z.number(),
  continuationToken: z.string().optional().optional(),
});

const helloAssoItemSchema = z
  .object({
    id: z.number(),
    tierId: z.number().optional(),
    tierDescription: z.string().optional(),
    amount: z.number().optional(),
    state: z.string(),
    initialAmount: z.number().optional(),
  })
  .passthrough();

export const helloAssoOrderSchema = z
  .object({
    id: z.number(),
    date: z.string(),
    formSlug: z.string().optional(),
    formType: z.string(),
    payer: helloAssoPayerSchema,
    items: z.array(helloAssoItemSchema).optional(),
    amount: z
      .object({
        total: z.number(),
      })
      .passthrough(),
  })
  .passthrough();

export const getFormOrdersResponse = z.object({
  data: z.array(helloAssoOrderSchema),
  pagination: paginationSchema,
});

export const tierSchema = z
  .object({
    id: z.number(),
    label: z.string().optional(),
    description: z.string().optional(),
    tierType: z.string(),
    price: z.number().optional(),
  })
  .passthrough();

export const getFormInfoResponse = z
  .object({
    organizationLogo: z.string().optional(),
    organizationName: z.string().optional(),
    tiers: z.array(tierSchema).optional(),
    formSlug: z.string().optional(),
    formType: z.string().optional(),
    url: z.string().optional(),
    organizationSlug: z.string().optional(),
    title: z.string().optional(),
    state: z.string(),
  })
  .passthrough();
