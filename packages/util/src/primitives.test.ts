import { expect, test } from "vitest";

import { isNonNullable } from "./primitives";

test("isNonNullable() returns true for not-null and not-undefined values", function () {
  const input = "value";

  const result = isNonNullable(input);

  expect(result).toBe(true);
});

test("isNonNullable() returns false for null values", function () {
  const input = null;

  const result = isNonNullable(input);

  expect(result).toBe(false);
});

test("isNonNullable() returns false for undefined values", function () {
  const input = undefined;

  const result = isNonNullable(input);

  expect(result).toBe(false);
});
