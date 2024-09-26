import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: ["src"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  tsconfig: "tsconfig.json",
  ...options,
}));
