import { drizzleSilk } from "@gqloom/drizzle";
import { InferSelectModel } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export type OrderOrigin = InferSelectModel<typeof orderOriginsTable>;

export const orderOriginsTable = drizzleSilk(
  pgTable(
    "order_origins",
    {
      id: integer().primaryKey().generatedAlwaysAsIdentity(),
      name: text().notNull(),
      isPhysical: boolean().notNull().default(false),
    },
    (table) => [uniqueIndex("order_origins_name_unique").on(table.name)],
  ),
);
