import { log as __log } from "@planria/util/logging";
import type { Request, Response } from "express";
import { MockedFunction, expect, test, vi } from "vitest";

import { RESPONSE_HTTP_HEADERS } from "./constants";
import { versionAware } from "./version";

vi.mock("@planria/util/logging", () => ({
  log: {
    info: vi.fn(),
  },
}));
const log = __log as unknown as {
  info: MockedFunction<typeof __log.info>;
};

vi.mock("../../package.json", () => ({
  default: {
    version: "1.0.0-alpha.1",
  },
}));

test("versionAware() middleware sets the API version in the response headers", function () {
  const request = { ip: "0.0.0.0" } as unknown as Request;
  const response = { setHeader: vi.fn() } as unknown as Response;
  const next = vi.fn();

  const middleware = versionAware();
  middleware(request, response, next);

  expect(response.setHeader).toHaveBeenCalledWith(
    RESPONSE_HTTP_HEADERS.API_VERSION,
    "1.0.0-alpha.1"
  );
});

test("versionAware() middleware calls the next middleware", function () {
  const request = { ip: "0.0.0.0" } as unknown as Request;
  const response = { setHeader: vi.fn() } as unknown as Response;
  const next = vi.fn();

  const middleware = versionAware();
  middleware(request, response, next);

  expect(next).toHaveBeenCalled();
});

test("versionAware() middleware logs the API version and the incoming IP address", function () {
  const request = { ip: "0.0.0.0" } as unknown as Request;
  const response = { setHeader: vi.fn() } as unknown as Response;
  const next = vi.fn();
  const appVersion = "1.0.0-alpha.1";

  const middleware = versionAware();
  middleware(request, response, next);

  expect(log.info).toHaveBeenCalledWith(
    `API version set to the response for the incoming IP ${request.ip}: ${appVersion}`
  );
});
