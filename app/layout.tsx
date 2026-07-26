import type { Metadata } from 'next'
import { display, mono } from './fonts'
import { Nav } from '@/components/nav'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
    title: 'Benko',
    description: 'Software Development Engineer at Amazon Prime Video.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en-GB"
            className={`${display.variable} ${mono.variable}`}
            suppressHydrationWarning
        >
            <head>
                {/* Runs before paint so the toggle renders the right icon
                    immediately. Reads the same key next-themes writes. */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `try{document.documentElement.dataset.themePref=localStorage.getItem('theme')||'system'}catch(e){}`,
                    }}
                />
            </head>
            <body>
                <ThemeProvider>
                    {/* Sits just below the top bar. Once it leaves the viewport the bar has
                        scrolled off and the pill can take over. */}
                    <div id="nav-sentinel" aria-hidden className="absolute top-24 h-px w-full" />
                    <Nav />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
