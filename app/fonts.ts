import localFont from 'next/font/local'

export const display = localFont({
    src: './fonts/Geist-Variable.woff2',
    weight: '100 900',
    variable: '--font-geist-sans',
    display: 'swap',
    // Generates a size-adjusted fallback so swapping in Geist costs no layout shift.
    adjustFontFallback: 'Arial',
})

export const mono = localFont({
    src: './fonts/GeistMono-Variable.woff2',
    weight: '100 900',
    variable: '--font-geist-mono',
    display: 'swap',
    adjustFontFallback: 'Arial',
})
