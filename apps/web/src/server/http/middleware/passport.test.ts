import { handleException as __handleException } from "@planria/util/errors";
import { log as __log } from "@planria/util/logging";
import type { Context } from "hono";
import { expect, test, vi, type MockedFunction } from "vitest";

import {
  PLANRIA_ACCESS_TOKEN_HEADER_KEY,
  PLANRIA_ENVIRONMENT_ID_HEADER_KEY,
  PLANRIA_PROJECT_ID_HEADER_KEY,
} from "../constants";

import { passportSchema as __passportSchema } from "./_schema";
import { passport } from "./passport";

vi.mock("@planria/util/errors", () => ({
  handleException: vi.fn(),
}));
const handleException = __handleException as unknown as MockedFunction<
  (...args: string[]) => unknown
>;

vi.mock("@planria/util/logging", () => ({
  log: {
    error: vi.fn(),
  },
}));
const log = {
  error: __log.error,
};

vi.mock("$/lib/schemas/projects", () => ({
  projectSchema: { shape: { projectId: "project_id" } },
}));
vi.mock("$/lib/schemas/projects/environments", () => ({
  environmentSchema: { shape: { environmentId: "environment_id" } },
}));

vi.mock("./_schema", () => ({
  passportSchema: {
    parse: vi.fn(),
  },
}));
const passportSchema = __passportSchema as unknown as {
  parse: MockedFunction<typeof __passportSchema.parse>;
};

vi.mock("../constants", () => ({
  PLANRIA_ACCESS_TOKEN_HEADER_KEY: "planria_access_token_header_key",
  PLANRIA_PROJECT_ID_HEADER_KEY: "planria_project_id_header_key",
  PLANRIA_ENVIRONMENT_ID_HEADER_KEY: "planria_environment_id_header_key",
}));

test("passport() closure should extract the HTTP headers", async function () {
  const context = {
    req: {
      header: vi.fn().mockImplementation((key) => key),
    },
  } as unknown as Context;
  const nextFn = vi.fn();
  const middlewareHandlerFn = passport();

  await middlewareHandlerFn(context, nextFn);

  expect(context.req.header).toHaveBeenCalledWith(
    PLANRIA_ACCESS_TOKEN_HEADER_KEY
  );
  expect(context.req.header).toHaveBeenCalledWith(
    PLANRIA_PROJECT_ID_HEADER_KEY
  );
  expect(context.req.header).toHaveBeenCalledWith(
    PLANRIA_ENVIRONMENT_ID_HEADER_KEY
  );
});

test("passport() closure should parse the extracted headers and call next() if the headers are valid", async function () {
  const context = {
    req: {
      header: vi.fn().mockImplementation((key) => key),
    },
  } as unknown as Context;
  const nextFn = vi.fn();
  const middlewareHandlerFn = passport();

  await middlewareHandlerFn(context, nextFn);

  expect(passportSchema.parse).toHaveBeenCalledWith({
    accessToken: PLANRIA_ACCESS_TOKEN_HEADER_KEY,
    projectId: PLANRIA_PROJECT_ID_HEADER_KEY,
    environmentId: PLANRIA_ENVIRONMENT_ID_HEADER_KEY,
  });
  expect(nextFn).toHaveBeenCalled();
});

test("passport() closure should log an error for an invalid HTTP header", async function () {
  const context = {
    req: {
      header: vi.fn().mockImplementation((key) => key),
    },
    status: vi.fn(),
    json: vi.fn(),
  } as unknown as Context;
  const nextFn = vi.fn();
  const middlewareHandlerFn = passport();

  passportSchema.parse.mockImplementation(() => {
    throw new Error("Invalid headers");
  });

  await middlewareHandlerFn(context, nextFn);

  expect(log.error).toHaveBeenCalledWith(
    "Access has been denied by passport for the following credentials:",
    {
      accessToken: PLANRIA_ACCESS_TOKEN_HEADER_KEY,
      projectId: PLANRIA_PROJECT_ID_HEADER_KEY,
      environmentId: PLANRIA_ENVIRONMENT_ID_HEADER_KEY,
    }
  );
});

test("passport() closure should respond with a 403 (Forbidden) status code for an invalid HTTP header", async function () {
  const context = {
    req: {
      header: vi.fn().mockImplementation((key) => key),
    },
    status: vi.fn(),
    json: vi.fn(),
  } as unknown as Context;
  const nextFn = vi.fn();
  const middlewareHandlerFn = passport();

  passportSchema.parse.mockImplementation(() => {
    throw new Error("Invalid headers");
  });

  await middlewareHandlerFn(context, nextFn);

  expect(context.status).toHaveBeenCalledWith(403);
  expect(context.json).toHaveBeenCalledWith(
    handleException(
      "auth.passport.denied",
      "Access has been denied by passport. This error commonly occurs when the access token does not belong to either the project or the environment to which the HTTP request is referring to."
    )
  );
});
