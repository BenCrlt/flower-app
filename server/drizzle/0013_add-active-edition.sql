ALTER TABLE "editions" ADD COLUMN "active" boolean;--> statement-breakpoint
UPDATE "editions" SET "active" = FALSE;
ALTER TABLE "editions" ALTER COLUMN "active" SET NOT NULL;
CREATE UNIQUE INDEX "editions_active_unique" ON "editions" USING btree ("active") WHERE "editions"."active" IS TRUE;