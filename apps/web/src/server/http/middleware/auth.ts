import { clerkMiddleware } from "@hono/clerk-auth";

import { env } from "$/server/env";

export function auth() {
  return clerkMiddleware({
    // rewrites the path to the publishable key because hono doesn't expect the NEXT_PUBLIC_ prefix
    publishableKey: env("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"),
    secretKey: env("CLERK_SECRET_KEY"),
  });
}
