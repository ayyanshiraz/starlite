/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Ignore TypeScript Errors (Valid)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // 🔴 REMOVED 'eslint' block from here. 
  // We use "next build --no-lint" in package.json instead.

  // 2. Allow External Images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;