CREATE TABLE "hello_asso_config" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "hello_asso_config_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"formSlug" varchar(255) NOT NULL,
	"editionId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hello_asso_mapping" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "hello_asso_mapping_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"configId" integer NOT NULL,
	"helloAssoProductId" integer NOT NULL,
	"productId" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hello_asso_config" ADD CONSTRAINT "hello_asso_config_editionId_editions_id_fk" FOREIGN KEY ("editionId") REFERENCES "public"."editions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hello_asso_mapping" ADD CONSTRAINT "hello_asso_mapping_configId_hello_asso_config_id_fk" FOREIGN KEY ("configId") REFERENCES "public"."hello_asso_config"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hello_asso_mapping" ADD CONSTRAINT "hello_asso_mapping_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "hello_asso_config_edition_id_unique" ON "hello_asso_config" USING btree ("editionId");--> statement-breakpoint
CREATE UNIQUE INDEX "hello_asso_mapping_product_hello_asso_product_unique" ON "hello_asso_mapping" USING btree ("productId","helloAssoProductId");