import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    // Without this, Next walks up and finds a lockfile outside the project.
    outputFileTracingRoot: __dirname,
    images: {
        formats: ['image/avif', 'image/webp'],
    },
}

export default nextConfig
