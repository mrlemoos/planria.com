import { NextRequest } from "next/server";
import { expect, test, vi } from "vitest";

import { parseBodyJSON } from "./server";

test("parseBodyJSON() should call json() method", async function () {
  // Arrange
  const request = {
    json: vi.fn().mockResolvedValue({}),
  } as unknown as NextRequest;

  // Act
  await parseBodyJSON({ from: request });

  // Assert
  expect(request.json).toHaveBeenCalled();
});

test("parseBodyJSON() should return a tuple for an object and null for the empty error", async function () {
  // Arrange
  const request = {
    json: vi.fn().mockResolvedValue({}),
  } as unknown as NextRequest;

  // Act
  const [body, error] = await parseBodyJSON({ from: request });

  // Assert
  expect(body).toEqual({});
  expect(error).toBeNull();
});
