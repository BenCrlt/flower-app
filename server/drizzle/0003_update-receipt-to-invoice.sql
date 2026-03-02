CREATE TYPE "public"."invoiceStatus" AS ENUM('pending', 'paid', 'cancelled');--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "invoices_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"editionId" integer NOT NULL,
	"vendorId" integer NOT NULL,
	"totalAmount" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"note" text,
	"authorId" integer NOT NULL,
	"executedAt" date,
	"status" "invoiceStatus" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "receipts" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "payments" DROP CONSTRAINT "payments_receiptId_receipts_id_fk";
DROP TABLE "receipts" CASCADE;--> statement-breakpoint
--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "invoiceId" integer;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_editionId_editions_id_fk" FOREIGN KEY ("editionId") REFERENCES "public"."editions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_vendorId_vendors_id_fk" FOREIGN KEY ("vendorId") REFERENCES "public"."vendors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoiceId_invoices_id_fk" FOREIGN KEY ("invoiceId") REFERENCES "public"."invoices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN "receiptId";
