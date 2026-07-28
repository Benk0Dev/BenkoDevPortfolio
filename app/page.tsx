import { About } from '@/components/about'
import { Archive } from '@/components/archive'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Projects } from '@/components/projects'
import { Stack } from '@/components/stack'
import { SITE } from '@/data/site'
import { SOCIALS } from '@/data/socials'

/*
 * Tells search engines this site and those profiles are the same person, so a
 * search for the name clusters them rather than treating them as unrelated.
 */
const PERSON = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.person,
    alternateName: 'Benko',
    jobTitle: SITE.jobTitle,
    worksFor: { '@type': 'Organization', name: SITE.employer },
    url: SITE.url,
    image: `${SITE.url}/images/benko-dark.jpg`,
    sameAs: SOCIALS.filter((social) => social.href.startsWith('http')).map(
        (social) => social.href,
    ),
}

export default function Home() {
    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON) }}
            />

            <Hero />
            <About />
            <Projects />
            <Archive />
            <Stack />
            <Footer />
        </main>
    )
}
