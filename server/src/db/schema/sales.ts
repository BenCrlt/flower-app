import { drizzleSilk } from "@gqloom/drizzle";
import { InferSelectModel } from "drizzle-orm";
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

export type Sale = InferSelectModel<typeof salesTable>;

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
    authorId: text().references(() => user.id),
    helloAssoSaleItemId: integer().unique(),
  }),
);
