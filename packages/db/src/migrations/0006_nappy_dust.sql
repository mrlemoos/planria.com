ALTER TABLE "planria_feature_flags" ADD COLUMN "pff_project_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "planria_feature_flags" ADD CONSTRAINT "planria_feature_flags_pff_project_id_planria_projects_pp_project_id_fk" FOREIGN KEY ("pff_project_id") REFERENCES "public"."planria_projects"("pp_project_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
