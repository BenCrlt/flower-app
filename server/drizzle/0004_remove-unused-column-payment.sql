ALTER TABLE "payments" DROP CONSTRAINT "payments_authorId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN "note";--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN "executedAt";--> statement-breakpoint
ALTER TABLE "payments" DROP COLUMN "authorId";