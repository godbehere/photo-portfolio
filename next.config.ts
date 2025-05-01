import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/photo-portfolio-35e2d.firebasestorage.app/**',
      },
    ],
  },
};

module.exports = nextConfig;