import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Dots } from '@/components/dots'
import { Footer } from '@/components/footer'

/*
 * Covers both an unknown path and an unknown project slug. The slug pages set
 * dynamicParams to false, so anything outside generateStaticParams lands here
 * rather than being rendered on demand.
 */
export default function NotFound() {
    return (
        <main className="flex min-h-dvh flex-col">
            <section className="section-y relative flex flex-1 items-center justify-center">
                <Dots />

                <div className="col-prose text-center">
                    <p className="label text-subtle">404</p>

                    <h1 className="mt-6 text-section">Page not found</h1>

                    <p className="mt-6 text-body text-muted">
                        That link does not lead anywhere. It may have moved, or it may
                        never have existed.
                    </p>

                    <div className="mt-10 flex justify-center">
                        <Link
                            href="/"
                            className="label flex items-center gap-2 rounded-full border-[0.5px] border-line px-5 py-3.5 text-fg transition-colors duration-200 hover:bg-chip"
                        >
                            {/* Back navigation, so a left arrow. */}
                            <ArrowLeft size={14} />
                            Home
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
