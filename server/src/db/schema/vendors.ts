import { drizzleSilk } from "@gqloom/drizzle";
import { relations } from "drizzle-orm";
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { receipts } from "./receipts.js";

export const vendors = drizzleSilk(
  pgTable("vendors", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }),
    phoneNumber: varchar({ length: 255 }),
    address: varchar({ length: 255 }),
    description: text(),
  }),
);

export const vendorsRelations = relations(vendors, ({ many }) => ({
  receipts: many(receipts),
}));
