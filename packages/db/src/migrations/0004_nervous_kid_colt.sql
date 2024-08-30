ALTER TABLE "planria_users" ALTER COLUMN "pu_avatar_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "planria_projects" DROP COLUMN IF EXISTS "pp_organisation_id";--> statement-breakpoint
ALTER TABLE "planria_users" DROP COLUMN IF EXISTS "pu_full_name";