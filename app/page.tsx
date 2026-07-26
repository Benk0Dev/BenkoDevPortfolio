import { Dots } from '@/components/dots'

/*
 * Placeholder homepage. It exists to prove the tokens, fonts, theme switching
 * and both nav states. Hero, About, Projects, Archive, Stack and Footer
 * replace it.
 */
export default function Home() {
    return (
        <main>
            <section
                id="home"
                className="relative flex min-h-dvh flex-col items-center justify-center section-y"
            >
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
                        Body copy sits on muted. Headings and emphasis sit on fg.
                        Mono labels sit on faint. Scroll to swap the nav for the
                        pill.
                    </p>
                </div>
            </section>

            {/* Placeholder anchor targets so the nav links have somewhere to go. */}
            <section id="about" className="relative flex min-h-dvh items-center justify-center">
                <Dots />
                <h2 className="text-section">About</h2>
            </section>

            <section id="projects" className="relative flex min-h-dvh items-center justify-center">
                <Dots />
                <h2 className="text-section">Projects</h2>
            </section>
        </main>
    )
}
