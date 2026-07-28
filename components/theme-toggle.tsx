'use client'

import { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, SunMoon } from 'lucide-react'

const THEMES = ['system', 'light', 'dark'] as const

type ThemeName = (typeof THEMES)[number]

function readPref(): ThemeName {
    const pref = document.documentElement.dataset.themePref
    return THEMES.includes(pref as ThemeName) ? (pref as ThemeName) : 'system'
}

export function ThemeToggle({ className = '' }: { className?: string }) {
    const { theme, setTheme } = useTheme()

    // Keep the attribute the CSS reads in step with next-themes.
    useEffect(() => {
        if (theme) document.documentElement.dataset.themePref = theme
    }, [theme])

    function cycle() {
        const next = THEMES[(THEMES.indexOf(readPref()) + 1) % THEMES.length]
        document.documentElement.dataset.themePref = next
        setTheme(next)
    }

    return (
        <button
            type="button"
            onClick={cycle}
            aria-label="Change theme"
            className={`pointer-events-auto flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted transition-colors duration-200 hover:text-fg ${className}`}
        >
            {/* All three ship in the markup and CSS picks one off the attribute
                the inline script sets before first paint. Choosing in React
                instead would leave the button empty until hydration. */}
            <SunMoon size={20} className="theme-icon theme-icon-system" />
            <Sun size={20} className="theme-icon theme-icon-light" />
            <Moon size={20} className="theme-icon theme-icon-dark" />
        </button>
    )
}
