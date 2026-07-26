'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, SunMoon } from 'lucide-react'

const THEMES = ['system', 'light', 'dark'] as const

// SunMoon rather than a monitor, the site is read on phones as much as desktops.
const ICONS = {
    system: SunMoon,
    light: Sun,
    dark: Moon,
}

const LABELS = {
    system: 'System theme',
    light: 'Light theme',
    dark: 'Dark theme',
}

export function ThemeToggle({ className = '' }: { className?: string }) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // The server has no idea which theme is active, so the first client render
    // has to match its empty output before showing the real state.
    useEffect(() => setMounted(true), [])

    const current = mounted && theme && theme in ICONS ? (theme as keyof typeof ICONS) : null

    function cycle() {
        const index = THEMES.indexOf((theme ?? 'system') as (typeof THEMES)[number])
        setTheme(THEMES[(index + 1) % THEMES.length])
    }

    const Icon = current ? ICONS[current] : null

    return (
        <button
            type="button"
            onClick={cycle}
            aria-label={current ? `${LABELS[current]}, click to change` : 'Change theme'}
            className={`pointer-events-auto flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted transition-colors duration-200 hover:text-fg ${className}`}
        >
            {Icon && <Icon size={20} />}
        </button>
    )
}
