ALTER TABLE "planria_environment_feature_flags" ALTER COLUMN "peff_value" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "planria_environment_feature_flags" ALTER COLUMN "peff_value" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "planria_feature_flags" ALTER COLUMN "pff_default_value" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "planria_feature_flags" ALTER COLUMN "pff_default_value" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "planria_feature_flags" ADD COLUMN "pff_value_type" text;