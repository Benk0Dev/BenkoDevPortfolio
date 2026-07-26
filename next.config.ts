import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    // Without this, Next walks up and finds a lockfile outside the project.
    outputFileTracingRoot: __dirname,
    // A dev server and a build cannot share one output directory, and neither
    // can two dev servers. Set NEXT_DIST_DIR to run one alongside another
    // without either clobbering the other.
    distDir: process.env.NEXT_DIST_DIR || '.next',
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
