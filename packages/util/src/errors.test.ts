import { MockedClass, expect, test, vi } from "vitest";

import { handleException, isErrorCode, isZodError } from "./errors";
import { ZodError as __ZodError } from "./zod";

vi.mock("./zod", () => {
  const StubZodError = vi.fn();

  return {
    ZodError: StubZodError,
  };
});
const ZodError = __ZodError as MockedClass<typeof __ZodError>;

test("isZodError() should return true for a ZodError instance", function () {
  const error = new ZodError([]);

  const result = isZodError(error);

  expect(result).toBe(true);
});

test("isZodError() should return false for a non-ZodError instance", function () {
  const nonZod = {};

  const result = isZodError(nonZod);

  expect(result).toBe(false);
});

test("isErrorCode() should return true for an error code starting with the prefix", function () {
  const code = "TEST_CODE";
  const prefix = "TEST";

  const result = isErrorCode(code, prefix);

  expect(result).toBe(true);
});

test("isErrorCode() should return false for an error code not starting with the prefix", function () {
  const code = "TEST_CODE";
  const prefix = "OTHER";

  const result = isErrorCode(code, prefix);

  expect(result).toBe(false);
});

test("handleException() should return an object with the error code, message, and data", function () {
  const code = "TEST_CODE";
  const message = "Test message";
  const data = { key: "value" };

  const result = handleException(code, message, data);

  expect(result).toEqual({ errorCode: code, error: message, data });
});
