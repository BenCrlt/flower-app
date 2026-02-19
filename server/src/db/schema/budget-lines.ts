import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  smallint,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { budgetCategoriesTable } from "./budget-categories.js";
import { eventsTable } from "./events.js";
import { paymentsTable } from "./payments.js";
import { productsTable } from "./products.js";

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

export const budgetLinesRelations = relations(
  budgetLinesTable,
  ({ one, many }) => ({
    budgetCategory: one(budgetCategoriesTable, {
      fields: [budgetLinesTable.budgetCategoryId],
      references: [budgetCategoriesTable.id],
    }),
    event: one(eventsTable, {
      fields: [budgetLinesTable.eventId],
      references: [eventsTable.id],
    }),
    products: many(productsTable),
    payments: many(paymentsTable),
  }),
);
