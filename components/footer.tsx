import { ArrowUpRight } from 'lucide-react'
import { SOCIAL_ICONS } from '@/components/brand-icons'
import { SOCIALS } from '@/data/socials'

// mt-auto so a short page still pushes the footer to the bottom. It does
// nothing unless the parent is a flex column, so the homepage is unaffected.
export function Footer() {
    return (
        <footer className="relative mt-auto border-t border-line">
            <div className="flex w-full items-center justify-between gap-6 px-6 py-8 sm:px-10">
                <a
                    href="https://github.com/Benk0Dev/BenkoDevPortfolio"
                    target="_blank"
                    rel="noreferrer"
                    className="label -my-2 flex items-center gap-2 py-2 text-muted transition-colors duration-200 hover:text-fg"
                >
                    This site on GitHub
                    {/* Leaves the site, so an up right arrow. */}
                    <ArrowUpRight size={12} />
                </a>

                <ul className="flex items-center gap-2">
                    {SOCIALS.map((social) => {
                        const Icon = SOCIAL_ICONS[social.label as keyof typeof SOCIAL_ICONS]
                        return (
                            <li key={social.label}>
                                <a
                                    href={social.href}
                                    target={social.sameTab ? undefined : '_blank'}
                                    rel={social.sameTab ? undefined : 'noreferrer'}
                                    aria-label={social.label}
                                    className="flex size-10 items-center justify-center rounded-full border-[0.5px] border-line text-muted transition-colors duration-200 hover:bg-chip hover:text-fg"
                                >
                                    <Icon size={16} />
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </footer>
    )
}
