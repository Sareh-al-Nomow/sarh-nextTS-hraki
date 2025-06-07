// i want to allow image form all the wold how
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      }, // Unsplash
      {
        protocol: "https",
        hostname: "**", // يسمح بكل النطاقات (غير آمن)
      },
    ],
  },
  // Other Next.js config options can go here
};

export default nextConfig;
