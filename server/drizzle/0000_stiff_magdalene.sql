CREATE TYPE "public"."lineType" AS ENUM('income', 'expense');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('cash', 'card');--> statement-breakpoint
CREATE TABLE "budget_categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "budget_categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "budget_lines" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "budget_lines_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" text,
	"lineType" "lineType" NOT NULL,
	"editionId" integer NOT NULL,
	"budgetCategoryId" integer NOT NULL,
	"estimatedQuantity" smallint DEFAULT 1 NOT NULL,
	"estimatedUnitPrice" smallint DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "editions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "editions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"startDate" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "payments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"amount" smallint DEFAULT 0 NOT NULL,
	"note" text,
	"executedAt" date DEFAULT now() NOT NULL,
	"editionId" integer NOT NULL,
	"budgetLineId" integer NOT NULL,
	"receiptId" integer,
	"authorId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"unitPrice" smallint DEFAULT 0 NOT NULL,
	"budgetLineId" integer NOT NULL,
	"editionId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "receipts" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "receipts_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"editionId" integer NOT NULL,
	"vendorId" integer NOT NULL,
	"totalAmount" smallint DEFAULT 0 NOT NULL,
	"note" text,
	"executedAt" date DEFAULT now() NOT NULL,
	"authorId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sales" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sales_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"quantity" smallint DEFAULT 0 NOT NULL,
	"executedAt" timestamp DEFAULT now() NOT NULL,
	"productId" integer NOT NULL,
	"editionId" integer NOT NULL,
	"authorId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "vendors" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "vendors_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phoneNumber" varchar(255),
	"address" varchar(255),
	"description" text
);
--> statement-breakpoint
ALTER TABLE "budget_lines" ADD CONSTRAINT "budget_lines_editionId_editions_id_fk" FOREIGN KEY ("editionId") REFERENCES "public"."editions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "budget_lines" ADD CONSTRAINT "budget_lines_budgetCategoryId_budget_categories_id_fk" FOREIGN KEY ("budgetCategoryId") REFERENCES "public"."budget_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_editionId_editions_id_fk" FOREIGN KEY ("editionId") REFERENCES "public"."editions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_budgetLineId_budget_lines_id_fk" FOREIGN KEY ("budgetLineId") REFERENCES "public"."budget_lines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_receiptId_receipts_id_fk" FOREIGN KEY ("receiptId") REFERENCES "public"."receipts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_budgetLineId_budget_lines_id_fk" FOREIGN KEY ("budgetLineId") REFERENCES "public"."budget_lines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_editionId_editions_id_fk" FOREIGN KEY ("editionId") REFERENCES "public"."editions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_editionId_editions_id_fk" FOREIGN KEY ("editionId") REFERENCES "public"."editions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_vendorId_vendors_id_fk" FOREIGN KEY ("vendorId") REFERENCES "public"."vendors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_editionId_editions_id_fk" FOREIGN KEY ("editionId") REFERENCES "public"."editions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales" ADD CONSTRAINT "sales_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;