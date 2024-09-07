import { auth, clerkMiddleware, currentUser } from "@clerk/nextjs/server";
import { formatDateToISOStringOrDefaultToNull } from "@planria/util/date";
import {
  InvalidObjectError,
  NetworkError,
  UnauthenticatedError,
  isZodError,
} from "@planria/util/errors";
import { isFailedToFetchError } from "@planria/util/http";
import { log } from "@planria/util/logging";
import type { NextMiddleware } from "next/server";

import {
  userSchema,
  userSessionSchema,
  type User,
  type UserSession,
} from "$/lib/schemas/user";

import { PUBLIC_EXACT_ROUTES, PUBLIC_NESTING_ROUTES } from "./constants";

/**
 * Retrieves the user session.
 * @returns A promise that resolves to a {@link UserSession | `UserSession`} object.
 * @throws If the session fails validation and parsing.
 * @throws If an unknown error occurs while fetching the session.
 */
export async function getSession(): Promise<UserSession> {
  const session = auth();

  function hasPermission(permission: string): boolean {
    return session.has({ permission });
  }

  function redirectUserToSignIn() {
    return session.redirectToSignIn();
  }

  try {
    const token = await session.getToken();

    return userSessionSchema.parse({
      hasPermission,
      redirectUserToSignIn,
      organisationId: session.orgId,
      userId: session.userId,
      userPermissionsInOrganisation: session.orgPermissions,
      userRole: session.orgRole,
      token,
    } as UserSession);
  } catch (error) {
    log.debug(
      `Failed to validate and parse the "session" symbol at asynchronous call getSession(). See the original error as follows: ${error}`
    );
    if (isZodError(error)) {
      throw new InvalidObjectError(
        'Failed to validate and parse the "session" symbol at asynchronous call getSession()',
        error
      );
    }
    throw new Error(
      'An unknown error occurred while fetching the "session" symbol at asynchronous call getSession()'
    );
  }
}

function isPathInPublicExactRoutes(
  path: string
): path is (typeof PUBLIC_EXACT_ROUTES)[number] {
  return PUBLIC_EXACT_ROUTES.includes(
    path as (typeof PUBLIC_EXACT_ROUTES)[number]
  );
}

function isPathInPublicNestingRoutes(path: string): boolean {
  return PUBLIC_NESTING_ROUTES.some((route) => path.startsWith(route));
}

/**
 * Defines the authentication middleware for the Clerk API.
 * It must be used in the `middleware.ts` file at the root of the source code.
 * See [`middleware.ts`](../../middleware.ts).
 */
export function createAuthMiddleware(): NextMiddleware {
  return clerkMiddleware((auth, request) => {
    const path = request.nextUrl.pathname.trim().toLowerCase();

    log.debug(`The request pathname is registered "${path}"`);

    if (isPathInPublicExactRoutes(path) || isPathInPublicNestingRoutes(path)) {
      log.debug(
        "The request URL is included in the PUBLIC_EXACT_ROUTES list or starts with any of the routes in the PUBLIC_NESTING_ROUTES list. Skipping the authentication middleware."
      );
    } else {
      log.debug(
        "The request URL is NOT included in either PUBLIC_EXACT_ROUTES nor PUBLIC_NESTING_ROUTES. Proceeding with the authentication middleware evaluation."
      );
      auth().protect();
    }
  });
}

function isContactVerified(status: string | undefined): status is "verified" {
  return status === "verified";
}

/**
 * Retrieves the user information after an asynchronous call to the Clerk API.
 * @returns The user information or null if the user is not authenticated.
 * @throws {NetworkError} If there is a network error while fetching the user information.
 * @throws {InvalidObjectError} If the user information fails to validate and parse.
 * @throws {UnauthenticatedError} If the user is not authenticated.
 */
export async function getUser() {
  try {
    const clerkUser = await currentUser();
    const user = userSchema.parse(
      clerkUser
        ? ({
            avatarURL: clerkUser.imageUrl,
            createdAt: formatDateToISOStringOrDefaultToNull(
              clerkUser.createdAt
            ),
            email: clerkUser.primaryEmailAddress?.emailAddress,
            firstName: clerkUser.firstName,
            fullName: clerkUser.fullName,
            hasAvatar: clerkUser.hasImage,
            hasVerifiedEmailAddress: isContactVerified(
              clerkUser.primaryEmailAddress?.verification?.status
            ),
            hasVerifiedPhoneNumber: isContactVerified(
              clerkUser.primaryPhoneNumber?.verification?.status
            ),
            lastName: clerkUser.lastName,
            lastSignInAt: formatDateToISOStringOrDefaultToNull(
              clerkUser.lastSignInAt
            ),
            updatedAt: formatDateToISOStringOrDefaultToNull(
              clerkUser.updatedAt
            ),
            userId: clerkUser.id,
            username: clerkUser.username,
          } satisfies User)
        : null
    );

    return user;
  } catch (error) {
    if (isFailedToFetchError(error)) {
      throw new NetworkError(
        'Failed to fetch the "user" symbol at asynchronous call getUser()'
      );
    }
    if (isZodError(error)) {
      throw new InvalidObjectError(
        'Failed to validate and parse the "user" symbol at asynchronous call getUser()',
        error
      );
    }
    throw new UnauthenticatedError("The user is not authenticated.");
  }
}

/**
 * Tries to get the user information.
 * @returns A promise that resolves to the user information if successful, or null if an error occurs.
 */
export async function tryGetUser(): Promise<User | null> {
  try {
    return await getUser();
  } catch (error) {
    log.debug(
      `An error occurred while fetching the user information at tryGetUser(). See the error as follows: ${error}`
    );
    return null;
  }
}
