import {
  and as __and,
  db as __db,
  eq as __eq,
  isNotNull as __isNotNull,
} from "@planria/db";
import { accessTokens } from "@planria/db/datasource";
import { hash as __hash } from "@planria/util/crypto";
import { log as __log } from "@planria/util/logging";
import { expect, test, vi, type MockedFunction } from "vitest";

import { verifyAccessToken } from "./access_tokens.service";

vi.mock("@planria/db", () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnValue([{}]),
  },
  and: vi.fn(),
  eq: vi.fn(),
  isNotNull: vi.fn(),
}));
vi.mock("@planria/db/datasource", () => ({
  accessTokens: {},
}));
vi.mock("@planria/util/logging", () => ({
  log: {
    error: vi.fn(),
  },
}));

const db = __db as unknown as {
  select: MockedFunction<typeof __db.select>;
  from: MockedFunction<ReturnType<typeof __db.select>["from"]>;
  where: MockedFunction<
    ReturnType<ReturnType<typeof __db.select>["from"]>["where"]
  >;
  limit: MockedFunction<
    ReturnType<ReturnType<typeof __db.select>["from"]>["limit"]
  >;
};

const isNotNull = __isNotNull as MockedFunction<typeof __isNotNull>;
const and = __and as MockedFunction<typeof __and>;
const eq = __eq as MockedFunction<typeof __eq>;

const hash = __hash as MockedFunction<typeof __hash>;
const log = {
  error: __log.error as MockedFunction<typeof __log.error>,
};

test("verifyAccessToken() calls the following database statement functions: select(), from(), where(), and(), eq(), limit()", async function () {
  const environmentId = "environmentId";
  const projectId = "projectId";
  const token = "token";

  await verifyAccessToken({
    environmentId,
    projectId,
    token,
  });

  expect(db.select).toHaveBeenCalled();
  expect(db.from).toHaveBeenCalledWith(accessTokens);
  expect(db.where).toHaveBeenCalledWith(
    and(
      isNotNull(accessTokens.deletedAt),
      eq(accessTokens.environmentId, environmentId),
      eq(accessTokens.projectId, projectId),
      eq(accessTokens.token, hash(token))
    )
  );
  expect(db.limit).toHaveBeenCalledWith(1);
});

test("verifyAccessToken() calls log.error() for any error that occurs", async function () {
  db.limit.mockImplementation(() => {
    throw new Error();
  });

  await verifyAccessToken({
    environmentId: "environmentId",
    projectId: "projectId",
    token: "token",
  });

  expect(log.error).toHaveBeenCalled();
});
test("verifyAccessToken() returns false for any error that occurs", async function () {
  db.limit.mockImplementation(() => {
    throw new Error();
  });

  const isValid = await verifyAccessToken({
    environmentId: "environmentId",
    projectId: "projectId",
    token: "token",
  });

  expect(isValid).toBe(false);
});

test("verifyAccessToken() returns true for a valid access token", async function () {
  // @ts-expect-error Silence the following error: Argument of type '{ id: number; }[]' is not assignable to parameter of type 'Omit<PgSelectBase<string | undefined, SelectedFields, "partial", {} | Record<string, "not-null">, false, "limit", ({ [x: string]: unknown; } | { [x: string]: unknown; })[], { [x: string]: never; }>, "limit">'.
  db.limit.mockReturnValueOnce([{ id: 1 }]);

  const isValid = await verifyAccessToken({
    environmentId: "environmentId",
    projectId: "projectId",
    token: "token",
  });

  expect(isValid).toBe(true);
});

test("verifyAccessToken() returns false for an invalid access token", async function () {
  // @ts-expect-error Silence the following error: Argument of type '[]' is not assignable to parameter of type 'Omit<PgSelectBase<string | undefined, SelectedFields, "partial", {} | Record<string, "not-null">, false, "limit", ({ [x: string]: unknown; } | { [x: string]: unknown; })[], { [x: string]: never; }>, "limit">'.
  db.limit.mockReturnValueOnce([]);

  const isValid = await verifyAccessToken({
    environmentId: "environmentId",
    projectId: "projectId",
    token: "token",
  });

  expect(isValid).toBe(false);
});
