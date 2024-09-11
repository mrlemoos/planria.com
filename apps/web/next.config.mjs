/** 
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@planria/design", "@planria/db", "@planria/util", "@planria/react-hooks"],
};

export default nextConfig;
