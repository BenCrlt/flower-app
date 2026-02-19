import { weave } from "@gqloom/core";
import { ZodWeaver } from "@gqloom/zod";
import { editionsResolver } from "./modules/editions/resolver";

export const schema = weave(ZodWeaver, editionsResolver);
console.log("Schema created", schema);
