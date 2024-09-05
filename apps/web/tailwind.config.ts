import sharedConfig from "@planria/tailwindcss";

const config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@planria/design/{src,build}/*.{ts,tsx,js,jsx}",
  ],
  presets: [sharedConfig],
};

export default config;
