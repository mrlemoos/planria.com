import { log } from "@planria/util/logging";
import cors from "cors";
import express, { json, raw, urlencoded } from "express";
import helmet from "helmet";

import { env, isDevelopment } from "./env";
import { verifyAccessTokenRequestHandler } from "./http/controllers/access_tokens.controller";
import { authGuard } from "./middlewares/auth";
import { logging } from "./middlewares/logging";
import { versionAware } from "./middlewares/version";

const server = express();

server.use(json());
server.use(raw());
server.use(
  cors({
    origin:
      // must accept requests from all origins since it is a public API
      "*",
  })
);
server.use(helmet());
server.use(urlencoded({ extended: true }));

server.use(authGuard());
server.use(logging());
server.use(versionAware());

server.post("/tokens/verify", verifyAccessTokenRequestHandler);

const PORT = env("PORT");
const NODE_ENV = env("NODE_ENV");

server.listen(PORT, function () {
  log.info(`Server is running on port :${PORT}`);
  log.info(`Environment: ${NODE_ENV}`);

  if (!isDevelopment()) {
    const lastCommit = {
      message: env("RAILWAY_GIT_COMMIT_MESSAGE"),
      sha: env("RAILWAY_GIT_COMMIT_SHA"),
    };
    log.info(`Commit: ${lastCommit.message} (${lastCommit.sha})`);
  }
});
