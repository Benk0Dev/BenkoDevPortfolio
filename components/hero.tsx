import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { Dots } from '@/components/dots'
import { SOCIALS } from '@/data/socials'

const ICONS = { LinkedIn: LinkedinIcon, GitHub: GithubIcon, Email: Mail }

// Rise and fade on load, 40ms apart, once. Plain CSS, so the hero stays a
// server component and ships no JavaScript of its own.
function delay(step: number) {
    return { animationDelay: `${step * 40}ms` }
}

export function Hero() {
    return (
        <section
            id="home"
            className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden"
        >
            <Dots />

            <div className="col-prose flex flex-col items-center text-center">
                <div className="rise-in w-full" style={delay(0)}>
                    {/* Two cuts of the same shot, each with the background baked
                        in to match its theme. Both render and CSS picks one, so
                        the manual theme toggle works, which a prefers-color-scheme
                        <picture> could not do. */}
                    <Portrait src="/images/benko-dark.jpg" className="dark-only" priority />
                    <Portrait src="/images/benko-light.jpg" className="light-only" />
                </div>

                <h1 className="rise-in mt-[-0.22em] text-hero" style={delay(1)}>
                    Benko<span className="text-accent">.</span>
                </h1>

                <p className="label rise-in mt-6 text-muted" style={delay(2)}>
                    Software engineer &middot; London
                </p>

                <div className="rise-in mt-10 flex items-center gap-3" style={delay(3)}>
                    <Link
                        href="/cv"
                        target="_blank"
                        rel="noreferrer"
                        className="label flex items-center gap-2 rounded-full border-[0.5px] border-line px-5 py-3.5 text-fg transition-colors duration-200 hover:bg-chip"
                    >
                        View CV
                        <ArrowUpRight size={14} />
                    </Link>

                    {SOCIALS.map((social) => {
                        const Icon = ICONS[social.label as keyof typeof ICONS]
                        return (
                        <a
                            key={social.label}
                            href={social.href}
                            target={social.sameTab ? undefined : '_blank'}
                            rel={social.sameTab ? undefined : 'noreferrer'}
                            aria-label={social.label}
                            className="flex size-12 items-center justify-center rounded-full border-[0.5px] border-line text-fg transition-colors duration-200 hover:bg-chip"
                        >
                            <Icon size={18} />
                        </a>
                        )
                    })}
                </div>
            </div>

            <a
                href="#about"
                style={delay(5)}
                className="label rise-in absolute bottom-10 flex items-center gap-2 text-faint transition-colors duration-200 hover:text-muted"
            >
                Scroll
                <ArrowDown size={12} />
            </a>
        </section>
    )
}

function Portrait({
    src,
    className,
    priority = false,
}: {
    src: string
    className: string
    priority?: boolean
}) {
    return (
        <Image
            src={src}
            alt="Benas Kuliesis"
            width={886}
            height={886}
            priority={priority}
            sizes="(max-width: 640px) 60vw, 22rem"
            className={`mx-auto aspect-square w-[clamp(11rem,42vw,22rem)] rounded-full object-cover ${className}`}
            style={{
                // Fades into the background at the bottom so the wordmark can sit
                // over it without a hard edge.
                maskImage: 'linear-gradient(to bottom, black 68%, transparent 99%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 68%, transparent 99%)',
            }}
        />
    )
}
