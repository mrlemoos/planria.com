import { createId } from "@paralleldrive/cuid2";
import { MockedFunction, describe, expect, test, vi } from "vitest";

import { cuid } from "./crypto";

vi.mock("@paralleldrive/cuid2", () => ({
  createId: vi.fn(),
}));
const createIdFn = createId as MockedFunction<typeof cuid>;

describe("cuid()", () => {
  test("should generate a random string of numbers [0-9] and letters [a-zA-Z]", () => {
    const expectedValue = "wjtwgxz7ayhmzm9ov0222mmm";
    createIdFn.mockReturnValue(expectedValue);

    const value = cuid();

    expect(value).toBe(expectedValue);
  });

  test("should call createId() from '@paralleldrive/cuid2' module", () => {
    createIdFn.mockReset();

    cuid();

    expect(createIdFn).toHaveBeenCalledTimes(1);
  });
});
