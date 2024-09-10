import { type Output } from "@planria/util/zod";

import { featureFlagSchema } from "$/lib/schemas/projects/feature-flags";

// #region Create Feature Flag

export const createFeatureFlagSchema = featureFlagSchema.omit({
  privateId: true,
  featureFlagId: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateFeatureFlagFormValues = Output<
  typeof createFeatureFlagSchema
>;

// #region Update Feature Flag

export const updateFeatureFlagSchema = featureFlagSchema.pick({
  description: true,
  featureFlagId: true,
  defaultValue: true,
});

export type UpdateFeatureFlagFormValues = Output<
  typeof updateFeatureFlagSchema
>;
