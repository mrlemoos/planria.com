"use client";

import { useMemo } from "react";

import { useUser as useClerkUser } from "@clerk/nextjs";
import { formatDateToISOStringOrDefaultToNull } from "@planria/util/date";

import { userSchema, type User } from "$/lib/schemas/user";

/**
 * Custom hook that returns user-related data.
 */
export function useUser(): {
  /**
   * A boolean indicating whether the user data is loaded.
   */
  isLoaded: boolean;
  /**
   * A boolean indicating whether the user is signed in. It is `undefined` when loading.
   */
  isSignedIn: boolean | undefined;
  /**
   * The user object containing user details. It is `null` when the user is not signed in or when loading.
   */
  user: User | null;
} {
  const { isLoaded, isSignedIn, user: clerkUser } = useClerkUser();

  const user = useMemo<User | null>(
    () =>
      clerkUser
        ? userSchema.parse({
            avatarURL: clerkUser.imageUrl,
            createdAt: formatDateToISOStringOrDefaultToNull(
              clerkUser.createdAt
            ),
            email: clerkUser.primaryEmailAddress?.emailAddress,
            firstName: clerkUser.firstName,
            fullName: clerkUser.fullName,
            lastName: clerkUser.lastName,
            hasAvatar: clerkUser.hasImage,
            hasVerifiedEmailAddress: clerkUser.hasVerifiedEmailAddress,
            hasVerifiedPhoneNumber: clerkUser.hasVerifiedPhoneNumber,
            lastSignInAt: formatDateToISOStringOrDefaultToNull(
              clerkUser.lastSignInAt
            ),
            updatedAt: formatDateToISOStringOrDefaultToNull(
              clerkUser.updatedAt
            ),
            userId: clerkUser.id,
            username: clerkUser.username,
          } satisfies User)
        : null,
    [clerkUser]
  );

  return { isLoaded, isSignedIn, user };
}
