import type { Config } from "tailwindcss";
import sharedConfig from "@planria/tailwindcss";

const config: Pick<Config, "content" | "presets"> = {
  content: [
    "./stories/**/*.tsx",
    "./node_modules/@planria/design/{src,build}/*.{ts,tsx,js,jsx}",
  ],
  presets: [sharedConfig],
};

export default config;
