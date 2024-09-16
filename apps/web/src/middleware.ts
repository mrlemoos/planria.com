import type { MiddlewareConfig } from "next/server";

import { createAuthMiddleware } from "$/lib/auth/server";
import { withLoggingMiddleware } from "$/server/logging";

export const config: MiddlewareConfig = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};

export default withLoggingMiddleware(createAuthMiddleware());
