ALTER TABLE "sales" RENAME COLUMN "productId" TO "budgetLineId";--> statement-breakpoint
ALTER TABLE "sales" RENAME COLUMN "helloAssoId" TO "helloAssoSaleItemId";--> statement-breakpoint
ALTER TABLE "sales" DROP CONSTRAINT "sales_helloAssoId_unique";--> statement-breakpoint
ALTER TABLE "sales" DROP CONSTRAINT "sales_productId_products_id_fk";
--> statement-breakpoint
ALTER TABLE "budget_lines" ADD COLUMN "helloAssoProductId" integer;--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_budgetLineId_budget_lines_id_fk" FOREIGN KEY ("budgetLineId") REFERENCES "public"."budget_lines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget_lines" ADD CONSTRAINT "budget_lines_helloAssoProductId_unique" UNIQUE("helloAssoProductId");--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_helloAssoSaleItemId_unique" UNIQUE("helloAssoSaleItemId");--> statement-breakpoint
DROP TYPE "public"."payment_method";