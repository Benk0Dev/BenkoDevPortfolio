import type { MetadataRoute } from 'next'
import { PROJECTS } from '@/data/projects'
import { SITE } from '@/data/site'

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date()

    return [
        {
            url: SITE.url,
            lastModified,
            changeFrequency: 'monthly',
            priority: 1,
        },
        // Every project has a page, archive entries included.
        ...PROJECTS.map((project) => ({
            url: `${SITE.url}/projects/${project.slug}`,
            lastModified,
            changeFrequency: 'yearly' as const,
            priority: 0.8,
        })),
    ]
}
