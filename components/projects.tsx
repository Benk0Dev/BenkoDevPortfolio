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

                <div className="rise-on-view mt-12 grid gap-5">
                    {lead && <Card project={lead} wide />}

                    <div className="grid gap-5 sm:grid-cols-2">
                        {rest.map((project) => (
                            <Card key={project.slug} project={project} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function Card({ project, wide = false }: { project: Project; wide?: boolean }) {
    return (
        <Link
            href={`/projects/${project.slug}`}
            className={`group flex gap-5 rounded-2xl border-[0.5px] border-line bg-card p-5 transition-colors duration-200 hover:bg-card-hover ${
                wide ? 'flex-col sm:flex-row sm:items-center' : 'flex-col'
            }`}
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
    const shape = wide
        ? 'aspect-[4/3] sm:w-2/5 sm:shrink-0'
        : 'aspect-[16/10] w-full'

    if (!project.cover) {
        // Placeholder until real covers land, so the layout is still honest.
        return <div className={`${shape} rounded-xl border-[0.5px] border-line bg-chip`} />
    }

    return (
        <Image
            src={project.cover}
            alt=""
            width={1200}
            height={900}
            sizes="(max-width: 640px) 90vw, 22rem"
            className={`${shape} rounded-xl border-[0.5px] border-line object-cover`}
        />
    )
}
