/*
 * Framing pattern for both edges of a section, faded toward the centre so the
 * content itself sits on clean background. Never faded top-down, that collides
 * with the hero photo fade.
 */
export function Dots() {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
                backgroundImage:
                    'radial-gradient(circle, var(--dot) 2px, transparent 2px)',
                backgroundSize: 'var(--dot-size) var(--dot-size)',
                maskImage:
                    'radial-gradient(ellipse 55% 65% at 50% 45%, transparent 35%, black 100%)',
                WebkitMaskImage:
                    'radial-gradient(ellipse 55% 65% at 50% 45%, transparent 35%, black 100%)',
            }}
        />
    )
}
