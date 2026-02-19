import { drizzleSilk } from "@gqloom/drizzle";
import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { budgetLinesTable } from "./budget-lines.js";

export const budgetCategoriesTable = drizzleSilk(
  pgTable("budget_categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
  }),
);

export const budgetCategoriesRelations = relations(
  budgetCategoriesTable,
  ({ many }) => ({
    budgetLines: many(budgetLinesTable),
  }),
);
