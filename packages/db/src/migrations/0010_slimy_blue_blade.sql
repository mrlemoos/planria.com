CREATE TABLE IF NOT EXISTS "planria_project_access_tokens" (
	"ppat_access_token_id" text PRIMARY KEY NOT NULL,
	"ppat_project_id" text NOT NULL,
	"ppat_token" text NOT NULL,
	"ppat_created_at" timestamp DEFAULT now() NOT NULL,
	"ppat_updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "planria_project_access_tokens" ADD CONSTRAINT "planria_project_access_tokens_ppat_project_id_planria_projects_pp_project_id_fk" FOREIGN KEY ("ppat_project_id") REFERENCES "public"."planria_projects"("pp_project_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
