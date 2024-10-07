import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    reporters: ["verbose"],
  },
  resolve: {
    alias: {
      $: path.resolve(__dirname, "./src"),
    },
  },
});
