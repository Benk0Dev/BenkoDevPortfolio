import type { Metadata } from 'next'
import { display, mono } from './fonts'
import { Nav } from '@/components/nav'
import { ThemeProvider } from '@/components/theme-provider'
import { SITE } from '@/data/site'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
    // Lets every other route give a relative URL and get an absolute one.
    metadataBase: new URL(SITE.url),
    title: {
        default: SITE.name,
        // Slug pages fill this in, so a tab reads "Lingua | BenkoDev".
        template: `%s | ${SITE.name}`,
    },
    description: SITE.description,
    icons: { icon: '/favicon.svg' },
    alternates: { canonical: '/' },
    openGraph: {
        type: 'website',
        siteName: SITE.name,
        locale: 'en_GB',
        url: '/',
        title: SITE.name,
        description: SITE.description,
    },
    twitter: { card: 'summary_large_image' },
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
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    )
}
