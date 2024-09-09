import type { MiddlewareConfig } from "next/server";

import { createAuthMiddleware } from "$/lib/auth/server";

export const config: MiddlewareConfig = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Skip routes nested in "/sign-in", "/sign-up", and "/blog"
    "/((?!sign-in|sign-up|blog).*)",
  ],
};

export default createAuthMiddleware();
