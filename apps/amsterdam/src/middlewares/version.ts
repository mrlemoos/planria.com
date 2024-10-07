import { log } from "@planria/util/logging";
import type { NextFunction, Request, Response } from "express";

import packageJSON from "../../package.json";

import { RESPONSE_HTTP_HEADERS } from "./constants";

const appVersion = packageJSON.version;

/**
 * The middleware to set the API version in the response headers.
 */
export function versionAware() {
  return function (request: Request, response: Response, next: NextFunction) {
    log.info(
      `API version set to the response for the incoming IP ${request.ip}: ${appVersion}`
    );
    response.setHeader(RESPONSE_HTTP_HEADERS.API_VERSION, appVersion);
    next();
  };
}
