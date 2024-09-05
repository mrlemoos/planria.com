import { z, type Infer } from "@planria/util/zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Required"),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  projectId: z.string().min(1),
  slug: z.string().min(1, "Required"),
  description: z.string().nullable(),
  ownerId: z.string().min(1, "Required"),
});

export type Project = Infer<typeof projectSchema>;
