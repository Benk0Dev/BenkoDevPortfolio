'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/theme-toggle'

const LINKS = [
    { label: 'Home', hash: '#home' },
    { label: 'About', hash: '#about' },
    { label: 'Projects', hash: '#projects' },
]

export function Nav() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const isHome = pathname === '/'

    // A sentinel beats a scroll listener here, no work on the main thread per frame.
    useEffect(() => {
        const el = document.getElementById('nav-sentinel')
        if (!el) return
        const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting))
        io.observe(el)
        return () => io.disconnect()
    }, [])

    // Anchors on the homepage, absolute links back to it everywhere else.
    const href = (hash: string) => {
        if (hash === '#home') return isHome ? '#home' : '/'
        return isHome ? hash : `/${hash}`
    }

    return (
        <>
            {/* Belongs to the top of the document, so it scrolls away with the
                page. Only the pill follows the viewport. Same on every route. */}
            <header
                inert={scrolled}
                aria-hidden={scrolled}
                className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 sm:px-10"
            >
                <Logo href={href('#home')} />
                {/* All three links at every width, no hamburger. */}
                <NavLinks href={href} />
                <ThemeToggle className="hover:bg-chip" />
            </header>

            {/* Takes over once the bar above has cleared the viewport, so the
                two never overlap and nothing has to animate across the screen.

                The fade and the backdrop blur have to live on the same element.
                An ancestor with opacity below 1 becomes the backdrop root, and
                the blur then has nothing behind it to sample, which shows up as
                the effect cutting in and out at either end of the transition.
                Centring is done with a translate rather than a flex parent for
                the same reason, so the transform composes with the animation. */}
            <nav
                inert={!scrolled}
                aria-hidden={!scrolled}
                aria-label="Primary"
                className={`fixed top-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-6.5 rounded-[99px] border-[0.5px] border-line bg-pill p-2.5 pl-[var(--pill-pad-left)] backdrop-blur-md backdrop-saturate-150 transition-[opacity,transform] ease-site will-change-transform ${
                    scrolled
                        ? 'translate-y-0 scale-100 opacity-100 duration-420'
                        : '-translate-y-4 scale-95 opacity-0 duration-180'
                }`}
            >
                <Logo href={href('#home')} />
                <NavLinks href={href} />
                <ThemeToggle className="bg-chip hover:bg-chip-hover" />
            </nav>
        </>
    )
}

function Logo({ href }: { href: string }) {
    return (
        <Link
            href={href}
            className="pointer-events-auto shrink-0 text-accent transition-opacity duration-200 hover:opacity-80"
            aria-label="Benko, home"
        >
            {/* The mark only fills the middle half of its viewBox, so the box is
                drawn larger than the height the glyph should read at. */}
            <svg viewBox="0 0 1500 1500" fill="currentColor" aria-hidden className="size-10">
                <path d="M1080.16 1125.37 839.05 809l-62.83.05V691.33h62.83l241.8-316.89h157.86L956.49 749.93l281.24 375.44h-157.57z" />
                <path d="M548.78 1125.56c-70.57 0-137.14-22.14-187.45-62.34-24.87-19.88-44.46-43.11-58.21-69.05-14.45-27.25-21.77-56.23-21.77-86.12 0-35.19 10.58-70.12 30.6-101.02 13.85-21.38 32.24-40.89 54.02-57.45-21.78-16.56-40.17-36.07-54.02-57.45-20.02-30.9-30.6-65.83-30.6-101.02 0-58.81 28.43-113.76 80.04-154.72 50.22-39.86 116.78-61.81 187.4-61.81h267.44v750.98H548.79Zm-3.55-317.42c-37.83 0-73.18 11.02-99.55 31.01-24.72 18.74-38.34 43.15-38.34 68.73s13.62 49.98 38.34 68.73c26.37 20 61.74 31.01 99.59 31.01l137.93.3V808.89l-137.97-.74Zm0-316.86c-37.83 0-73.18 11.02-99.55 31.01-24.72 18.74-38.34 43.15-38.34 68.73s13.62 49.98 38.34 68.73c26.37 20 61.74 31.01 99.59 31.01l137.93.3V492.03l-137.97-.74Z" />
            </svg>
        </Link>
    )
}

function NavLinks({ href }: { href: (hash: string) => string }) {
    return (
        <ul className="-mx-3 flex items-center gap-2 font-mono text-label tracking-[0.15em] uppercase">
            {LINKS.map((link) => (
                <li key={link.label}>
                    {/* No active state by design, they only brighten on hover. */}
                    {/* Padding rather than bare text, the hit box needs to be
                        finger sized. The negative margin on the list keeps the
                        spacing looking the same as before. */}
                    <Link
                        href={href(link.hash)}
                        className="pointer-events-auto block rounded-full px-3 py-2.5 text-muted transition-colors duration-200 hover:bg-chip hover:text-fg"
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
