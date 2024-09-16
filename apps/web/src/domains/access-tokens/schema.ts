import { type Output } from "@planria/util/zod";

import { accessTokenSchema } from "$/lib/schemas/projects/access-tokens";

export const createAccessTokenSchema = accessTokenSchema.pick({
  environmentId: true,
  token: true,
  projectId: true,
  displayName: true,
});

export type CreateAccessTokenFormValues = Output<
  typeof createAccessTokenSchema
>;
