import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // --- ADD THIS 'images' BLOCK ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      // You can add more domains here as you get real product images
      // {
      //   protocol: 'https',
      //   hostname: 'your-real-cms-domain.com',
      // },
    ],
  },
  // ---------------------------------
};


export default nextConfig;