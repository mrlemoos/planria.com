import { log } from "@planria/util/logging";
import type {
  NextMiddleware,
  NextMiddlewareResult,
} from "next/dist/server/web/types";
import type { NextFetchEvent, NextRequest } from "next/server";

export function createLoggingMiddleware(
  request: NextRequest,
  event: NextFetchEvent
): NextMiddlewareResult {
  const userRemoteAddress = request.headers.get("x-forwarded-for");

  log.info(
    `${request.method.toUpperCase()} hit ${event.sourcePage} for path ${
      request.url
    } ${userRemoteAddress ? `from address ${userRemoteAddress}` : ""}`
  );
}

export function withLoggingMiddleware(handler: NextMiddleware): NextMiddleware {
  return (request, event) => {
    createLoggingMiddleware(request, event);
    return handler(request, event);
  };
}
