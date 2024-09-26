#!/usr/bin/env node

import { log } from "@planria/util/logging";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { authenticate } from "./internals/commands/auth";

const cmd = yargs(hideBin(process.argv));

cmd
  .scriptName("planria")
  .command(
    "deploy",
    "Deploy the feature flags defined in your flags.ts file 🚀",
    {},
    async () => {}
  )
  .command(
    "auth",
    "Validate the access token, environment and project ID",
    {},
    async () => {
      const response = await authenticate();

      if (!response.authenticated) {
        log.error(
          [
            "The provided access token is either invalid or does not correspond to the provided project ID and environment",
            response.error,
          ].join("\n")
        );
        return;
      }

      log.info("You've been successfully authenticated! 🎉");
      log.info(`Project ID • ${response.credentials.projectId}`);
      log.info(`Environment ID • ${response.credentials.environmentId}`);
      log.info(`Access token • ${response.credentials.accessToken}`);
    }
  )
  .strictCommands()
  .demandCommand(1)
  .parse();
