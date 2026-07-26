import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    // Without this, Next walks up and finds a lockfile outside the project.
    outputFileTracingRoot: __dirname,
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    // A redirect rather than a route handler, so nothing has to render on
    // demand and every route stays static.
    async redirects() {
        return [{ source: '/cv', destination: '/cv.pdf', permanent: false }]
    },
}

export default nextConfig
