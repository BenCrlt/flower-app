import { drizzleSilk } from "@gqloom/drizzle";
import { integer, numeric, pgTable, varchar } from "drizzle-orm/pg-core";
import { budgetLinesTable } from "./budget-lines";
import { editionsTable } from "./editions";

export const productsTable = drizzleSilk(
  pgTable("products", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    unitPrice: numeric("unitPrice", {
      precision: 10,
      scale: 2,
    })
      .default("0.00")
      .notNull(),
    budgetLineId: integer()
      .notNull()
      .references(() => budgetLinesTable.id),
    editionId: integer()
      .notNull()
      .references(() => editionsTable.id),
  }),
);
