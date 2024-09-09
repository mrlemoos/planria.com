import { cuid } from "@planria/util/crypto";
import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * The schema which defines the users table in the database. This table is a mirror
 * which represents the users from the authentication providers (e.g. Google, GitHub, etc),
 * and is used to store additional information about the users.
 *
 * It's our responsibility to keep the user replicas up-to-date and synchronised with Clerk.
 */
export const users = pgTable("planria_users", {
  privateId: serial("pu_private_id").notNull().primaryKey().unique(),

  userId: text("pu_user_id").notNull().unique(),
  email: text("pu_email").unique(),
  firstName: text("pu_first_name").notNull(),
  lastName: text("pu_last_name").notNull(),
  username: text("pu_username").notNull(),
  avatarURL: text("pu_avatar_url"),
  createdAt: timestamp("pu_created_at", { mode: "string" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("pu_updated_at", { mode: "string" })
    .notNull()
    .$defaultFn(() => sql`now()`),
});

/**
 * The schema which defines the projects table in the database. This table is used to
 * store the projects created by the users.
 */
export const projects = pgTable("planria_projects", {
  projectId: text("pp_project_id").notNull().unique().primaryKey(),
  name: text("pp_name").notNull(),
  slug: text("pp_slug").notNull(),
  description: text("pp_description"),
  ownerId: text("pp_owner_id")
    .notNull()
    .references(() => users.userId),
  createdAt: timestamp("pp_created_at", { mode: "string" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("pp_updated_at", { mode: "string" })
    .notNull()
    .$defaultFn(() => sql`now()`),
});

/**
 * The schema which defines the access passes granted to users in projects. This table
 * is used to store the access passes for the users.
 */
export const projectAccessPasses = pgTable("planria_project_access_passes", {
  accessPassId: text("pap_access_pass_id").notNull().primaryKey(),
  projectId: text("pap_project_id")
    .notNull()
    .references(() => projects.projectId),
  accessGrantedTo: text("pap_user_id")
    .notNull()
    .references(() => users.userId),
  createdAt: timestamp("pap_created_at", { mode: "string" })
    .notNull()
    .defaultNow(),
  updatedAt: date("pap_updated_at", { mode: "string" })
    .notNull()
    .$defaultFn(() => sql`now()`),
});

/**
 * The schema which defines the feature flags table in the database. This table stores
 * the feature flags which are used to enable or disable features in the application.
 */
export const featureFlags = pgTable("planria_feature_flags", {
  privateId: serial("pff_private_id").unique().notNull().primaryKey(),
  featureFlagId: text("pff_feature_flag_id")
    .$defaultFn(() => cuid())
    .unique()
    .notNull(),
  slug: text("pff_slug").notNull(),
  description: text("pff_description"),
  defaultValue: boolean("pff_default_value")
    .notNull()
    .$default(() => false),
  projectId: text("pff_project_id")
    .notNull()
    .references(() => projects.projectId),
  createdAt: timestamp("pff_created_at", { mode: "string" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("pff_updated_at", { mode: "string" })
    .notNull()
    .$defaultFn(() => sql`now()`),
});

/**
 * The schema which defines the environments table in the database. This table stores
 * the environments which are used to group the feature flags based on the environment
 * (e.g. development, staging, production, etc).
 */
export const environments = pgTable("planria_environments", {
  environmentId: text("pe_environment_id")
    .$defaultFn(() => cuid())
    .notNull()
    .primaryKey()
    .unique(),
  name: text("pe_name").notNull(),
  projectId: text("pe_project_id")
    .notNull()
    .references(() => projects.projectId),
  createdAt: timestamp("pe_created_at", { mode: "string" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("pe_updated_at", { mode: "string" })
    .notNull()
    .$onUpdateFn(() => sql`now()`),
});

/**
 * The schema which defines the table to store the value of the feature flags ID-ed by
 * the environment and the feature flag ID. This table is used to store the value of the
 * feature flags in the environments.
 */
export const environmentFeatureFlags = pgTable(
  "planria_environment_feature_flags",
  {
    environmentFeatureFlagId: text("peff_environment_feature_flag_id")
      .notNull()
      .$defaultFn(() => cuid())
      .unique()
      .primaryKey(),
    environmentId: text("peff_environment_id")
      .notNull()
      .references(() => environments.environmentId),
    // featureFlagId: text("peff_feature_flag_id")
    //   .notNull()
    //   .references(() => featureFlags.featureFlagId),
    featureFlagId: text("peff_feature_flag_id").notNull(),
    value: boolean("peff_value").default(false),
    createdAt: timestamp("peff_created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("peff_updated_at", { mode: "string" })
      .notNull()
      .$onUpdateFn(() => sql`now()`),
  }
);

/**
 * The schema which defines the mutation records (aka the history) of the feature flags
 * in the database. This table stores the mutation records of the feature flags which are
 * used to keep track of the changes made to the feature flags.
 */
export const featureFlagMutationRecords = pgTable(
  "planria_feature_flag_mutation_records",
  {
    mutationId: serial("pffmr_mutation_id").notNull().primaryKey(),
    featureFlagId: text("pffmr_feature_flag_id").notNull(),
    value: boolean("pffmr_value").notNull(),
    userId: text("pffmr_user_id")
      .notNull()
      .references(() => users.userId),
    createdAt: timestamp("pffmr_created_at", { mode: "string" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("pffmr_updated_at", { mode: "string" })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => sql`now()`),
  }
);
