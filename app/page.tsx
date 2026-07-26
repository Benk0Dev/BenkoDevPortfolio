import { About } from '@/components/about'
import { Archive } from '@/components/archive'
import { Hero } from '@/components/hero'
import { Projects } from '@/components/projects'

export default function Home() {
    return (
        <main>
            <Hero />
            <About />
            <Projects />
            <Archive />
        </main>
    )
}
