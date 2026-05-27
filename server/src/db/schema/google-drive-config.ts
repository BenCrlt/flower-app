import { drizzleSilk } from "@gqloom/drizzle";
import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { user } from "./auth.js";
import { editionsTable } from "./editions.js";

export const googleDriveConfigTable = drizzleSilk(
  pgTable(
    "google_drive_config",
    {
      id: integer().primaryKey().generatedAlwaysAsIdentity(),
      editionId: integer()
        .notNull()
        .references(() => editionsTable.id, { onDelete: "cascade" }),
      invoiceFolderId: varchar({ length: 255 }),
      refreshTokenEncrypted: text().notNull(),
      googleAccountEmail: varchar({ length: 255 }),
      connectedById: text()
        .notNull()
        .references(() => user.id),
      connectedAt: timestamp().notNull().defaultNow(),
    },
    (table) => [
      uniqueIndex("google_drive_config_edition_id_unique").on(table.editionId),
    ],
  ),
);

export type GoogleDriveConfig = InferSelectModel<typeof googleDriveConfigTable>;
