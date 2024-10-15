import type { Context } from "hono";
import { cors as __honoCors } from "hono/cors";
import { expect, test, vi, type MockedFunction } from "vitest";

import { cors } from "./cors";

vi.mock("hono/cors", () => ({
  cors: vi.fn().mockReturnValue(vi.fn()),
}));
const honoCors = __honoCors as MockedFunction<typeof __honoCors>;

test("cors() should call cors abstraction from Hono to establish any CORS origin policy, accept certain methods, and set a max age for cache", async function () {
  const middlewareHandlerFn = cors();
  const context = {} as Context;
  const nextFn = vi.fn();

  middlewareHandlerFn(context, nextFn);

  expect(honoCors).toHaveBeenCalledWith({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    maxAge: 86400,
  });
});
