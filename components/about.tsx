import { Dots } from '@/components/dots'

const DISCIPLINES = [
    { label: 'Mobile apps', body: 'Cross platform, shipped to iOS and Android' },
    { label: 'Web apps', body: 'Full stack, from auth through to deployment' },
    { label: 'Data engineering', body: 'Pipelines and dashboards on AWS' },
]

export function About() {
    return (
        <section id="about" className="section-y relative">
            <Dots />

            <div className="col-wide">
                <h2 className="rise-on-view text-center text-section">About</h2>

                <div className="rise-on-view mt-12 text-center">
                    <p className="text-lead font-medium text-fg">
                        I build software that solves real problems.
                    </p>
                    <p className="mt-4 text-lead text-muted">
                        Software Development Engineer at{' '}
                        {/* Not a link. Accent is reserved, and the rules forbid it
                            on links in prose. */}
                        <span className="text-accent">Amazon Prime Video</span>.
                    </p>
                </div>

                {/* Left aligned inside the centred column, they run past three
                    lines on narrow screens. */}
                <div className="rise-on-view mt-16 grid gap-x-8 sm:grid-cols-3">
                    {DISCIPLINES.map((discipline) => (
                        <div
                            key={discipline.label}
                            className="border-t border-line pt-5 pb-5 text-left sm:pb-0"
                        >
                            <p className="label text-subtle">{discipline.label}</p>
                            <p className="mt-3 text-body text-muted">{discipline.body}</p>
                        </div>
                    ))}
                </div>

                <div className="rise-on-view mt-4 grid grid-cols-3 gap-8 border-t border-line pt-8 text-center sm:mt-12">
                    <Fact label="Degree" value="First Class BSc CS" note="QMUL" />
                    <Fact label="Based" value="London" />
                    <Fact label="Interested in" value="Startups" accent />
                </div>
            </div>
        </section>
    )
}

function Fact({
    label,
    value,
    note,
    accent = false,
}: {
    label: string
    value: string
    note?: string
    accent?: boolean
}) {
    return (
        <div>
            <p className="label text-faint">{label}</p>
            <p className={`mt-3 text-body ${accent ? 'text-accent' : 'text-fg'}`}>{value}</p>
            {note && <p className="mt-1 text-body text-faint">{note}</p>}
        </div>
    )
}
