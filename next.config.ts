import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Adding SVGR for importing SVG files as React components
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  /* config options here */
  output: "export",
};

export default nextConfig;
