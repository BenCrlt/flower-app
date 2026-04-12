import { weave } from "@gqloom/core";
import { ZodWeaver } from "@gqloom/zod";
import {
  budgetCategoriesResolver,
  budgetLinesResolver,
} from "./modules/budget/resolver.js";
import { editionsResolver } from "./modules/editions/resolver.js";
import { helloAssoResolver } from "./modules/helloasso/resolvers/index.js";
import { invoiceResolver, vendorResolver } from "./modules/payment/resolver.js";

export const schema = weave(
  ZodWeaver,
  editionsResolver,
  budgetCategoriesResolver,
  budgetLinesResolver,
  vendorResolver,
  invoiceResolver,
  helloAssoResolver,
);
