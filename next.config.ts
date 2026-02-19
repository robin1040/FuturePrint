import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Required for GitHub Pages static site generation
  images: {
    unoptimized: true, // Required for static export (no Next.js image server)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      }
    ],
  },
};

export default nextConfig;
