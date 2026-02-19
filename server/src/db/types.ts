import { type ZodTypeAny, z } from "zod";

export const paginatedInput = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export const paginatedOutput = (itemSchema: ZodTypeAny) =>
  z.object({
    data: z.array(itemSchema),
    total: z.number(),
  });
