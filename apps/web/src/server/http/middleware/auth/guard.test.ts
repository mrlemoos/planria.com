import { getAuth as __getAuth } from "@hono/clerk-auth";
import { handleException as __handleException } from "@planria/util/errors";
import { HttpStatusCode as __HttpStatusCode } from "@planria/util/http";
import type { Context } from "hono";
import { expect, test, vi, type MockedFunction } from "vitest";

import { authGuard } from "./guard";

vi.mock("@hono/clerk-auth", () => ({
  getAuth: vi.fn().mockReturnValue({}),
}));
const getAuth = __getAuth as MockedFunction<typeof __getAuth>;

vi.mock("@planria/util/errors", () => ({
  handleException: vi.fn(),
}));
const handleException = __handleException as unknown as MockedFunction<
  (...args: string[]) => unknown
>;

vi.mock("@planria/util/http", () => ({
  HttpStatusCode: {
    UNAUTHORIZED: 401,
  },
}));
const HttpStatusCode = {
  UNAUTHORIZED: __HttpStatusCode.UNAUTHORIZED,
};

test("authGuard() closure should return UNAUTHORIZED status and error message for unauthenticated user", async function () {
  const context: Context = {
    status: vi.fn(),
    json: vi.fn(),
  } as unknown as Context;

  const next = vi.fn();

  await authGuard()(context, next);

  expect(context.status).toHaveBeenCalledWith(HttpStatusCode.UNAUTHORIZED);
  expect(context.json).toHaveBeenCalledWith(
    handleException(expect.any(String), expect.any(String))
  );
  expect(next).not.toHaveBeenCalled();
});

test("authGuard() closure should call the next middleware for authenticated user", async function () {
  getAuth.mockReturnValue({ userId: "123" } as ReturnType<typeof __getAuth>);
  const context = {} as Context;
  const next = vi.fn();

  await authGuard()(context, next);

  expect(getAuth).toHaveBeenCalled();
  expect(next).toHaveBeenCalled();
});
