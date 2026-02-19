import { drizzleSilk } from "@gqloom/drizzle";
import { relations } from "drizzle-orm";
import { date, integer, pgTable, smallint, text } from "drizzle-orm/pg-core";
import { events } from "./events.js";
import { payments } from "./payments.js";
import { users } from "./users.js";
import { vendors } from "./vendors.js";

export const receipts = drizzleSilk(
  pgTable("receipts", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    eventId: integer()
      .notNull()
      .references(() => events.id),
    vendorId: integer()
      .notNull()
      .references(() => vendors.id),
    totalAmount: smallint().notNull().default(0),
    note: text(),
    executedAt: date().notNull().defaultNow(),
    authorId: integer()
      .notNull()
      .references(() => users.id),
  }),
);

export const receiptsRelations = relations(receipts, ({ one, many }) => ({
  event: one(events, {
    fields: [receipts.eventId],
    references: [events.id],
  }),
  vendor: one(vendors, {
    fields: [receipts.vendorId],
    references: [vendors.id],
  }),
  author: one(users, {
    fields: [receipts.authorId],
    references: [users.id],
  }),
  payments: many(payments),
}));
