ALTER TABLE "sales" ADD COLUMN "helloAssoId" integer;--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_helloAssoId_unique" UNIQUE("helloAssoId");