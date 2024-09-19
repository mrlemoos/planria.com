import { useState as __useState } from "react";

import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, test, vi, type MockedFunction } from "vitest";

import { toggleFeatureFlagDefaultValueAction as __toggleFeatureFlagDefaultValueAction } from "../../server-actions";

import { useTogglingDefaultValueController } from "./hooks";

vi.mock("@planria/design/toast", () => ({
  useToast: vi.fn().mockReturnValue({ toast: vi.fn() }),
}));

vi.mock("../../server-actions", () => ({
  toggleFeatureFlagDefaultValueAction: vi.fn().mockResolvedValue({
    ok: true,
    message: 'Flagging sounds nicer than "toggling."',
  }),
}));

vi.mock("react", async (importActual) => {
  const actual = await importActual<object>();

  return {
    ...actual,
    useState: vi.fn().mockReturnValue([false, vi.fn()]),
    useOptimistic: vi.fn().mockReturnValue([false, vi.fn()]),
    // ^^ mocks the useOptimistic hook to return a tuple of [false, () => {}] because
    // the Testing Library doesn't support experimental hooks such as useOptimistic.
    // It should be fixed in the near future when the hook becomes stable.
  };
});

const toggleFeatureFlagDefaultValueAction =
  __toggleFeatureFlagDefaultValueAction as MockedFunction<
    typeof __toggleFeatureFlagDefaultValueAction
  >;

const useState = __useState as MockedFunction<typeof __useState>;

describe("given that the feature flag is still submitting", function () {
  describe("when the handleToggleFeatureFlag() function is called", function () {
    test("then the server side is NOT called", async function () {
      useState.mockReturnValue([true, vi.fn()]);
      const { result } = renderHook(() =>
        useTogglingDefaultValueController({
          featureFlagId: "123",
          featureFlagDefaultValue: true,
        })
      );

      const { handleToggleFeatureFlag } = result.current;
      await handleToggleFeatureFlag(false);

      expect(toggleFeatureFlagDefaultValueAction).not.toHaveBeenCalled();
    });
  });
});
