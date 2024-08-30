CREATE TABLE IF NOT EXISTS "planria_feature_flag_mutation_records" (
	"pffmr_mutation_id" serial PRIMARY KEY NOT NULL,
	"pffmr_feature_flag_id" text NOT NULL,
	"pffmr_value" boolean NOT NULL,
	"pffmr_user_id" text NOT NULL,
	"pffmr_created_at" date NOT NULL,
	"pffmr_updated_at" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "planria_project_access_passes" (
	"pap_access_pass_id" text PRIMARY KEY NOT NULL,
	"pap_project_id" text NOT NULL,
	"pap_user_id" text NOT NULL,
	"pap_created_at" date NOT NULL,
	"pap_updated_at" date NOT NULL
);
--> statement-breakpoint
ALTER TABLE "planria_projects" ADD COLUMN "pp_organisation_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "planria_projects" ADD COLUMN "pp_members" text[];--> statement-breakpoint
ALTER TABLE "planria_projects" ADD COLUMN "pp_created_at" date NOT NULL;--> statement-breakpoint
ALTER TABLE "planria_projects" ADD COLUMN "pp_updated_at" date NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "planria_feature_flag_mutation_records" ADD CONSTRAINT "planria_feature_flag_mutation_records_pffmr_user_id_planria_users_pu_user_id_fk" FOREIGN KEY ("pffmr_user_id") REFERENCES "public"."planria_users"("pu_user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "planria_project_access_passes" ADD CONSTRAINT "planria_project_access_passes_pap_project_id_planria_projects_pp_project_id_fk" FOREIGN KEY ("pap_project_id") REFERENCES "public"."planria_projects"("pp_project_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "planria_project_access_passes" ADD CONSTRAINT "planria_project_access_passes_pap_user_id_planria_users_pu_user_id_fk" FOREIGN KEY ("pap_user_id") REFERENCES "public"."planria_users"("pu_user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
