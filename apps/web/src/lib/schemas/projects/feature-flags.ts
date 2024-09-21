import { z, type Infer } from "@planria/util/zod";

export const featureFlagSchema = z.object({
  privateId: z.number(),
  featureFlagId: z.string().min(1).cuid2(),
  slug: z.string().min(1),
  description: z.string().nullable(),
  defaultValue: z.string().nullable(),
  valueType: z.enum(["string", "boolean", "number"]).nullable(),
  projectId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type FeatureFlag = Infer<typeof featureFlagSchema>;

export const environmentFeatureFlagSchema = z.object({
  environmentFeatureFlagId: z.string().min(1).cuid2(),
  environmentId: z.string().min(1),
  featureFlagId: z.string().min(1),
  value: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type EnvironmentFeatureFlag = Infer<typeof environmentFeatureFlagSchema>;
