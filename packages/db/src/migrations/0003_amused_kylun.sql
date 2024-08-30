DO $$ BEGIN
 ALTER TABLE "planria_projects" ADD CONSTRAINT "planria_projects_pp_owner_id_planria_users_pu_user_id_fk" FOREIGN KEY ("pp_owner_id") REFERENCES "public"."planria_users"("pu_user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "planria_projects" DROP COLUMN IF EXISTS "pp_members";