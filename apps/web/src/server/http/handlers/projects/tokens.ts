import { Hono } from "hono";
import { HttpStatusCode } from "@planria/util/http";
import { handleException } from "@planria/util/errors";

import { verifyAccessToken } from "$/server/data/projects/access-tokens";
import {
  PLANRIA_ACCESS_TOKEN_HEADER_KEY,
  PLANRIA_ENVIRONMENT_ID_HEADER_KEY,
  PLANRIA_PROJECT_ID_HEADER_KEY,
} from "$/server/http/constants";

const tokens = new Hono();

tokens.post("/verify", async (c) => {
  const accessToken = c.req.header(PLANRIA_ACCESS_TOKEN_HEADER_KEY)!;
  const projectId = c.req.header(PLANRIA_PROJECT_ID_HEADER_KEY)!;
  const environmentId = c.req.header(PLANRIA_ENVIRONMENT_ID_HEADER_KEY)!;

  const tokenObj = await verifyAccessToken({
    token: accessToken,
    projectId,
    environmentId,
  });

  if (!tokenObj) {
    c.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
    return c.json(
      handleException(
        "token.object.not.found",
        "The token object corresponding to the provided access token was not found or was not able to be queried.",
      ),
    );
  }

  c.status(HttpStatusCode.OK);
  return c.json({
    isVerified: true,
    fourInitialCharacters: tokenObj.tokenFourInitialCharacters,
  });
});

export { tokens };
