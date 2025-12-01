/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🟢 1. Increase Upload Limit (Fixes the 1MB Error)
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase to 10MB (or more if needed)
    },
  },

  // 2. Ignore TypeScript/ESLint Errors (Keep this for Vercel deployment)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 3. Allow External Images
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