import type { ExceptionObject } from "@planria/util/errors";
import { httpClient } from "@planria/util/http";

import { BASE_API_URL } from "../constants";
import { getCredentials, type Credentials } from "../credentials";

/**
 * Authenticates the given access token if the provided environment and project IDs are also
 * valid and all corresponding to one another.
 */
export async function authenticate(): Promise<
  | { authenticated: true; credentials: Credentials }
  | { authenticated: false; credentials?: never; error: string }
> {
  const credentials = getCredentials();

  const searchParams = new URLSearchParams({
    token: credentials.accessToken,
    environmentId: credentials.environmentId,
  });

  const response = await httpClient
    .post(
      `${BASE_API_URL}/v1/projects/${credentials.projectId}/access-tokens/verify`,
      { searchParams }
    )
    .json<
      { authenticated: true } | ({ authenticate: false } & ExceptionObject)
    >();

  if (!("authenticated" in response)) {
    return { authenticated: false, error: response.error };
  }
  return { authenticated: true, credentials };
}
