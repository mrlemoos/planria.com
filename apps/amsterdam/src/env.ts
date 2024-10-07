import { z } from "@planria/util/zod";
import { createEnv } from "@t3-oss/env-core";
import { railway } from "@t3-oss/env-core/presets";

const envMap = createEnv({
  isServer: typeof window === "undefined",
  /*
   * Server-side environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    PORT: z.string().regex(/^\d+$/).default("3000"),
    NODE_ENV: z
      .enum(["development", "preview", "production"])
      .default("development"),
    DATABASE_URL: z.string().url(),
  },
  runtimeEnv: {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  extends: [railway()],
});

export type EnvironmentVariables = typeof envMap;

/**
 * Accesses the type-safe environment variable by the key and returns the value found in runtime.
 */
export function env<
  K extends keyof EnvironmentVariables,
  V extends EnvironmentVariables[K]
>(key: K): V {
  return envMap[key] as V;
}

/**
 * Checks if the current environment is development.
 */
export function isDevelopment(): boolean {
  return env("NODE_ENV") === "development";
}
