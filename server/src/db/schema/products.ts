import { drizzleSilk } from "@gqloom/drizzle";
import { integer, pgTable, smallint, varchar } from "drizzle-orm/pg-core";
import { budgetLinesTable } from "./budget-lines";
import { editionsTable } from "./editions";

export const productsTable = drizzleSilk(
  pgTable("products", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    unitPrice: smallint().notNull().default(0),
    budgetLineId: integer()
      .notNull()
      .references(() => budgetLinesTable.id),
    editionId: integer()
      .notNull()
      .references(() => editionsTable.id),
  }),
);
