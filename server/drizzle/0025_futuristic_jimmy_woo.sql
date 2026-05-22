ALTER TABLE "budget_lines" ADD COLUMN "isFreePrice" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "sales" ADD COLUMN "unitPrice" numeric(10, 2);