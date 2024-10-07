import { log } from "@planria/util/logging";
import type { NextFunction, Request, Response } from "express";

/**
 * The middleware to log the incoming requests.
 */
export function logging() {
  return function (request: Request, response: Response, _next: NextFunction) {
    const date = new Date();
    const fullDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date
      .getDate()
      .toString()
      .padStart(2, "0")}`;
    const fullHour = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

    log.info(
      `${fullDate} ${fullHour} ${request.method.toUpperCase()} ${
        request.path
      } | ${request.ip} | ${response.statusCode}`
    );
  };
}
