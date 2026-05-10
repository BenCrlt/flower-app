CREATE TABLE "order-origin-budget-lines" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "order-origin-budget-lines_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"orderOriginId" integer NOT NULL,
	"budgetLineId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "order-origin-budget-lines" ADD CONSTRAINT "order-origin-budget-lines_orderOriginId_order_origins_id_fk" FOREIGN KEY ("orderOriginId") REFERENCES "public"."order_origins"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order-origin-budget-lines" ADD CONSTRAINT "order-origin-budget-lines_budgetLineId_budget_lines_id_fk" FOREIGN KEY ("budgetLineId") REFERENCES "public"."budget_lines"("id") ON DELETE cascade ON UPDATE no action;