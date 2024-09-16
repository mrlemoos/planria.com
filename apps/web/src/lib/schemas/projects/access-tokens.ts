import { Output, z } from "@planria/util/zod";

export const accessTokenSchema = z.object({
  accessTokenId: z.string().min(1, "Required"),
  projectId: z.string().min(1, "Required"),
  token: z.string().min(1, "Required"),
  displayName: z.string().min(1, "Required"),
  tokenFourInitialCharacters: z.string().min(4).max(4),
  environmentId: z.string().min(1, "Required"),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
});

export type AccessToken = Output<typeof accessTokenSchema>;
