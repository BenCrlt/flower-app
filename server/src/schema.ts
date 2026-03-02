import { weave } from "@gqloom/core";
import { ZodWeaver } from "@gqloom/zod";
import {
  budgetCategoriesResolver,
  budgetLinesResolver,
} from "./modules/budget/resolver";
import { editionsResolver } from "./modules/editions/resolver";
import { invoiceResolver, vendorResolver } from "./modules/payment/resolver";

export const schema = weave(
  ZodWeaver,
  editionsResolver,
  budgetCategoriesResolver,
  budgetLinesResolver,
  vendorResolver,
  invoiceResolver,
);
