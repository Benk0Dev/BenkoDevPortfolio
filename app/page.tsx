import { About } from '@/components/about'
import { Dots } from '@/components/dots'
import { Hero } from '@/components/hero'

export default function Home() {
    return (
        <main>
            <Hero />

            <About />

            {/* Placeholder anchor target until Projects is built. Only the hero
                is full viewport height, every other section sizes to content. */}
            <section id="projects" className="section-y relative text-center">
                <Dots />
                <h2 className="text-section">Projects</h2>
            </section>
        </main>
    )
}
