--> statement-breakpoint
ALTER TABLE "editions" 
ALTER COLUMN "startDate" TYPE timestamptz 
USING "startDate"::date AT TIME ZONE 'Europe/Paris';

ALTER TABLE "editions" ADD COLUMN "endDate" timestamp with time zone--> statement-breakpoint
UPDATE "editions"
SET "endDate" = "startDate"
WHERE "endDate" IS NULL;
--> statement-breakpoint
ALTER TABLE "editions" ALTER COLUMN "endDate" SET NOT NULL;
--> statement-breakpoint