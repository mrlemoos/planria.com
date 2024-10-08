import { MockedFunction, expect, test, vi } from "vitest";

import { useUser as __useClerkUser } from "@clerk/nextjs";
import { formatDateToISOStringOrDefaultToNull as __formatDateToISOStringOrDefaultToNull } from "@planria/util/date";

import { renderHook } from "$/lib/extensions/testing-library+ext";

import { useUser } from "./user";

vi.mock("@clerk/nextjs", () => ({
  useUser: vi.fn().mockReturnValue({}),
}));
const useClerkUser = __useClerkUser as MockedFunction<typeof __useClerkUser>;

vi.mock("@planria/util/date", () => ({
  formatDateToISOStringOrDefaultToNull: vi.fn().mockReturnValue("mocked-date"),
}));
const formatDateToISOStringOrDefaultToNull =
  __formatDateToISOStringOrDefaultToNull as MockedFunction<
    typeof __formatDateToISOStringOrDefaultToNull
  >;
vi.mock("../schemas/user", () => ({
  userSchema: {
    parse: vi.fn().mockImplementation((value) => value),
  },
}));

test("useUser() should parse the user object from the authentication provider for a signed-in user", function () {
  const clerkUser = {
    imageUrl: "https://example.com/avatar.jpg",
    createdAt: new Date("2021-01-01"),
    primaryEmailAddress: { emailAddress: "user@domain.com" },
    firstName: "John",
    fullName: "John Doe",
    lastName: "Doe",
    hasImage: true,
    hasVerifiedEmailAddress: true,
    hasVerifiedPhoneNumber: true,
    lastSignInAt: new Date("2021-01-02"),
    updatedAt: new Date("2021-01-03"),
    id: "user-id",
    username: "john.doe",
  } as unknown as NonNullable<ReturnType<typeof useClerkUser>["user"]>;
  useClerkUser.mockReturnValueOnce({
    isLoaded: true,
    isSignedIn: true,
    user: clerkUser,
  });

  const {
    result: {
      current: { user },
    },
  } = renderHook(() => useUser());

  expect(user).toEqual({
    avatarURL: "https://example.com/avatar.jpg",
    createdAt: "mocked-date",
    email: "user@domain.com",
    firstName: "John",
    fullName: "John Doe",
    lastName: "Doe",
    hasAvatar: true,
    hasVerifiedEmailAddress: true,
    hasVerifiedPhoneNumber: true,
    lastSignInAt: "mocked-date",
    updatedAt: "mocked-date",
    userId: "user-id",
    username: "john.doe",
  });
});

test("useUser() should return null for a signed-out or not loaded user", function () {
  const clerkUser = null;
  useClerkUser.mockReturnValueOnce({
    isLoaded: true,
    isSignedIn: false,
    user: null,
  });

  const {
    result: {
      current: { user },
    },
  } = renderHook(() => useUser());

  expect(user).toBeNull();
});
