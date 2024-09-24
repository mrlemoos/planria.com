#!/usr/bin/env node

import { log } from "@planria/util/logging";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { authenticate } from "./internals/commands/auth";

const cmd = yargs(hideBin(process.argv));

cmd
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
      }
    }
  )
  .strictCommands()
  .demandCommand(1)
  .parse();
