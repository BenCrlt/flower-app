import { asEnumType } from "@gqloom/zod/v3";
import z from "zod";
import { lineTypeEnum } from "../../db/schema/budget-lines.js";

export const LineTypeEnum = z
  .enum(lineTypeEnum.enumValues)
  .superRefine(asEnumType({ name: "LineTypeEnum" }));
