import createMDX from '@next/mdx';

/** 
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@planria/design", "@planria/db", "@planria/util", "@planria/react-hooks"],
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);