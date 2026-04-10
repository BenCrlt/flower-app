import { drizzleSilk } from "@gqloom/drizzle";
import { integer, pgTable, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { editionsTable } from "./editions.js";
import { InferSelectModel } from "drizzle-orm";

export const helloAssoConfigTable = drizzleSilk(
  pgTable(
    "hello_asso_config",
    {
      id: integer().primaryKey().generatedAlwaysAsIdentity(),
      formSlug: varchar({ length: 255 }).notNull(),
      editionId: integer()
        .notNull()
        .references(() => editionsTable.id),
    },
    (table) => [
      uniqueIndex("hello_asso_config_edition_id_unique").on(table.editionId),
    ],
  ),
);

export type HelloAssoConfig = InferSelectModel<typeof helloAssoConfigTable>;
