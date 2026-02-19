import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  smallint,
  timestamp,
} from "drizzle-orm/pg-core";
import { eventsTable } from "./events.js";
import { productsTable } from "./products.js";
import { usersTable } from "./users.js";

export const paymentMethod = pgEnum("payment_method", ["cash", "card"]);
export type PaymentMethod = (typeof paymentMethod.enumValues)[number];

export const salesTable = pgTable("sales", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  quantity: smallint().notNull().default(0),
  executedAt: timestamp().notNull().defaultNow(),
  productId: integer()
    .notNull()
    .references(() => productsTable.id),
  eventId: integer()
    .notNull()
    .references(() => eventsTable.id),
  authorId: integer()
    .notNull()
    .references(() => usersTable.id),
});

export const salesRelations = relations(salesTable, ({ one }) => ({
  product: one(productsTable, {
    fields: [salesTable.productId],
    references: [productsTable.id],
  }),
  event: one(eventsTable, {
    fields: [salesTable.eventId],
    references: [eventsTable.id],
  }),
  author: one(usersTable, {
    fields: [salesTable.authorId],
    references: [usersTable.id],
  }),
}));
