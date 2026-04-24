import z from "zod";
import { paginatedSchema } from "./type.js";

export const getOffsetFromPagination = (
  paginatedInput: z.infer<typeof paginatedSchema>,
) => {
  return (paginatedInput.page - 1) * paginatedInput.limit;
};
