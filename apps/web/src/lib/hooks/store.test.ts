import { expect, test, vi } from "vitest";

import { renderHook } from "$/lib/extensions/testing-library+ext";

import { useStore } from "./store";

test("useStore() should return the stored value", function () {
  const value = { value: "string" };
  const setValue = vi.fn();

  const {
    result: { current: storedValue },
  } = renderHook(() => useStore(() => value, setValue));

  expect(storedValue).toBe(value);
});
