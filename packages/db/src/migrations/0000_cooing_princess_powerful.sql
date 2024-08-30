CREATE TABLE IF NOT EXISTS "pff_feature_flags" (
	"pff_private_id" serial PRIMARY KEY NOT NULL,
	"pff_feature_flag_id" text NOT NULL,
	"pff_slug" text NOT NULL,
	"pff_description" text,
	"pff_value" boolean NOT NULL,
	"pff_created_at" date NOT NULL,
	"pff_updated_at" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "planria_projects" (
	"pp_project_id" text PRIMARY KEY NOT NULL,
	"pp_name" text NOT NULL,
	"pp_slug" text NOT NULL,
	"pp_description" text,
	"pp_owner_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "planria_users" (
	"pu_private_id" serial PRIMARY KEY NOT NULL,
	"pu_user_id" text NOT NULL,
	"pu_email" text NOT NULL,
	"pu_first_name" text NOT NULL,
	"pu_last_name" text NOT NULL,
	"pu_username" text NOT NULL,
	"pu_full_name" text NOT NULL,
	"pu_avatar_url" text NOT NULL,
	"pu_created_at" date NOT NULL,
	"pu_updated_at" date NOT NULL,
	CONSTRAINT "planria_users_pu_private_id_unique" UNIQUE("pu_private_id"),
	CONSTRAINT "planria_users_pu_user_id_unique" UNIQUE("pu_user_id"),
	CONSTRAINT "planria_users_pu_email_unique" UNIQUE("pu_email")
);
