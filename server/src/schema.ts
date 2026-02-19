import { weave } from "@gqloom/core";
import { ZodWeaver } from "@gqloom/zod";
import {
  budgetCategoriesResolver,
  budgetLinesResolver,
} from "./modules/budget/resolver";
import { editionsResolver } from "./modules/editions/resolver";

export const schema = weave(
  ZodWeaver,
  editionsResolver,
  budgetCategoriesResolver,
  budgetLinesResolver,
);
console.log("Schema created", schema);
