import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // devIndicators: {
  //   appIsrStatus: false,
  //   // buildActivity: false,
  // },
  images: {
    remotePatterns: [{ hostname: "images.pexels.com" }],
  },
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
};

export default nextConfig;
