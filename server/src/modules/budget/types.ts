import z from "zod";
import { lineTypeEnum } from "../../db/schema/budget-lines";

export const lineTypeSchema = z.enum(lineTypeEnum.enumValues);
