ALTER TABLE "invoices" ADD COLUMN "name" varchar(255);
UPDATE "invoices" SET "name" = 'Facture';
ALTER TABLE "invoices" ALTER COLUMN "name" SET NOT NULL;
