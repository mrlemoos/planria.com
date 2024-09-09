CREATE TABLE IF NOT EXISTS "planria_environment_feature_flags" (
	"peff_environment_feature_flag_id" text PRIMARY KEY NOT NULL,
	"peff_environment_id" text NOT NULL,
	"peff_feature_flag_id" text NOT NULL,
	"peff_value" boolean DEFAULT false,
	"peff_created_at" timestamp DEFAULT now() NOT NULL,
	"peff_updated_at" timestamp NOT NULL,
	CONSTRAINT "planria_environment_feature_flags_peff_environment_feature_flag_id_unique" UNIQUE("peff_environment_feature_flag_id")
);
--> statement-breakpoint
ALTER TABLE "planria_feature_flags" RENAME COLUMN "pff_value" TO "pff_default_value";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "planria_environment_feature_flags" ADD CONSTRAINT "planria_environment_feature_flags_peff_environment_id_planria_environments_pe_environment_id_fk" FOREIGN KEY ("peff_environment_id") REFERENCES "public"."planria_environments"("pe_environment_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "planria_environments" ADD CONSTRAINT "planria_environments_pe_environment_id_unique" UNIQUE("pe_environment_id");--> statement-breakpoint
ALTER TABLE "planria_feature_flags" ADD CONSTRAINT "planria_feature_flags_pff_private_id_unique" UNIQUE("pff_private_id");--> statement-breakpoint
ALTER TABLE "planria_feature_flags" ADD CONSTRAINT "planria_feature_flags_pff_feature_flag_id_unique" UNIQUE("pff_feature_flag_id");--> statement-breakpoint
ALTER TABLE "planria_projects" ADD CONSTRAINT "planria_projects_pp_project_id_unique" UNIQUE("pp_project_id");