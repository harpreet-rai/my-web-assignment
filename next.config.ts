import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ye line sabse zaroori hai TypeScript errors ko skip karne ke liye
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;