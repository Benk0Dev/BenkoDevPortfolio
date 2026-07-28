import { Dots } from '@/components/dots'
import { STACK } from '@/data/stack'

/*
 * A compact strip, deliberately without a section heading. The rows are left
 * aligned so the label column shares one edge, which is exception 2 in the
 * layout rules.
 */
export function Stack() {
    return (
        <section className="section-y relative">
            <Dots />

            <dl className="col-wide rise-on-view">
                {STACK.map((row) => (
                    <div
                        key={row.label}
                        className="border-t border-line py-5 last:border-b sm:grid sm:grid-cols-[8rem_1fr] sm:items-center sm:gap-6"
                    >
                        <dt className="font-mono text-[0.6875rem] tracking-[0.15em] text-subtle uppercase">
                            {row.label}
                        </dt>
                        <dd className="mt-2 text-[0.9375rem] leading-relaxed text-fg sm:mt-0">{row.items}</dd>
                    </div>
                ))}
            </dl>
        </section>
    )
}
