import { redirect as __redirect } from "next/navigation";
import { MockedFunction, expect, test, vi } from "vitest";

import { redirectToOnboarding } from "./navigation";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

const redirect = __redirect as MockedFunction<typeof __redirect>;

test("should call redirect for /onboarding", function () {
  const path = "/onboarding";

  redirectToOnboarding();

  expect(redirect).toHaveBeenCalledWith(path);
});
