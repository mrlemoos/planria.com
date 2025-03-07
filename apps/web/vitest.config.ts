import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    reporters: ["verbose"],
  },
  resolve: {
    alias: {
      $: path.resolve(__dirname, "./src"),
    },
  },
});
