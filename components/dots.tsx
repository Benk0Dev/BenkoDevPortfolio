/*
 * Framing pattern down the left and right edges of a section, faded out toward
 * the centre so the content itself sits on clean background. Never faded
 * top-down, that collides with the hero photo fade.
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
                    'linear-gradient(to right, black 0%, transparent 24%, transparent 76%, black 100%)',
                WebkitMaskImage:
                    'linear-gradient(to right, black 0%, transparent 24%, transparent 76%, black 100%)',
            }}
        />
    )
}
