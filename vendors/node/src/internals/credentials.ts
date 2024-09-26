import { z, type Output } from "@planria/util/zod";

/**
 * [INTERNAL]
 *
 * The class extending the native `Error` class to represent an error thrown the environment
 * variable cannot be accessed/found by the indexed key.
 *
 * @since 1.0.0
 */
class EnvironmentVariableNotFoundError extends Error {
  constructor(variableName: string) {
    super(
      `The environment variable "${variableName}" cannot be accessed because it does NOT exist in the environment. Please evaluate the environment variable and add it to the environment before attempting again.`
    );
  }
}

/**
 * Type guard to check if the error is an instance of `EnvironmentVariableNotFoundError`.
 *
 * @see {@link EnvironmentVariableNotFoundError}
 *
 * @since 1.0.0
 */
export function isEnvironmentVariableNotFoundError(
  error: unknown
): error is EnvironmentVariableNotFoundError {
  return error instanceof EnvironmentVariableNotFoundError;
}

/**
 * [INTERNAL]
 *
 * Retrieves the environment variable from the process environment in runtime or throws an error
 * if the environment variable doesn't exist in the environment. The indexed environment variable
 * key must be one of the following: `PLANRIA_ACCESS_TOKEN`, `PLANRIA_ENVIRONMENT_ID`, and
 * `PLANRIA_PROJECT_ID`.
 *
 * @see {@link EnvironmentVariableNotFoundError}
 *
 * @since 1.0.0
 */
function getEnvironmentVariable<
  K extends
    | "PLANRIA_ACCESS_TOKEN"
    | "PLANRIA_ENVIRONMENT_ID"
    | "PLANRIA_PROJECT_ID",
  V extends NodeJS.ProcessEnv[K]
>(key: K): V {
  const value = process.env[key];

  if (!value) {
    throw new EnvironmentVariableNotFoundError(key);
  }
  return value as V;
}

const credentialsSchema = z.object({
  accessToken: z
    .string()
    .min(
      1,
      "The access token is required. Are you sure you have set the PLANRIA_ACCESS_TOKEN environment variable correctly? Have you not generated an access token? No problem, cowboy (or girl), you can take a peek at this doc right here and see how easy it is: https://planria.com/docs/access-tokens"
    ), // TODO: create this documentation page
  environmentId: z
    .string()
    .min(
      1,
      "The environment ID is required. Are you sure you have set the PLANRIA_ENVIRONMENT_ID environment variable correctly? If you need help finding your environment ID, this might help: https://planria.com/docs/projects/environment-id"
    ), // TODO: create this documentation page
  projectId: z
    .string()
    .min(
      1,
      "The project ID is required. Are you sure you have set the PLANRIA_PROJECT_ID environment variable correctly? If you need help finding your project ID, this might help: https://planria.com/docs/projects/project-id"
    ), // TODO: create this documentation page
});

/**
 * The type that draws the object containing the credentials necessary to access any data and
 * perform any operations within a Planria project via the HTTP endpoints.
 *
 * @see {@link credentialsSchema | `credentialsSchema`}
 * @since 1.0.0
 */
export type Credentials = Output<typeof credentialsSchema>;

/**
 * Returns an object with the credentials necessary to access any data and perform any operations
 * within the project in Planria via the HTTP endpoints. This function might throw one or
 * several errors if the environment variables are not found in the environment.
 *
 * @see {@link getEnvironmentVariable | `getEnvironmentVariable()`}
 *
 * @since 1.0.0
 */
export function getCredentials(): Credentials {
  const accessToken = getEnvironmentVariable("PLANRIA_ACCESS_TOKEN");
  const environmentId = getEnvironmentVariable("PLANRIA_ENVIRONMENT_ID");
  const projectId = getEnvironmentVariable("PLANRIA_PROJECT_ID");

  const { success, data, error } = credentialsSchema.safeParse({
    accessToken,
    environmentId,
    projectId,
  });

  if (!success) {
    // throws one error at the time because I don't wanna scare the fuck out of the user
    // in the first CLI error they get
    throw new Error(error.errors[0].message);
  }

  return data;
}
