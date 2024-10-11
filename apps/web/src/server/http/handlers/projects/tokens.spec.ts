import { describe, expect, test, vi } from "vitest";

import {
  PLANRIA_ACCESS_TOKEN_HEADER_KEY,
  PLANRIA_ENVIRONMENT_ID_HEADER_KEY,
  PLANRIA_PROJECT_ID_HEADER_KEY,
} from "$/server/http/constants";

import { tokens } from "./tokens";

vi.mock("react", async (importOriginal) => {
  // We need to mock the cache function from React here because we're acting exclusively on the server
  // and Hono crashes the test cases due to the cache function not being available. If we were running
  // purely on Next.js, this error wouldn't happen, but as we're throwing some Hono atop of the cake,
  // this is necessary.
  const mod = await importOriginal<object>();
  return {
    ...mod,
    cache: vi
      .fn()
      .mockImplementation(
        (factory: (...args: unknown[]) => unknown) => factory,
      ),
  };
});

describe("given that a valid access token is provided", function () {
  describe("when the POST /tokens/verify is called", function () {
    test("then the response should be 200 OK", async function () {
      // Arrange
      const headers = new Headers(); // credentials for "Space Vanilla" in the preview environment (i.e. /projects/wjtwgxz7ayhmzm9ov0222mmm/access-tokens)
      headers.set(
        PLANRIA_ACCESS_TOKEN_HEADER_KEY,
        "20b1d473-b6ef-403f-b52e-a515834585b2",
      );
      headers.set(
        PLANRIA_ENVIRONMENT_ID_HEADER_KEY,
        "hoztm2gzwu77eie4da7gkguq",
      );
      headers.set(PLANRIA_PROJECT_ID_HEADER_KEY, "wjtwgxz7ayhmzm9ov0222mmm");
      const requestInit = { method: "POST", headers };

      // Act
      const response = await tokens.request("/verify", requestInit);
      const json = await response.json();

      console.log({ json });

      // Assert
      expect(json.isVerified).toBe(true);
      expect(json.fourInitialCharacters).toBe("20b1");
    });
  });
});
