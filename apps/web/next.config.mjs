/** 
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  reactStrictMode: true,
  transpilePackages: ["@planria/design", "@planria/db", "@planria/util", "@planria/react-hooks"],
  optimizeFonts: true,
  output: 'standalone',
};

export default nextConfig;
