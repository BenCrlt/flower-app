ALTER TABLE "budget_categories" ADD COLUMN "color" varchar(7);
UPDATE "budget_categories" SET "color" = '#960096';
ALTER TABLE "budget_categories" ALTER COLUMN "color" SET NOT NULL;
