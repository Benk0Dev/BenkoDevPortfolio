'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Media } from '@/data/projects'

export function Slider({ media }: { media: Media[] }) {
    const [index, setIndex] = useState(0)
    const [forwards, setForwards] = useState(true)
    const touchStart = useRef<number | null>(null)

    const many = media.length > 1

    function go(next: number) {
        setForwards(next > index)
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
                    <Frame item={media[index]} forwards={forwards} />

                    {media[index].caption && (
                        <p
                            className="slide-in label shrink-0 text-center text-subtle"
                            style={
                                {
                                    '--slide-from': forwards ? '1rem' : '-1rem',
                                } as React.CSSProperties
                            }
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

function Frame({ item, forwards }: { item: Media; forwards: boolean }) {
    // 7rem leaves a gap either side of the 2.5rem arrows, so a full width image
    // never runs up against them.
    const shape =
        'slide-in h-auto max-h-full w-auto min-h-0 max-w-full rounded-xl shadow-[var(--shadow-media)]'
    const from = { '--slide-from': forwards ? '1.5rem' : '-1.5rem' } as React.CSSProperties

    if (item.type === 'loop') {
        return (
            <video
                src={item.src}
                width={item.width}
                height={item.height}
                style={from}
                className={`${shape} object-contain`}
                muted
                autoPlay
                loop
                playsInline
            />
        )
    }

    return (
        // Imported image, so next/image already knows its real dimensions.
        <Image
            src={item.src}
            alt={item.alt}
            sizes="(max-width: 640px) 90vw, 44rem"
            style={from}
            className={`${shape} object-contain`}
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
