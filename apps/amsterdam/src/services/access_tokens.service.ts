import { and, db, eq, isNotNull } from "@planria/db";
import { accessTokens } from "@planria/db/datasource";
import { hash } from "@planria/util/crypto";
import { log } from "@planria/util/logging";

export async function verifyAccessToken({
  environmentId,
  projectId,
  token,
}: {
  environmentId: string;
  projectId: string;
  token: string;
}) {
  try {
    const [foundAccessToken] = await db
      .select()
      .from(accessTokens)
      .where(
        and(
          isNotNull(accessTokens.deletedAt),
          eq(accessTokens.environmentId, environmentId),
          eq(accessTokens.projectId, projectId),
          eq(accessTokens.token, hash(token))
        )
      )
      .limit(1);
    const isValid = !!foundAccessToken;
    return isValid;
  } catch (error) {
    log.error(
      `An error occurred at verifyAccessToken(). See the original error as follows: ${error}`
    );
    return false;
  }
}
