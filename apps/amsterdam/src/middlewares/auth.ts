import { handleException } from "@planria/util/errors";
import { HttpStatusCode } from "@planria/util/http";
import { NextFunction, Request, Response } from "express";

import { verifyAccessToken } from "$/services/access_tokens.service";

import { REQUIRED_HTTP_HEADERS } from "./constants";

/**
 * The middleware to verify the access token and the project
 * and environment IDs in the request headers.
 *
 * The middleware will return a `401` status code if the token is invalid
 * or does not belong to the specified project or environment.
 *
 * The middleware will return a `404` status code if the project
 * or environment ID is not found in the request headers.
 *
 * The required headers should be present in the following format:
 *
 * ```plain
 * Authorization: Bearer <access_token>
 * X-Planria-Project: <project_id>
 * X-Planria-Environment: <environment_id>
 * ```
 *
 * 1. The `Authorization` header should contain the access token generated
 *    for the intended project and environment.
 * 2. The `X-Planria-Project` header should contain the project ID.
 * 3. The `X-Planria-Environment` header should contain the environment ID.
 */
export function authGuard() {
  return async function (
    /**
     * The streamlined request object.
     */
    request: Request,
    /**
     * The streamlined response object.
     */
    response: Response,
    /**
     * The next function to call the next middleware in a procedural manner.
     */
    next: NextFunction
  ) {
    const token =
      request.headers?.[REQUIRED_HTTP_HEADERS.AUTHORIZATION]
        ?.replace("Bearer ", "")
        ?.trim() ?? "";
    const environmentId = (
      request.headers?.[REQUIRED_HTTP_HEADERS.ENVIRONMENT_ID] as
        | string
        | undefined
    )?.trim();
    const projectId = (
      request.headers?.[REQUIRED_HTTP_HEADERS.PROJECT_ID] as string | undefined
    )?.trim();

    if (!token) {
      response
        .status(HttpStatusCode.UNAUTHORIZED)
        .json(
          handleException(
            "unauthorized",
            "Access token is required and could not be found in the request headers."
          )
        );
      return;
    }

    if (!projectId) {
      response
        .status(HttpStatusCode.NOT_FOUND)
        .json(
          handleException(
            "project.not.found",
            "Project ID is required and could not be found in the request headers."
          )
        );
      return;
    }

    if (!environmentId) {
      response
        .status(HttpStatusCode.NOT_FOUND)
        .json(
          handleException(
            "environment.not.found",
            "Environment ID is required and could not be found in the request headers."
          )
        );
      return;
    }

    const isValid = await verifyAccessToken({
      environmentId,
      projectId,
      token,
    });

    if (!isValid) {
      response
        .status(HttpStatusCode.FORBIDDEN)
        .json(
          handleException(
            "forbidden",
            "Access token is invalid or does not belong to the specified project or environment."
          )
        );
      return;
    }

    next();
  };
}
