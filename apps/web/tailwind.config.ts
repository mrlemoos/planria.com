import sharedConfig from "@planria/tailwindcss";

const config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@planria/design/{src,dist}/*.{ts,tsx,js,jsx}",
  ],
  presets: [sharedConfig],
};

export default config;
