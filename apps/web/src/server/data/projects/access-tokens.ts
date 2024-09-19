import { cache } from "react";

import { and, db, eq, isNull, type InferInsertModel } from "@planria/db";
import { accessTokens, environments } from "@planria/db/datasource";
import { cuid, hash } from "@planria/util/crypto";
import { log } from "@planria/util/logging";

import type { AccessToken } from "$/lib/schemas/projects/access-tokens";
import type { AccessTokenAndEnvironment } from "$/lib/schemas/projects/access-tokens+environment";

/**
 * Verifies the access token by checking if the access token exists in the database.
 */
export async function verifyAccessToken(
  payload: Pick<AccessToken, "projectId" | "token" | "environmentId">
): Promise<AccessToken | null> {
  try {
    const [foundAccessToken] = await db
      .select()
      .from(accessTokens)
      .where(
        and(
          eq(accessTokens.projectId, payload.projectId),
          eq(accessTokens.token, hash(payload.token)),
          eq(accessTokens.environmentId, payload.environmentId),
          isNull(accessTokens.deletedAt)
        )
      )
      .limit(1);
    log.debug(
      `The encrypted access token verified for project ${payload.projectId} and environment ${payload.environmentId}`
    );
    return foundAccessToken;
  } catch (error) {
    log.error(
      `An error occurred at verifyAccessToken(${JSON.stringify(
        payload
      )}) due to the following: ${error}`
    );
    return null;
  }
}

/**
 * Fills the {@link accessTokens.deletedAt | `deletedAt`} field with the current date and time so
 * that the access token is soft deleted. Returns the date and time when the access token was
 * soft deleted.
 *
 * Note: This function does not actually drop the access token from the database.
 */
export async function softDeleteAccessTokenById(
  accessTokenId: string
): Promise<{ deletedAt: string } | null> {
  try {
    const deletedAt = new Date().toISOString();
    const [{ deletionAt }] = await db
      .update(accessTokens)
      .set({
        deletedAt,
      })
      .where(eq(accessTokens.accessTokenId, accessTokenId))
      .returning({
        deletionAt: accessTokens.deletedAt,
      });
    const hasBeenSoftDeleted = deletionAt !== null;

    if (!hasBeenSoftDeleted) {
      log.error(
        `Failed to soft delete the access token at softDeleteAccessTokenById(${accessTokenId}). Please check the logs for more information.`
      );
      return null;
    }

    return { deletedAt };
  } catch (error) {
    log.error(
      `An error occurred at deleteAccessTokenById(${accessTokenId}) due to the following: ${error}`
    );
    return null;
  }
}

/**
 * Creates an access token and returns it with the environment name.
 */
export async function createAccessToken(
  data: Pick<
    InferInsertModel<typeof accessTokens>,
    | "token"
    | "environmentId"
    | "projectId"
    | "tokenFourInitialCharacters"
    | "displayName"
  >
): Promise<AccessToken | null> {
  try {
    const [createdAccessToken] = await db
      .insert(accessTokens)
      .values({
        ...data,
        accessTokenId: cuid(),
      })
      .returning();

    return createdAccessToken;
  } catch (error) {
    log.error(
      `Failed to create the access token at createAccessToken() due to:`,
      error
    );
    return null;
  }
}

/**
 * Fetches and returns access tokens by project ID.
 */
export const fetchAccessTokensWithEnvironmentByProjectId = cache(
  async (projectId: string): Promise<AccessTokenAndEnvironment[]> => {
    try {
      const foundProjects = await db
        .select({
          accessTokenId: accessTokens.accessTokenId,
          projectId: accessTokens.projectId,
          token: accessTokens.token,
          environmentId: accessTokens.environmentId,
          createdAt: accessTokens.createdAt,
          updatedAt: accessTokens.updatedAt,
          tokenFourInitialCharacters: accessTokens.tokenFourInitialCharacters,
          displayName: accessTokens.displayName,
          // added by the INNER JOIN
          environmentName: environments.name,
        })
        .from(accessTokens)
        .where(
          and(
            eq(accessTokens.projectId, projectId),
            isNull(accessTokens.deletedAt)
          )
        )
        .innerJoin(
          environments,
          eq(accessTokens.environmentId, environments.environmentId)
        );
      return foundProjects;
    } catch (error) {
      log.error(
        `Failed to fetch the access tokens at fetchAccessTokens("${projectId}") due to:`,
        error
      );
      return [];
    }
  }
);
