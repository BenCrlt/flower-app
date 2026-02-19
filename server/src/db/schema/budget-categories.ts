import { drizzleSilk } from "@gqloom/drizzle";
import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const budgetCategoriesTable = drizzleSilk(
  pgTable("budget_categories", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
  }),
);

export type BudgetCategory = InferSelectModel<typeof budgetCategoriesTable>;
