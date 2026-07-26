import { Dots } from '@/components/dots'
import { Hero } from '@/components/hero'

export default function Home() {
    return (
        <main>
            <Hero />

            {/* Placeholder anchor targets until About and Projects are built. */}
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
