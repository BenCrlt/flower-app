import { drizzleSilk } from "@gqloom/drizzle";
import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  smallint,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { budgetCategories } from "./budget-categories.js";
import { events } from "./events.js";
import { payments } from "./payments.js";
import { products } from "./products.js";

export const lineType = pgEnum("lineType", ["income", "expense"]);
export type LineType = (typeof lineType.enumValues)[number];

export const budgetLines = drizzleSilk(
  pgTable("budget_lines", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    lineType: lineType().notNull(),
    eventId: integer()
      .notNull()
      .references(() => events.id),
    budgetCategoryId: integer()
      .notNull()
      .references(() => budgetCategories.id),
    estimatedQuantity: smallint().default(1).notNull(),
    estimatedUnitPrice: smallint().default(0).notNull(),
  }),
);

export const budgetLinesRelations = relations(budgetLines, ({ one, many }) => ({
  budgetCategory: one(budgetCategories, {
    fields: [budgetLines.budgetCategoryId],
    references: [budgetCategories.id],
  }),
  event: one(events, {
    fields: [budgetLines.eventId],
    references: [events.id],
  }),
  products: many(products),
  payments: many(payments),
}));
