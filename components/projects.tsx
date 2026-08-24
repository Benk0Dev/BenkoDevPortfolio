import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Dots } from '@/components/dots'
import { CARDS, type Project } from '@/data/projects'

export function Projects() {
    const [lead, ...rest] = CARDS

    return (
        <section id="projects" className="section-y relative">
            <Dots />

            <div className="col-wide">
                <h2 className="rise-on-view text-center text-section">Projects</h2>

                <div className="rise-on-view mt-12 grid gap-5 sm:grid-cols-2">
                    {lead && <Card project={lead} wide className="sm:col-span-2" />}

                    {rest.map((project, i) => {
                        // A card left alone on the final row spans both columns
                        // and takes the wide layout, rather than sitting half
                        // width with a gap beside it.
                        const alone = i === rest.length - 1 && rest.length % 2 === 1

                        return (
                            <Card
                                key={project.slug}
                                project={project}
                                wide={alone}
                                className={alone ? 'sm:col-span-2' : ''}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

function Card({
    project,
    wide = false,
    className = '',
}: {
    project: Project
    wide?: boolean
    className?: string
}) {
    return (
        <Link
            href={`/projects/${project.slug}`}
            className={`group flex gap-5 rounded-2xl border-[0.5px] border-line bg-card p-5 transition-colors duration-200 hover:bg-card-hover ${
                wide ? 'flex-col sm:flex-row sm:items-center' : 'flex-col'
            } ${className}`}
        >
            <Cover project={project} wide={wide} />

            {/* Card body text is left aligned, one of the four exceptions. */}
            <div className={wide ? 'sm:flex-1' : ''}>
                <div className="flex items-center gap-3">
                    {project.featured && (
                        <span className="label rounded-full border-[0.5px] border-accent px-2.5 py-0.5 text-accent font-bold">
                            Featured
                        </span>
                    )}
                    <span className="label text-muted">{project.year}</span>
                </div>

                <h3 className="mt-3 flex items-center gap-2 text-card-title">
                    {project.title}
                    {/* Internal link, so a right arrow. */}
                    <ArrowRight
                        size={16}
                        className="text-muted transition-transform duration-200 group-hover:translate-x-1"
                    />
                </h3>

                <p className="mt-2 text-body text-muted">{project.tagline}</p>

                <ul className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                        <li
                            key={item}
                            className="rounded-full border-[0.5px] border-line px-2 py-0.5 font-mono text-[0.6875rem] tracking-[0.15em] text-muted font-medium"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </Link>
    )
}

function Cover({ project, wide }: { project: Project; wide: boolean }) {
    // 4/3 whatever the card width, so every cover crops the same way and a row
    // of cards reads as one set.
    //
    // The featured cover matches a grid cover exactly, at any container width.
    // A grid cover is (W - 1.25rem gap) / 2 - 2.5rem padding, and the featured
    // card's content box is W - 2.5rem, so 100% here is W - 2.5rem and the
    // same width works out as 50% - 1.875rem.
    const shape = wide
        ? 'aspect-[4/3] sm:w-[calc(50%-1.875rem)] sm:shrink-0'
        : 'aspect-[4/3] w-full'

    if (!project.cover) {
        // Placeholder until real covers land, so the layout is still honest.
        return <div className={`${shape} rounded-xl border-[0.5px] border-line bg-chip`} />
    }

    return (
        <Image
            src={project.cover}
            alt=""
            sizes="(max-width: 640px) 90vw, 22rem"
            className={`${shape} rounded-xl border-[0.5px] border-line object-cover`}
        />
    )
}
