import { cache } from "react";

import { db, eq, type InferInsertModel } from "@planria/db";
import { accessTokens, environments } from "@planria/db/datasource";
import { cuid } from "@planria/util/crypto";
import { log } from "@planria/util/logging";

import type { AccessToken } from "$/lib/schemas/projects/access-tokens";
import type { AccessTokenAndEnvironment } from "$/lib/schemas/projects/access-tokens+environment";

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
        .where(eq(accessTokens.projectId, projectId))
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
