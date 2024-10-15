import { z } from "@planria/util/zod";

import { projectSchema } from "$/lib/schemas/projects";
import { environmentSchema } from "$/lib/schemas/projects/environments";

export const passportSchema = z.object({
  accessToken: z.string().min(1, "The access token is required"),
  projectId: projectSchema.shape.projectId,
  environmentId: environmentSchema.shape.environmentId,
});
