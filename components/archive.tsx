import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Dots } from '@/components/dots'
import { ARCHIVE } from '@/data/projects'

export function Archive() {
    return (
        <section className="section-y relative">
            <Dots />

            <div className="col-wide">
                <h2 className="rise-on-view text-center text-section">Archive</h2>

                <ul className="rise-on-view mt-12 border-t border-line">
                    {ARCHIVE.map((project) => (
                        <li key={project.slug} className="border-b border-line">
                            <Link
                                href={`/projects/${project.slug}`}
                                className="group flex items-center justify-between gap-6 py-4 transition-colors duration-200"
                            >
                                <span className="text-card-title text-fg">
                                    {project.title}
                                </span>

                                <span className="label flex shrink-0 items-center gap-3 text-muted">
                                    {project.stack.join(' · ')}
                                    {/* Stays on the site, so a right arrow. */}
                                    <ArrowRight
                                        size={12}
                                        className="transition-transform duration-200 group-hover:translate-x-1"
                                    />
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
