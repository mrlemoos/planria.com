CREATE TABLE IF NOT EXISTS "planria_user_payment_accounts" (
	"pupa_payment_account_id" text PRIMARY KEY NOT NULL,
	"pupa_user_id" text NOT NULL,
	"pupa_stripe_customer_id" text NOT NULL,
	"pupa_stripe_subscription_id" text,
	"pupa_price_id" text,
	"pupa_current_period_end" timestamp,
	"pupa_created_at" timestamp DEFAULT now() NOT NULL,
	"pupa_updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "planria_user_payment_accounts_pupa_payment_account_id_unique" UNIQUE("pupa_payment_account_id"),
	CONSTRAINT "planria_user_payment_accounts_pupa_stripe_customer_id_unique" UNIQUE("pupa_stripe_customer_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "planria_user_payment_accounts" ADD CONSTRAINT "planria_user_payment_accounts_pupa_user_id_planria_users_pu_user_id_fk" FOREIGN KEY ("pupa_user_id") REFERENCES "public"."planria_users"("pu_user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
