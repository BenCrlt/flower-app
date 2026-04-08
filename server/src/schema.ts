import { weave } from "@gqloom/core";
import { ZodWeaver } from "@gqloom/zod";
import {
  budgetCategoriesResolver,
  budgetLinesResolver,
} from "./modules/budget/resolver.js";
import { editionsResolver } from "./modules/editions/resolver.js";
import { invoiceResolver, vendorResolver } from "./modules/payment/resolver.js";
import { productsResolver } from "./modules/sale/resolver.js";

export const schema = weave(
  ZodWeaver,
  editionsResolver,
  budgetCategoriesResolver,
  budgetLinesResolver,
  vendorResolver,
  invoiceResolver,
  productsResolver,
);
