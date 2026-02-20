import z from "zod";
import { paginatedInputSchema } from "./type";

export const getOffsetFromPagination = (
  paginatedInput: z.infer<typeof paginatedInputSchema>,
) => {
  return (paginatedInput.page - 1) * paginatedInput.limit;
};
