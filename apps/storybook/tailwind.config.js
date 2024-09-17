import sharedConfig from "@planria/tailwindcss";

const config = {
  content: [
    "./stories/**/*.tsx",
    "./node_modules/@planria/design/{src,build}/*.{ts,tsx,js,jsx}",
    "./globals.css",
    "./.storybook/preview.tsx",
  ],
  important: true,
  presets: [sharedConfig],
};

export default config;
