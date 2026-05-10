import { drizzleSilk } from "@gqloom/drizzle";
import { InferSelectModel, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const editionsTable = drizzleSilk(
  pgTable(
    "editions",
    {
      id: integer().primaryKey().generatedAlwaysAsIdentity(),
      name: varchar({ length: 255 }).notNull(),
      startDate: timestamp({ withTimezone: true }).notNull(),
      endDate: timestamp({ withTimezone: true }).notNull(),
      active: boolean().notNull(),
      openingBalance: integer().notNull().default(0),
    },
    (table) => [
      uniqueIndex("editions_active_unique")
        .on(table.active)
        .where(sql`${table.active} IS TRUE`),
    ],
  ),
);

export type Edition = InferSelectModel<typeof editionsTable>;
