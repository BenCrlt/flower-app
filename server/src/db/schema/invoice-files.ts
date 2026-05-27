import { drizzleSilk } from "@gqloom/drizzle";
import { InferSelectModel } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./auth.js";
import { invoicesTable } from "./invoices.js";

export const invoiceFilesTable = drizzleSilk(
  pgTable(
    "invoice_files",
    {
      id: integer().primaryKey().generatedAlwaysAsIdentity(),
      invoiceId: integer()
        .notNull()
        .references(() => invoicesTable.id, { onDelete: "cascade" }),
      driveFileId: varchar({ length: 255 }).notNull(),
      fileName: varchar({ length: 512 }).notNull(),
      mimeType: varchar({ length: 255 }).notNull(),
      sizeBytes: integer().notNull(),
      uploadedById: text()
        .notNull()
        .references(() => user.id),
      createdAt: timestamp().notNull().defaultNow(),
    },
    (table) => [index("invoice_files_invoice_id_idx").on(table.invoiceId)],
  ),
);

export type InvoiceFile = InferSelectModel<typeof invoiceFilesTable>;
