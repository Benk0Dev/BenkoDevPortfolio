import { Dots } from '@/components/dots'
import { ThemeToggle } from '@/components/theme-toggle'

/*
 * Placeholder homepage. It exists to prove the tokens, fonts and theme
 * switching. Hero, About, Projects, Archive, Stack and Footer replace it.
 */
export default function Home() {
    return (
        <main className="relative flex min-h-dvh flex-col items-center justify-center section-y">
            <Dots />

            <div className="col-prose text-center">
                <p className="label text-faint">Tokens</p>
                <h1 className="mt-6 text-hero">
                    Benko<span className="text-accent">.</span>
                </h1>
                <p className="mt-6 text-lead text-fg">
                    I build software that solves real problems.
                </p>
                <p className="mt-4 text-body">
                    Body copy sits on muted. Headings and emphasis sit on fg. Mono
                    labels sit on faint.
                </p>
                <div className="mt-8 flex justify-center">
                    <ThemeToggle />
                </div>
            </div>
        </main>
    )
}
