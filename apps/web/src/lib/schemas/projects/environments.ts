import { z, type Infer } from "@planria/util/zod";

export const environmentSchema = z.object({
  environmentId: z.string().cuid2(),
  name: z.string().min(1),
  projectId: z.string().cuid2(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

export type Environment = Infer<typeof environmentSchema>;
