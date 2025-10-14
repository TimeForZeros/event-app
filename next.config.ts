import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  images: {remotePatterns: [new URL(`${process.env.AWS_ENDPOINT}/**`)]
  }

};

export default nextConfig;
