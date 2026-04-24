import z from "zod";
import { OrderOrigin } from "../db/schema/index.js";
import { HELLO_ASSO_ORIGIN_NAME } from "./helloasso/utils/utils.js";
import { paginatedSchema } from "./type.js";

export const getOffsetFromPagination = (
  paginatedInput: z.infer<typeof paginatedSchema>,
) => {
  return (paginatedInput.page - 1) * paginatedInput.limit;
};

export const isOrderOriginDeletable = (
  orderOrigin: Pick<OrderOrigin, "name">,
) => {
  return orderOrigin.name !== HELLO_ASSO_ORIGIN_NAME;
};
