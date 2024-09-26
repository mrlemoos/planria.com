import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    reporters: ["verbose"],
  },
  define: {
    "process.env": {},
  },
});
