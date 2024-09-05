import { z } from "@planria/util/zod";
import { createEnv } from "@t3-oss/env-nextjs";

const envConfig = createEnv({
  // These are server-side environment variables, not available on the client
  // throws if the app tries to access these on the client.
  server: {
    DATABASE_URL: z.string().url(),
    CLERK_SECRET_KEY: z.string().min(1),
    NODE_ENV: z.enum(["development", "test", "production"]),
    CLERK_SIGN_IN_URL: z.string().min(1),
    CLERK_SIGN_UP_URL: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
  },
  // Environment variables available on the client (and server). A type error
  // will be thrown if these are not prefixed with NEXT_PUBLIC_.
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  },
  // Due to how Next.js bundles environment variables on the edge and on client,
  // we need to manually destructure them to make sure all are included in bundle.
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NODE_ENV: process.env.NODE_ENV,
    CLERK_SIGN_IN_URL: process.env.CLERK_SIGN_IN_URL,
    CLERK_SIGN_UP_URL: process.env.CLERK_SIGN_UP_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  },
});

export type EnvironmentConfiguration = typeof envConfig;

/**
 * Retrieves the value of the specified environment configuration key.
 * @param key The key of the environment configuration.
 * @returns The value associated with the specified key, or `null` if the key is not found.
 */
export function env<K extends keyof EnvironmentConfiguration>(
  key: K
): EnvironmentConfiguration[K] {
  return envConfig[key];
}
