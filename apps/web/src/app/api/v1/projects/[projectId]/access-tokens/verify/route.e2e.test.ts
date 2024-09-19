import { HttpStatusCode, httpClient } from "@planria/util/http";
import { describe, expect, test } from "vitest";

describe("POST /api/v1/projects/[projectId]/access-tokens/verify", function () {
  test("should verify and confirm the access token is valid", async function () {
    // Arrange
    const environmentId = "hoztm2gzwu77eie4da7gkguq"; // e2e Testing in Spaceship Vanilla
    const token = "d27efb1f-fbe1-4df6-bd27-6d9aa273b917";
    const projectId = "wjtwgxz7ayhmzm9ov0222mmm";

    // Act
    const response = await httpClient.post(
      `http://localhost:3000/api/v1/projects/${projectId}/access-tokens/verify?token=${token}&environmentId=${environmentId}`
    );

    // Assert
    expect(response.status).toBe(HttpStatusCode.OK);
  });
});
