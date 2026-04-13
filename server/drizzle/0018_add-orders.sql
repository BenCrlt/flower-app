CREATE TABLE "orders" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "orders_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"executedAt" timestamp DEFAULT now() NOT NULL,
	"editionId" integer NOT NULL,
	"authorId" text,
	"payerFirstName" text,
	"payerLastName" text,
	"payerEmail" text,
	"helloAssoOrderId" integer,
	CONSTRAINT "orders_helloAssoOrderId_unique" UNIQUE("helloAssoOrderId")
);

DELETE FROM "sales"
--> statement-breakpoint
ALTER TABLE "sales" DROP CONSTRAINT "sales_editionId_editions_id_fk";
--> statement-breakpoint
ALTER TABLE "sales" DROP CONSTRAINT "sales_authorId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "sales" ADD COLUMN "orderId" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_editionId_editions_id_fk" FOREIGN KEY ("editionId") REFERENCES "public"."editions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_authorId_user_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales" DROP COLUMN "editionId";--> statement-breakpoint
ALTER TABLE "sales" DROP COLUMN "authorId";