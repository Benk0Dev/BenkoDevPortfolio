import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { SITE } from '@/data/site'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

// Satori cannot read woff2, so these are the ttf cuts of the same faces.
const FONT_DIR = join(process.cwd(), 'app/og-fonts')

export function ogFonts() {
    return [
        {
            name: 'Geist',
            data: readFileSync(join(FONT_DIR, 'Geist-Medium.ttf')),
            weight: 500 as const,
            style: 'normal' as const,
        },
        {
            name: 'Geist Mono',
            data: readFileSync(join(FONT_DIR, 'GeistMono-Regular.ttf')),
            weight: 400 as const,
            style: 'normal' as const,
        },
    ]
}

/*
 * Picks the artwork for a project card: its cover, then the first still in its
 * folder, then nothing, which falls back to the typographic card.
 *
 * This reads the filesystem rather than the data, because an imported image
 * only carries its hashed output path, not the file it came from. Videos are
 * skipped entirely, a frame cannot be pulled out of an mp4 here.
 */
export function projectImage(slug: string) {
    // Folder name is the slug. Anything else is treated as having no artwork.
    const dir = join(process.cwd(), 'public/images/projects', slug)
    if (!existsSync(dir)) return null

    const stills = readdirSync(dir)
        .filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file))
        .sort()
    if (stills.length === 0) return null

    const chosen = stills.find((file) => file.startsWith('cover.')) ?? stills[0]
    const bytes = readFileSync(join(dir, chosen))
    const type = chosen.endsWith('.png') ? 'png' : 'jpeg'
    return `data:image/${type};base64,${bytes.toString('base64')}`
}

const BG = '#000000'
const FG = '#fafaf9'
const MUTED = '#b2b2b0'
const ACCENT = '#3d5afe'

/*
 * One card for every case. With artwork it sits on the right, without it the
 * type simply takes the full width, so a project with nothing to show still
 * looks deliberate rather than broken.
 */
export function OgCard({
    title,
    tagline,
    image,
    eyebrow,
}: {
    title: string
    tagline?: string
    image?: string | null
    eyebrow?: string
}) {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                backgroundColor: BG,
                fontFamily: 'Geist',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 72,
                    width: image ? '58%' : '100%',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                        style={{
                            width: 14,
                            height: 14,
                            borderRadius: 999,
                            backgroundColor: ACCENT,
                        }}
                    />
                    <div
                        style={{
                            fontFamily: 'Geist Mono',
                            fontSize: 20,
                            letterSpacing: 3,
                            color: MUTED,
                        }}
                    >
                        {eyebrow ?? SITE.name.toUpperCase()}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                        style={{
                            fontSize: title.length > 22 ? 68 : 88,
                            letterSpacing: -3,
                            color: FG,
                            lineHeight: 1.05,
                        }}
                    >
                        {title}
                    </div>
                    {tagline && (
                        <div
                            style={{
                                marginTop: 20,
                                fontSize: 30,
                                color: MUTED,
                                lineHeight: 1.35,
                            }}
                        >
                            {tagline}
                        </div>
                    )}
                </div>

                <div
                    style={{
                        fontFamily: 'Geist Mono',
                        fontSize: 20,
                        letterSpacing: 3,
                        color: MUTED,
                    }}
                >
                    {SITE.url.replace('https://', '').toUpperCase()}
                </div>
            </div>

            {image && (
                <div
                    style={{
                        display: 'flex',
                        width: '42%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 48,
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={image}
                        alt=""
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                            borderRadius: 16,
                        }}
                    />
                </div>
            )}
        </div>
    )
}
