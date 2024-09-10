import { cache } from "react";

import { db } from "@planria/db";
import { userPaymentAccounts, users } from "@planria/db/datasource";
import { date } from "@planria/util/date";
import { log } from "@planria/util/logging";
import { InferInsertModel, eq } from "drizzle-orm";

import { getUser } from "$/lib/auth/server";
import type { UserPaymentAccount } from "$/lib/schemas/user";

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

export const fetchUserPaymentAccountByUserId = cache(
  async (userId: string): Promise<UserPaymentAccount | null> => {
    try {
      const [foundUserPaymentAccount] = await db
        .select()
        .from(userPaymentAccounts)
        .where(eq(userPaymentAccounts.userId, userId))
        .limit(1);
      return foundUserPaymentAccount ?? null;
    } catch (error) {
      log.error(
        `An error occurred at fetchUserPaymentAccount("${userId}"). We did not find the user payment account. See the original error: ${error}`
      );
      return null;
    }
  }
);

export const fetchUserPaymentAccountBySubscriptionId = cache(
  async (subscriptionId: string) => {
    try {
      const [foundUserPaymentAccount] = await db
        .select()
        .from(userPaymentAccounts)
        .where(eq(userPaymentAccounts.stripeSubscriptionId, subscriptionId))
        .limit(1);
      return foundUserPaymentAccount ?? null;
    } catch (error) {
      log.error(
        `An error occurred at fetchUserPaymentAccountBySubscriptionId("${subscriptionId}"). We did not find the user payment account. See the original error: ${error}`
      );
      return null;
    }
  }
);

export async function createUserPaymentAccount(
  data: InferInsertModel<typeof userPaymentAccounts>
): Promise<UserPaymentAccount | null> {
  try {
    const [createdUserPaymentAccount] = await db
      .insert(userPaymentAccounts)
      .values(data)
      .returning();
    return createdUserPaymentAccount;
  } catch (error) {
    log.error(
      `An error occurred at createUserPaymentAccount(). We did not create the user payment account. See the original error: ${error}`
    );
    return null;
  }
}

export async function updateUserPaymentAccount(
  paymentAccountId: string,
  data: Pick<
    Partial<InferInsertModel<typeof userPaymentAccounts>>,
    | "stripeCurrentPeriodEnd"
    | "stripeCustomerId"
    | "stripePriceId"
    | "stripeSubscriptionId"
  >
): Promise<UserPaymentAccount | null> {
  try {
    const [updatedUserPaymentAccount] = await db
      .update(userPaymentAccounts)
      .set(data)
      .where(eq(userPaymentAccounts.paymentAccountId, paymentAccountId))
      .returning();
    return updatedUserPaymentAccount;
  } catch (error) {
    log.error(
      `An error occurred at updateUserPaymentAccount(). We did not update the user payment account. See the original error: ${error}`
    );
    return null;
  }
}

export async function updateUserPaymentAccountBySubscriptionId(
  subscriptionId: string,
  data: Pick<
    Partial<InferInsertModel<typeof userPaymentAccounts>>,
    | "stripeCurrentPeriodEnd"
    | "stripeCustomerId"
    | "stripePriceId"
    | "stripeSubscriptionId"
  >
): Promise<UserPaymentAccount | null> {
  try {
    const [updatedUserPaymentAccount] = await db
      .update(userPaymentAccounts)
      .set(data)
      .where(eq(userPaymentAccounts.stripeSubscriptionId, subscriptionId))
      .returning();
    return updatedUserPaymentAccount;
  } catch (error) {
    log.error(
      `An error occurred at updateUserPaymentAccountBySubscriptionId(). We did not update the user payment account. See the original error: ${error}`
    );
    return null;
  }
}

export async function hasUserValidSubscription(
  userId: string
): Promise<{ isValid: boolean; paymentAccountId?: string }> {
  try {
    const [foundPaymentAccount] = await db
      .select()
      .from(userPaymentAccounts)
      .where(eq(userPaymentAccounts.userId, userId))
      .limit(1);

    if (!foundPaymentAccount) {
      return {
        isValid: false,
      };
    }

    const isSubscriptionValid =
      !!foundPaymentAccount.stripeCurrentPeriodEnd &&
      date(foundPaymentAccount.stripeCurrentPeriodEnd).toDate().getTime() +
        84_400_000 /* aka a day in milliseconds */ >
        Date.now();

    return {
      isValid: isSubscriptionValid,
      paymentAccountId: foundPaymentAccount.paymentAccountId,
    };
  } catch (error) {
    log.error(
      `An error occurred at hasUserValidSubscription("${userId}"). We did not find the user payment account. See the original error: ${error}`
    );
    return { isValid: false };
  }
}
