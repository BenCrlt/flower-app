import { drizzleSilk } from "@gqloom/drizzle";
import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, uniqueIndex } from "drizzle-orm/pg-core";
import { helloAssoConfigTable } from "./hello-asso-config.js";
import { productsTable } from "./products.js";

export const helloAssoMappingTable = drizzleSilk(
  pgTable(
    "hello_asso_mapping",
    {
      id: integer().primaryKey().generatedAlwaysAsIdentity(),
      configId: integer()
        .notNull()
        .references(() => helloAssoConfigTable.id),
      helloAssoProductId: integer().notNull(),
      productId: integer()
        .notNull()
        .references(() => productsTable.id),
    },
    (table) => [
      uniqueIndex("hello_asso_mapping_product_hello_asso_product_unique").on(
        table.productId,
        table.helloAssoProductId,
      ),
    ],
  ),
);

export type HelloAssoMapping = InferSelectModel<typeof helloAssoMappingTable>;
