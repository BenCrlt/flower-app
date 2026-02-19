import { drizzleSilk } from "@gqloom/drizzle";
import {
  integer,
  pgEnum,
  pgTable,
  smallint,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { budgetCategoriesTable } from "./budget-categories.js";
import { editionsTable } from "./editions.js";

export const lineType = pgEnum("lineType", ["income", "expense"]);
export type LineType = (typeof lineType.enumValues)[number];

export const budgetLinesTable = drizzleSilk(
  pgTable("budget_lines", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    lineType: lineType().notNull(),
    editionId: integer()
      .notNull()
      .references(() => editionsTable.id),
    budgetCategoryId: integer()
      .notNull()
      .references(() => budgetCategoriesTable.id),
    estimatedQuantity: smallint().default(1).notNull(),
    estimatedUnitPrice: smallint().default(0).notNull(),
  }),
);
