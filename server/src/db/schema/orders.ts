import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth.js";
import { editionsTable } from "./editions.js";

export const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  executedAt: timestamp().notNull().defaultNow(),
  editionId: integer()
    .notNull()
    .references(() => editionsTable.id),
  authorId: text().references(() => user.id),
  payerFirstName: text(),
  payerLastName: text(),
  payerEmail: text(),
  helloAssoOrderId: integer().unique(),
});

export type Order = InferSelectModel<typeof ordersTable>;
