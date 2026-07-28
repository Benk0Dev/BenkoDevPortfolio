import { ImageResponse } from 'next/og'
import { OG_CONTENT_TYPE, OG_SIZE, OgCard, ogFonts } from '@/lib/og'
import { SITE } from '@/data/site'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = `${SITE.person}, ${SITE.jobTitle}`

export default function Image() {
    return new ImageResponse(
        (
            <OgCard
                title={SITE.person}
                tagline={`${SITE.jobTitle} at ${SITE.employer}.`}
                eyebrow={SITE.name.toUpperCase()}
            />
        ),
        { ...size, fonts: ogFonts() },
    )
}
