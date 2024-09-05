import { z, type Infer } from "@planria/util/zod";

import { projectSchema } from "$/lib/schemas/projects";

export const createProjectSchema = projectSchema
  .omit({
    projectId: true,
    createdAt: true,
    updatedAt: true,
    slug: true,
  })
  .extend({
    slug: z
      .string()
      .refine((value) =>
        value && /^[a-z0-9-]+$/.test(value)
          ? true
          : "Slug must be lowercase, alphanumeric, and hyphenated"
      ),
  });

export type CreateProjectFormValues = Infer<typeof createProjectSchema>;
