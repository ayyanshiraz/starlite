/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Increase Upload Limit
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', 
    },
  },

  // 2. Ignore Errors
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 3. Allow External Images (Fixed)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',  // 👈 Added this
        hostname: '**',    // 👈 Allows HTTP from anywhere
      },
    ],
  },
};

export default nextConfig;