import type { Metadata } from 'next'
import { display, mono } from './fonts'
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
            <body>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    )
}
