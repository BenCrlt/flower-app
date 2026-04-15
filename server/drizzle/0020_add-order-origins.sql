CREATE TABLE "order_origins" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "order_origins_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "originId" integer NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "order_origins_name_unique" ON "order_origins" USING btree ("name");--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_originId_order_origins_id_fk" FOREIGN KEY ("originId") REFERENCES "public"."order_origins"("id") ON DELETE no action ON UPDATE no action;