import { z } from "zod";

export const paginatedInput = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export const paginatedOutput = <T>() =>
  z.object({
    data: z.array(z.custom<T>()),
    total: z.number(),
  });
