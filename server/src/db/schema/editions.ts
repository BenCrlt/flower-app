import { drizzleSilk } from "@gqloom/drizzle";
import { InferSelectModel, sql } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgTable,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const editionsTable = drizzleSilk(
  pgTable(
    "editions",
    {
      id: integer().primaryKey().generatedAlwaysAsIdentity(),
      name: varchar({ length: 255 }).notNull(),
      startDate: date().notNull(),
      active: boolean().notNull(),
    },
    (table) => [
      uniqueIndex("editions_active_unique")
        .on(table.active)
        .where(sql`${table.active} IS TRUE`),
    ],
  ),
);

export type Edition = InferSelectModel<typeof editionsTable>;
