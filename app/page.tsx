import { About } from '@/components/about'
import { Archive } from '@/components/archive'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Projects } from '@/components/projects'
import { Stack } from '@/components/stack'

export default function Home() {
    return (
        <main>
            <Hero />
            <About />
            <Projects />
            <Archive />
            <Stack />
            <Footer />
        </main>
    )
}
