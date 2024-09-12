ALTER TABLE "planria_project_access_tokens" ADD COLUMN "ppat_environment_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "planria_project_access_tokens" ADD CONSTRAINT "planria_project_access_tokens_ppat_environment_id_planria_environments_pe_environment_id_fk" FOREIGN KEY ("ppat_environment_id") REFERENCES "public"."planria_environments"("pe_environment_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
