CREATE TABLE IF NOT EXISTS "planria_newsletter_recipients" (
	"pnr_email" text NOT NULL,
	"pnr_first_name" text NOT NULL,
	"pnr_last_name" text NOT NULL,
	"pnr_created_at" timestamp DEFAULT now() NOT NULL,
	"pnr_updated_at" timestamp NOT NULL,
	CONSTRAINT "planria_newsletter_recipients_pnr_email_unique" UNIQUE("pnr_email")
);
