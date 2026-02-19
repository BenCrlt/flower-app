import {
  integer,
  pgEnum,
  pgTable,
  smallint,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { budgetCategoriesTable } from "./budget-categories";
import { eventsTable } from "./events";

export const lineType = pgEnum("lineType", ["income", "expense"]);
export type LineType = (typeof lineType.enumValues)[number];

export const budgetLinesTable = pgTable("budget_lines", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  lineType: lineType().notNull(),
  eventId: integer()
    .notNull()
    .references(() => eventsTable.id),
  budgetCategoryId: integer()
    .notNull()
    .references(() => budgetCategoriesTable.id),
  estimatedQuantity: smallint().default(1).notNull(),
  estimatedUnitPrice: smallint().default(0).notNull(),
});
