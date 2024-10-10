import { getAuth } from "@hono/clerk-auth";
import { handleException } from "@planria/util/errors";
import { HttpStatusCode } from "@planria/util/http";
import type { Context, MiddlewareHandler, Next } from "hono";

/**
 * Middleware to guard routes by requiring the user to be authenticated by the authentication service.
 */
export function authGuard(): MiddlewareHandler {
  return async (c: Context, next: Next) => {
    // https://github.com/honojs/middleware/tree/main/packages/clerk-auth
    const auth = getAuth(c);

    if (!auth?.userId) {
      c.status(HttpStatusCode.UNAUTHORIZED);
      return c.json(
        handleException(
          "unauthorized",
          "You are not authorized to access this resource. Please sign in and try again."
        )
      );
    }

    await next();
  };
}
