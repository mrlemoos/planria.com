CREATE TABLE IF NOT EXISTS "planria_environments" (
	"pe_environment_id" text PRIMARY KEY NOT NULL,
	"pe_name" text NOT NULL,
	"pe_project_id" text NOT NULL,
	"pe_created_at" timestamp DEFAULT now() NOT NULL,
	"pe_updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "planria_feature_flag_mutation_records" ALTER COLUMN "pffmr_created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "planria_feature_flag_mutation_records" ALTER COLUMN "pffmr_created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "planria_feature_flag_mutation_records" ALTER COLUMN "pffmr_updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "planria_feature_flag_mutation_records" ALTER COLUMN "pffmr_updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "planria_feature_flags" ALTER COLUMN "pff_created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "planria_feature_flags" ALTER COLUMN "pff_created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "planria_feature_flags" ALTER COLUMN "pff_updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "planria_project_access_passes" ALTER COLUMN "pap_created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "planria_project_access_passes" ALTER COLUMN "pap_created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "planria_projects" ALTER COLUMN "pp_created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "planria_projects" ALTER COLUMN "pp_created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "planria_projects" ALTER COLUMN "pp_updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "planria_users" ALTER COLUMN "pu_created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "planria_users" ALTER COLUMN "pu_created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "planria_users" ALTER COLUMN "pu_updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "planria_environments" ADD CONSTRAINT "planria_environments_pe_project_id_planria_projects_pp_project_id_fk" FOREIGN KEY ("pe_project_id") REFERENCES "public"."planria_projects"("pp_project_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
