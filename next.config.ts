import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // disable image optimization to allow images from any domain
  },
  // Add other Next.js config options here if needed
};

export default withNextIntl(nextConfig);
