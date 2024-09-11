/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  reactStrictMode: true,
  transpilePackages: ["@planria/design", "@planria/db", "@planria/util", "@planria/react-hooks"],
};

export default nextConfig;
