'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Media } from '@/data/projects'

export function Slider({ media }: { media: Media[] }) {
    const [index, setIndex] = useState(0)
    const [forwards, setForwards] = useState(true)
    // Sideways entry is a response to navigating. The first frame just appears,
    // so it rises like every other piece of content on the site.
    const [navigated, setNavigated] = useState(false)
    const [loadedIndex, setLoadedIndex] = useState<number | null>(null)
    const touchStart = useRef<number | null>(null)

    const many = media.length > 1
    const loaded = loadedIndex === index

    function go(next: number) {
        setForwards(next > index)
        setNavigated(true)
        setIndex((next + media.length) % media.length)
    }

    function jump(next: number) {
        if (next === index) return
        go(next)
    }

    useEffect(() => {
        if (!many) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') go(index - 1)
            if (e.key === 'ArrowRight') go(index + 1)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    })

    function onTouchEnd(e: React.TouchEvent) {
        if (touchStart.current === null) return
        const delta = e.changedTouches[0].clientX - touchStart.current
        touchStart.current = null
        if (Math.abs(delta) < 40) return
        go(delta < 0 ? index + 1 : index - 1)
    }

    const entry = navigated ? 'slide-in' : 'rise-in'
    const slideFrom = (distance: string) =>
        ({ '--slide-from': forwards ? distance : `-${distance}` }) as React.CSSProperties

    return (
        <div>
            {/* Frameless. Fixed height so nothing shifts between slides, and the
                arrows sit on the container edges rather than the image, so they
                stay put whatever the aspect ratio. */}
            <div
                className="relative flex h-[clamp(16rem,45vh,30rem)] items-center justify-center"
                onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
                onTouchEnd={onTouchEnd}
            >
                {/* The caption is a sibling of the media inside a column that
                    shrink wraps it, so it sits directly under the picture
                    whatever its shape. Sitting outside the fixed height
                    container left a gap under anything landscape.

                    Keyed on the index so React remounts the pair and the entry
                    animation replays on every change. */}
                <div
                    key={index}
                    className="flex h-full max-w-[calc(100%-7rem)] flex-col items-center justify-center gap-4"
                >
                    <Frame
                        item={media[index]}
                        entry={entry}
                        style={slideFrom('1.5rem')}
                        loaded={loaded}
                        onLoad={() => setLoadedIndex(index)}
                        priority={index === 0}
                        hasCaption={Boolean(media[index].caption)}
                    />

                    {/* Always rendered when the slide has one, so the frame
                        keeps the same geometry throughout. Only its ink waits
                        for the image, otherwise it sits alone in the middle of
                        an empty frame and then jumps. Hidden by visibility, not
                        opacity, which the entry animation would override. */}
                    {media[index].caption && (
                        <p
                            className={`${entry} label h-4 shrink-0 text-center leading-4 text-subtle ${
                                loaded ? 'visible' : 'invisible'
                            }`}
                            style={slideFrom('1rem')}
                        >
                            {media[index].caption}
                        </p>
                    )}
                </div>

                {many && (
                    <>
                        <Arrow side="left" onClick={() => go(index - 1)} />
                        <Arrow side="right" onClick={() => go(index + 1)} />
                    </>
                )}
            </div>

            {many && (
                <div className="mt-4 flex items-center justify-center">
                    {media.map((item, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => jump(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            aria-current={i === index}
                            className="group/dot flex size-6 cursor-pointer items-center justify-center"
                        >
                            {/* The bar is small, the button around it is not. */}
                            <span
                                className={`h-1 rounded-full transition-all duration-200 ease-site ${
                                    i === index
                                        ? 'w-5 bg-accent'
                                        : 'w-1 bg-ghost group-hover/dot:bg-faint'
                                }`}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

function Frame({
    item,
    entry,
    style,
    loaded,
    onLoad,
    priority,
    hasCaption,
}: {
    item: Media
    entry: string
    style: React.CSSProperties
    loaded: boolean
    onLoad: () => void
    priority: boolean
    hasCaption: boolean
}) {
    // Every media item carries its real dimensions, so the box is the right
    // shape before a single byte of the image has arrived.
    const ratio = item.type === 'loop' ? item.width / item.height : item.src.width / item.src.height

    /*
     * The media sizes itself, directly inside the column, which is what keeps
     * rounded corners on the picture rather than on a box around it.
     *
     * An unloaded image has no pixels, so auto width collapses to Chrome's 2px
     * placeholder and the frame had no size at all until the image arrived.
     * That is why the caption used to sit alone in the middle and then jump.
     * Until it loads the height is pinned to the space available and the width
     * comes from the aspect ratio, which reserves the real box. Once loaded the
     * pin is dropped and the two maxima take over.
     *
     * Until it loads the element paints as a card coloured block, so the
     * placeholder is the media's own box and cannot be the wrong shape.
     */
    const box = `${entry} h-auto w-auto max-w-full shrink-0 rounded-xl shadow-[var(--shadow-media)] object-contain ${
        hasCaption ? 'max-h-[calc(100%-2rem)]' : 'max-h-full'
    } ${loaded ? '' : 'animate-pulse border-[0.5px] border-line bg-card'}`

    const available = hasCaption ? 'calc(100% - 2rem)' : '100%'
    const sizing = {
        ...style,
        aspectRatio: ratio,
        ...(loaded ? {} : { height: available }),
    }

    if (item.type === 'loop') {
        return (
            <video
                src={item.src}
                width={item.width}
                height={item.height}
                style={sizing}
                className={box}
                onLoadedData={onLoad}
                muted
                autoPlay
                loop
                playsInline
            />
        )
    }

    return (
        // Imported image, so next/image already knows its real size.
        <Image
            src={item.src}
            alt={item.alt}
            sizes="(max-width: 640px) 90vw, 44rem"
            priority={priority}
            style={sizing}
            className={box}
            onLoad={onLoad}
        />
    )
}

function Arrow({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
    const Icon = side === 'left' ? ChevronLeft : ChevronRight

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={side === 'left' ? 'Previous slide' : 'Next slide'}
            className={`absolute top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-chip text-muted transition-colors duration-200 hover:bg-chip-hover hover:text-fg ${
                side === 'left' ? 'left-0' : 'right-0'
            }`}
        >
            <Icon size={18} />
        </button>
    )
}
