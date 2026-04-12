import { drizzleSilk } from "@gqloom/drizzle";
import {
  integer,
  pgTable,
  smallint,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth.js";
import { budgetLinesTable } from "./budget-lines.js";
import { editionsTable } from "./editions.js";

export const salesTable = drizzleSilk(
  pgTable("sales", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    quantity: smallint().notNull().default(0),
    executedAt: timestamp().notNull().defaultNow(),
    budgetLineId: integer()
      .notNull()
      .references(() => budgetLinesTable.id),
    editionId: integer()
      .notNull()
      .references(() => editionsTable.id),
    authorId: text()
      .notNull()
      .references(() => user.id),
    helloAssoSaleItemId: integer().unique(),
  }),
);
