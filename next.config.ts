import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

/** This repo — avoids Turbopack picking a parent lockfile (e.g. ~/package-lock.json). */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
