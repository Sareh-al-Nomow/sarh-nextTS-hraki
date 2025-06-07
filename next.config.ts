import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com", // Unsplash
      "plus.unsplash.com", // Unsplash (alternative)
      "lh3.googleusercontent.com", // Google avatars (for team photos)
      "randomuser.me", // Random user avatars
      "your-cdn-domain.com", // Add your own CDN if needed
    ],
  },
  // Other Next.js config options can go here
};

export default nextConfig;
