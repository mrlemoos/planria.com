import { expect, test } from "vitest";

import { assert } from "./assert";

test("throws an error for falsy conditions", function () {
  const input = false;

  function call() {
    assert(input, "The input is invalid.");
  }

  expect(call).toThrowError("The input is invalid.");
});

test("does not throw any errors for truthy conditions", function () {
  const input = true;

  function call() {
    assert(input, "The input is invalid.");
  }

  expect(call).not.toThrow();
});
