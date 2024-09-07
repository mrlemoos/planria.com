/**
 * The routes which the exact paths should be considered in the authentication middleware.
 */
export const PUBLIC_EXACT_ROUTES = ["/", "/pricing"] as const;

/**
 * The routes to which nesting should be considered in the authentication middleware.
 */
export const PUBLIC_NESTING_ROUTES = [
  "/sign-in",
  "/sign-up",
  "/blog",
  "/developers",
  "/api/webhooks",
] as const;
