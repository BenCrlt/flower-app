import { drizzleSilk } from "@gqloom/drizzle";
import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  smallint,
  timestamp,
} from "drizzle-orm/pg-core";
import { events } from "./events.js";
import { products } from "./products.js";
import { users } from "./users.js";

export const paymentMethod = pgEnum("payment_method", ["cash", "card"]);
export type PaymentMethod = (typeof paymentMethod.enumValues)[number];

export const sales = drizzleSilk(
  pgTable("sales", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    quantity: smallint().notNull().default(0),
    executedAt: timestamp().notNull().defaultNow(),
    productId: integer()
      .notNull()
      .references(() => products.id),
    eventId: integer()
      .notNull()
      .references(() => events.id),
    authorId: integer()
      .notNull()
      .references(() => users.id),
  }),
);

export const salesRelations = relations(sales, ({ one }) => ({
  product: one(products, {
    fields: [sales.productId],
    references: [products.id],
  }),
  event: one(events, {
    fields: [sales.eventId],
    references: [events.id],
  }),
  author: one(users, {
    fields: [sales.authorId],
    references: [users.id],
  }),
}));
