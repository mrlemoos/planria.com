import { clerkMiddleware as __clerkMiddleware } from "@hono/clerk-auth";
import { MockedFunction, expect, test, vi } from "vitest";

import { env as __env } from "$/server/env";

import { auth } from "./auth";

vi.mock("@hono/clerk-auth", () => ({
  clerkMiddleware: vi.fn().mockReturnValue(vi.fn()),
}));
const clerkMiddleware = __clerkMiddleware as MockedFunction<
  typeof __clerkMiddleware
>;

vi.mock("$/server/env", () => ({
  env: vi.fn().mockImplementation((value) => value),
}));
const env = __env as MockedFunction<typeof __env>;

test("auth() should pass the publishableKey and secretKey from environment to clerkMiddleware() factory", function () {
  const publishableKey = "publishable_key";
  const secretKey = "secret_key";
  env
    // calls once for PUBLISHABLE_KEY
    .mockReturnValueOnce(publishableKey)
    // then once for SECRET_KEY
    .mockReturnValueOnce(secretKey);

  auth();

  expect(clerkMiddleware).toHaveBeenCalledWith({
    publishableKey,
    secretKey,
  });
});
