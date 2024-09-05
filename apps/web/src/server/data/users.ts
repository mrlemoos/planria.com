import { db } from "@planria/db";
import { users } from "@planria/db/datasource";
import { log } from "@planria/util/logging";
import { eq } from "drizzle-orm";

import { getUser } from "$/lib/auth/server";

/**
 * Replicates the current signed-in user if the user doesn't have a replica already.
 */
export async function replicateCurrentUser() {
  const user = await getUser();
  try {
    const [foundUser] = await db
      .select()
      .from(users)
      .where(eq(users.userId, user.userId));

    if (foundUser?.privateId) {
      return foundUser;
    }

    const [createdUser] = await db
      .insert(users)
      .values({
        // @ts-expect-error
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user.userId,
        username: user.username,
        avatarURL: user.avatarURL,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
      .returning();
    return createdUser;
  } catch (error) {
    log.error(
      `Failed to replicate user at replicateCurrentUser() method with the userId ${user.userId}. See the original error: ${error}`
    );
    return null;
  }
}
