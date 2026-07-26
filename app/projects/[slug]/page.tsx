import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { CountUp } from '@/components/count-up'
import { Dots } from '@/components/dots'
import { Footer } from '@/components/footer'
import { Slider } from '@/components/slider'
import { PROJECTS, type Project } from '@/data/projects'

// Every project gets a page, archive entries included.
export function generateStaticParams() {
    return PROJECTS.map((project) => ({ slug: project.slug }))
}

// Anything not in the list above is a 404 rather than rendered on demand.
export const dynamicParams = false

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const project = PROJECTS.find((entry) => entry.slug === slug)
    if (!project) notFound()

    return (
        <main>
            <section className="relative pt-28 pb-16">
                <Dots />

                <div className="col-prose">
                    <Link
                        href="/#projects"
                        className="label flex items-center gap-2 text-muted transition-colors duration-200 hover:text-fg"
                    >
                        {/* Back navigation, so a left arrow. */}
                        <ArrowLeft size={12} />
                        Projects
                    </Link>

                    <div className="mt-12 text-center">
                        <h1 className="text-project">{project.title}</h1>
                        <p className="mt-4 text-lead text-muted">{project.tagline}</p>

                        <div className="label mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-muted">
                            <span>{project.year}</span>
                            {project.role && (
                                <>
                                    <Dot />
                                    <span>{project.role}</span>
                                </>
                            )}
                            <Dot />
                            <span className={project.status === 'shipped' ? 'text-accent' : ''}>
                                {project.status}
                            </span>
                        </div>

                        <ExternalLinks links={project.links} />
                    </div>
                </div>
            </section>

            {project.media && project.media.length > 0 && (
                <section className="relative pb-8">
                    <Dots />
                    <div className="col-wide">
                        <Slider media={project.media} />
                    </div>
                </section>
            )}

            {/* Every section renders only if its field is present, so a thin
                entry still reads as intentional. */}
            {project.overview && (
                <Section title="Overview">
                    <div className="col-prose text-center">
                        {project.overview.map((paragraph, i) => (
                            <p key={i} className="mt-4 text-body text-muted first:mt-0">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </Section>
            )}

            {project.stackGrouped && (
                <Section title="Stack">
                    <ul className="col-prose flex flex-wrap justify-center gap-2">
                        {project.stackGrouped.flatMap((group) => group.items).map((item) => (
                            <li
                                key={item}
                                className="rounded-full border-[0.5px] border-line px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.15em] text-muted"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </Section>
            )}

            {project.decisions && (
                <Section title="Decisions">
                    <div className="col-prose">
                        {project.decisions.map((decision) => (
                            /* Decision paragraphs are left aligned, exception 1. */
                            <div
                                key={decision.title}
                                className="border-t border-line py-6 text-left last:border-b"
                            >
                                <h3 className="text-body font-medium">{decision.title}</h3>
                                <p className="mt-2 text-body text-muted">{decision.body}</p>
                            </div>
                        ))}
                    </div>
                </Section>
            )}

            {project.results && (
                <Section title="Results">
                    <dl className="col-wide grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
                        {project.results.map((result, i) => (
                            <div key={result.label}>
                                <dd
                                    className={`text-project ${
                                        i === project.results!.length - 1 ? 'text-accent' : 'text-fg'
                                    }`}
                                >
                                    <CountUp value={result.value} />
                                </dd>
                                <dt className="label mt-2 text-muted">{result.label}</dt>
                            </div>
                        ))}
                    </dl>
                </Section>
            )}

            <Footer />
        </main>
    )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="section-y relative">
            <Dots />
            <h2 className="rise-on-view mb-10 text-center text-section">{title}</h2>
            <div className="rise-on-view">{children}</div>
        </section>
    )
}

function Dot() {
    return <span aria-hidden>&middot;</span>
}

function ExternalLinks({ links }: { links: Project['links'] }) {
    const entries = Object.entries(links) as [string, string][]
    if (entries.length === 0) return null

    return (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {entries.map(([label, href]) => (
                <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="label flex items-center gap-2 rounded-full border-[0.5px] border-line px-5 py-3 text-fg transition-colors duration-200 hover:bg-chip"
                >
                    {label}
                    {/* Leaves the site, so an up right arrow. */}
                    <ArrowUpRight size={14} />
                </a>
            ))}
        </div>
    )
}
