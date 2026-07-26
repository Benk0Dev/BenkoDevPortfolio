'use client'

import { useEffect, useRef, useState } from 'react'

/*
 * Counts a number up once it scrolls into view. Hand rolled rather than pulled
 * from an animation library, this is the only place on the site that needs it
 * and the library costs 47kb.
 *
 * The server renders the final value, so it is correct without JavaScript and
 * correct if this never runs.
 */
export function CountUp({ value }: { value: string }) {
    const target = Number(value)
    const ref = useRef<HTMLSpanElement>(null)
    const [shown, setShown] = useState(value)

    useEffect(() => {
        if (!Number.isFinite(target)) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const el = ref.current
        if (!el) return

        const decimals = value.includes('.') ? value.split('.')[1].length : 0

        const io = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            io.disconnect()

            const start = performance.now()
            const duration = 900

            const tick = (now: number) => {
                const progress = Math.min((now - start) / duration, 1)
                // Same shape as the shared easing, expressed directly.
                const eased = 1 - Math.pow(1 - progress, 3)
                setShown((target * eased).toFixed(decimals))
                if (progress < 1) requestAnimationFrame(tick)
            }

            setShown((0).toFixed(decimals))
            requestAnimationFrame(tick)
        })

        io.observe(el)
        return () => io.disconnect()
    }, [target, value])

    return <span ref={ref}>{shown}</span>
}
