import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export', // Enable static exports for Netlify
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Optional: Add if you have environment variables that need to be available at build time
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

export default nextConfig