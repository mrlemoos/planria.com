import { handleException, isError, isZodError } from "@planria/util/errors";
import { HttpStatusCode } from "@planria/util/http";
import { log } from "@planria/util/logging";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";
import { handle } from "hono/vercel";

import { health } from "$/server/http/handlers/health";
import { tokens } from "$/server/http/handlers/projects/tokens";
import { auth } from "$/server/http/middleware/auth";
import { authGuard } from "$/server/http/middleware/auth/guard";
import { chronometer } from "$/server/http/middleware/chronometer";
import { cors } from "$/server/http/middleware/cors";
import { passport } from "$/server/http/middleware/passport";

export const runtime = "edge"; // https://hono.dev/docs/getting-started/vercel#node-js

const app = new Hono().basePath("/api/v1");

app.use("*", auth());
app.use(logger());
app.use(poweredBy());
app.use(cors());
app.use(chronometer());

app.notFound((c) => {
  c.status(HttpStatusCode.NOT_FOUND);
  return c.json(
    handleException(
      "router.not.found",
      "This path does not correspond to any API route. Please refer to the right endpoint and try again."
    )
  );
});

function isMissingClerkKeyError(error: unknown): error is Error {
  return (
    error instanceof Error &&
    error.message.includes("Missing Clerk Publishable key")
  );
}

app.onError((error, c) => {
  if (isMissingClerkKeyError(error)) {
    log.debug(error.message);
    c.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
    return c.json(
      handleException(
        "auth.service.not.configured",
        "The authentication service has not yet been properly configured or is missing the necessary credentials. Check the environment variables and try again."
      )
    );
  }

  if (isZodError(error)) {
    c.status(HttpStatusCode.BAD_REQUEST);
    return c.json(
      handleException(
        "api.router.validation.error",
        isError(error)
          ? (error as Error)?.message
          : "The request input is invalid."
      )
    );
  }
  c.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
  return c.json(
    handleException(
      "api.router.error",
      isError(error)
        ? (error as Error)?.message
        : "An error occurred while processing the request."
    )
  );
});

// binds the handlers for the routes
app.route("/health", health);

const userHandlers = new Hono();
userHandlers.use(authGuard());
app.route("/u" /* "u" is short for "user" */, userHandlers);

const projectHandlers = new Hono();
projectHandlers.use(passport());
projectHandlers.route("/projects/tokens", tokens);
app.route("/p" /* "p" is short for "project" */, projectHandlers);

export const GET = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const POST = handle(app);
