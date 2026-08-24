import { Fragment } from 'react'
import type { Metadata } from 'next'
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

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const project = PROJECTS.find((entry) => entry.slug === slug)
    if (!project) return {}

    // The title template in the root layout appends the site name.
    return {
        title: project.title,
        description: project.tagline,
        alternates: { canonical: `/projects/${slug}` },
        openGraph: {
            type: 'article',
            title: project.title,
            description: project.tagline,
            url: `/projects/${slug}`,
        },
    }
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const project = PROJECTS.find((entry) => entry.slug === slug)
    if (!project) notFound()

    return (
        <main className="flex min-h-dvh flex-col">
            <section className="relative pt-28 pb-10">
                <Dots />

                <div className="col-prose">
                    {/* Back to the list this project came from, so an archive
                        entry does not bounce you up to the cards. */}
                    <Link
                        href={project.tier === 'archive' ? '/#archive' : '/#projects'}
                        className="label -my-2 flex w-fit items-center gap-2 py-2 text-muted transition-colors duration-200 hover:text-fg"
                    >
                        {/* Back navigation, so a left arrow. */}
                        <ArrowLeft size={12} />
                        {project.tier === 'archive' ? 'Archive' : 'Projects'}
                    </Link>

                    <div className="mt-12 text-center">
                        <h1 className="text-project">{project.title}</h1>
                        <p className="mt-4 text-lead text-muted">{project.tagline}</p>

                        <MetaRow project={project} />

                        <ExternalLinks links={project.links} />
                    </div>
                </div>
            </section>

            {project.media && project.media.length > 0 && (
                <section className="relative pb-4">
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

            {project.stackFull && (
                <Section title="Stack">
                    <ul className="col-prose flex flex-wrap justify-center gap-2">
                        {project.stackFull.map((item) => (
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
                    {/* Wrapping flex rather than a fixed column count, so three
                        or five results stay centred instead of leaving a hole. */}
                    <dl className="col-wide flex flex-wrap justify-center gap-x-12 gap-y-10 text-center">
                        {project.results.map((result) => (
                            <div key={result.label} className="min-w-24">
                                <dd
                                    className={`text-project ${
                                        result.highlight ? 'text-accent' : 'text-fg'
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
            <h2 className="rise-on-view mb-8 text-center text-section">{title}</h2>
            <div className="rise-on-view">{children}</div>
        </section>
    )
}

/*
 * Built from whatever the project actually has, so a missing role or status
 * cannot leave a separator with nothing on one side of it.
 */
function MetaRow({ project }: { project: Project }) {
    const parts = [
        { text: project.year, accent: false },
        project.role ? { text: project.role, accent: false } : null,
        project.status
            ? { text: project.status, accent: project.status === 'shipped' }
            : null,
    ].filter((part) => part !== null)

    return (
        <div className="label mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-muted">
            {parts.map((part, i) => (
                <Fragment key={part.text}>
                    {i > 0 && <span aria-hidden>&middot;</span>}
                    <span className={part.accent ? 'text-accent' : ''}>{part.text}</span>
                </Fragment>
            ))}
        </div>
    )
}

function ExternalLinks({ links }: { links: Project['links'] }) {
    // Guard against an entry with no href, so no dead pill renders.
    const entries = links.filter((link) => link.href)
    if (entries.length === 0) return null

    return (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {entries.map(({ label, href }) => (
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
