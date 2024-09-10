import { z, type Output } from "@planria/util/zod";

export const createEnvironmentSchema = z.object({
  name: z.string().min(1, "Required"),
  projectId: z.string().min(1),
});

export type CreateEnvironmentFormValues = Output<
  typeof createEnvironmentSchema
>;
