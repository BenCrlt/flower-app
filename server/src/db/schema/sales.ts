import { drizzleSilk } from "@gqloom/drizzle";
import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, smallint, timestamp } from "drizzle-orm/pg-core";
import { budgetLinesTable } from "./budget-lines.js";
import { ordersTable } from "./orders.js";

export type Sale = InferSelectModel<typeof salesTable>;

export const salesTable = drizzleSilk(
  pgTable("sales", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    quantity: smallint().notNull().default(0),
    executedAt: timestamp().notNull().defaultNow(),
    budgetLineId: integer()
      .notNull()
      .references(() => budgetLinesTable.id),
    orderId: integer()
      .notNull()
      .references(() => ordersTable.id, { onDelete: "cascade" }),
    helloAssoSaleItemId: integer().unique(),
  }),
);
