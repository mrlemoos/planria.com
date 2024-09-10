import { z, type Infer } from "@planria/util/zod";

export const featureFlagSchema = z.object({
  privateId: z.number(),
  featureFlagId: z.string().min(1).cuid2(),
  slug: z.string().min(1),
  description: z.string().nullable(),
  defaultValue: z.boolean(),
  projectId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type FeatureFlag = Infer<typeof featureFlagSchema>;
