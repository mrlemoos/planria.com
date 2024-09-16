import type { Output } from "@planria/util/zod";

import { accessTokenSchema } from "./access-tokens";
import { environmentSchema } from "./environments";

export const accessTokenAndEnvironmentSchema = accessTokenSchema
  .omit({ environmentId: true })
  .merge(environmentSchema.pick({ environmentId: true }))
  .extend({
    environmentName: environmentSchema.shape.name,
  });

export type AccessTokenAndEnvironment = Output<
  typeof accessTokenAndEnvironmentSchema
>;
