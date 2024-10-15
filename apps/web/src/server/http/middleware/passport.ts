import { handleException } from "@planria/util/errors";
import { HttpStatusCode } from "@planria/util/http";
import { log } from "@planria/util/logging";
import type { Context, MiddlewareHandler, Next } from "hono";

import { passportSchema } from "./_schema";

import {
  PLANRIA_ACCESS_TOKEN_HEADER_KEY,
  PLANRIA_ENVIRONMENT_ID_HEADER_KEY,
  PLANRIA_PROJECT_ID_HEADER_KEY,
} from "../constants";

/**
 * Middleware to require the presence of the Planria headers in the HTTP request to
 * authenticate the operation and identify the project and environment.
 * This middleware protects the API HTTP routes by responding with a 302 (Forbidden)
 * if the headers are not present or the access token does not belong to
 * the project or environment.
 *
 * The response object will look as follows:
 * ```json
 * {
 *   "error": "Access has been denied by passport. This error commonly occurs when the access token does not belong to either the project or the environment to which the HTTP request is referring to.",
 *   "errorCode": "auth.passport.denied"
 * }
 * ```
 */
export function passport(): MiddlewareHandler {
  return async (c: Context, next: Next) => {
    const accessToken = c.req.header(PLANRIA_ACCESS_TOKEN_HEADER_KEY);
    const projectId = c.req.header(PLANRIA_PROJECT_ID_HEADER_KEY);
    const environmentId = c.req.header(PLANRIA_ENVIRONMENT_ID_HEADER_KEY);

    try {
      passportSchema.parse({ accessToken, projectId, environmentId });
    } catch (error) {
      log.error(
        "Access has been denied by passport for the following credentials:",
        { accessToken, projectId, environmentId }
      );
      c.status(HttpStatusCode.FORBIDDEN);
      return c.json(
        handleException(
          "auth.passport.denied",
          "Access has been denied by passport. This error commonly occurs when the access token does not belong to either the project or the environment to which the HTTP request is referring to."
        )
      );
    }

    await next();
  };
}
