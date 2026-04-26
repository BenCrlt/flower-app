ALTER TABLE "orders" ADD COLUMN "paymentMethod" varchar(4);

UPDATE "orders" SET "paymentMethod" = 'card';

ALTER TABLE "orders" ALTER COLUMN "paymentMethod" SET NOT NULL;