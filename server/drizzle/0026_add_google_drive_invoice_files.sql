CREATE TABLE "google_drive_config" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "google_drive_config_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"editionId" integer NOT NULL,
	"invoiceFolderId" varchar(255),
	"refreshTokenEncrypted" text NOT NULL,
	"googleAccountEmail" varchar(255),
	"connectedById" text NOT NULL,
	"connectedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoice_files" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "invoice_files_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"invoiceId" integer NOT NULL,
	"driveFileId" varchar(255) NOT NULL,
	"fileName" varchar(512) NOT NULL,
	"mimeType" varchar(255) NOT NULL,
	"sizeBytes" integer NOT NULL,
	"uploadedById" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "google_drive_config" ADD CONSTRAINT "google_drive_config_editionId_editions_id_fk" FOREIGN KEY ("editionId") REFERENCES "public"."editions"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "google_drive_config" ADD CONSTRAINT "google_drive_config_connectedById_user_id_fk" FOREIGN KEY ("connectedById") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "invoice_files" ADD CONSTRAINT "invoice_files_invoiceId_invoices_id_fk" FOREIGN KEY ("invoiceId") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "invoice_files" ADD CONSTRAINT "invoice_files_uploadedById_user_id_fk" FOREIGN KEY ("uploadedById") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
CREATE UNIQUE INDEX "google_drive_config_edition_id_unique" ON "google_drive_config" USING btree ("editionId");
--> statement-breakpoint
CREATE INDEX "invoice_files_invoice_id_idx" ON "invoice_files" USING btree ("invoiceId");
