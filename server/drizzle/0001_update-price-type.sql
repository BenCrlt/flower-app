ALTER TABLE "payments" RENAME COLUMN "amount" TO "unitPrice";--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "unitPrice" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "unitPrice" SET DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE "budget_lines" ALTER COLUMN "estimatedUnitPrice" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "budget_lines" ALTER COLUMN "estimatedUnitPrice" SET DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "unitPrice" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "unitPrice" SET DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE "receipts" ALTER COLUMN "totalAmount" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "receipts" ALTER COLUMN "totalAmount" SET DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "quantity" smallint DEFAULT 1 NOT NULL;
