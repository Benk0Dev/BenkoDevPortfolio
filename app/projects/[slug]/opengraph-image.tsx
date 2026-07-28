import { ImageResponse } from 'next/og'
import { OG_CONTENT_TYPE, OG_SIZE, OgCard, ogFonts, projectImage } from '@/lib/og'
import { PROJECTS } from '@/data/projects'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams() {
    return PROJECTS.map((project) => ({ slug: project.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = PROJECTS.find((entry) => entry.slug === slug)

    return new ImageResponse(
        (
            <OgCard
                title={project?.title ?? 'Project'}
                tagline={project?.tagline}
                image={projectImage(slug)}
                eyebrow={project?.year}
            />
        ),
        { ...size, fonts: ogFonts() },
    )
}
