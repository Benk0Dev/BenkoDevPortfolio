'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Project } from '@/data/projects'

type Media = NonNullable<Project['media']>

export function Slider({ media }: { media: Media }) {
    const [index, setIndex] = useState(0)
    const touchStart = useRef<number | null>(null)

    const many = media.length > 1
    const go = (next: number) => setIndex((next + media.length) % media.length)

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
                <Frame item={media[index]} />

                {many && (
                    <>
                        <Arrow side="left" onClick={() => go(index - 1)} />
                        <Arrow side="right" onClick={() => go(index + 1)} />
                    </>
                )}
            </div>

            {many && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    {media.map((item, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            aria-current={i === index}
                            className={`h-1 cursor-pointer rounded-full transition-all duration-200 ease-site ${
                                i === index ? 'w-5 bg-accent' : 'w-1 bg-ghost hover:bg-faint'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

function Frame({ item }: { item: Media[number] }) {
    // Capped so the image never sits under the arrows.
    const size = 'max-h-full max-w-[calc(100%-5rem)]'

    if (!item.src) {
        return (
            <div className={`${size} h-full w-full rounded-xl border-[0.5px] border-line bg-card`} />
        )
    }

    if (item.type === 'loop') {
        return (
            <video
                src={item.src}
                className={`${size} object-contain`}
                muted
                autoPlay
                loop
                playsInline
            />
        )
    }

    return (
        <Image
            src={item.src}
            alt={item.alt}
            width={1600}
            height={1200}
            sizes="(max-width: 640px) 90vw, 44rem"
            className={`${size} object-contain`}
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
            className={`absolute top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-chip text-muted transition-colors duration-200 hover:text-fg ${
                side === 'left' ? 'left-0' : 'right-0'
            }`}
        >
            <Icon size={18} />
        </button>
    )
}
