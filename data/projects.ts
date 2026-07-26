export type Project = {
    slug: string
    tier: 'project' | 'archive'
    title: string
    tagline: string
    /* Drives the Featured pill on the card. Defaults to false. */
    featured?: boolean
    year: string
    status: 'shipped' | 'in progress' | 'prototype'
    stack: string[]
    links: { github?: string; live?: string; demo?: string }

    role?: string
    cover?: string
    media?: { src: string; alt: string; type: 'image' | 'loop' }[]
    overview?: string[]
    stackGrouped?: { group: string; items: string[] }[]
    decisions?: { title: string; body: string }[]
    results?: { value: string; label: string }[]
}

/*
 * Array order is display order, no sort logic. The first project entry is the
 * full width card, the rest fill the grid below it. `featured` is separate, it
 * only decides whether the card carries the Featured pill.
 *
 * These are placeholders for building the layouts against. Real copy replaces
 * them, it is not invented here.
 */
export const PROJECTS: Project[] = [
    {
        slug: 'dummy-featured',
        tier: 'project',
        title: 'Dummy Featured',
        tagline:
            'TODO: two lines on what this is, who it is for and the one number worth quoting.',
        featured: true,
        year: '2026',
        status: 'shipped',
        stack: ['React Native', 'AWS CDK', 'Lambda', 'DynamoDB'],
        links: { github: 'TODO', demo: 'TODO' },
        role: 'Sole engineer',
        // Empty src renders a placeholder frame, so the slider can be built
        // and checked before real screenshots exist.
        media: [
            { src: '', alt: 'TODO', type: 'image' },
            { src: '', alt: 'TODO', type: 'image' },
            { src: '', alt: 'TODO', type: 'image' },
            { src: '', alt: 'TODO', type: 'image' },
        ],
        overview: [
            'TODO: what the project is, who it is for and what shipping it involved.',
            'TODO: a second paragraph only if the first cannot carry it alone.',
        ],
        stackGrouped: [
            { group: 'Client', items: ['React Native', 'Expo'] },
            { group: 'Backend', items: ['AWS CDK', 'Lambda', 'API Gateway'] },
            { group: 'Data', items: ['DynamoDB', 'Prisma'] },
        ],
        decisions: [
            {
                title: 'TODO: first decision',
                body: 'TODO: what the options were, what was measured and why this one won. Two or three sentences.',
            },
            {
                title: 'TODO: second decision',
                body: 'TODO: the trade off accepted and what it bought.',
            },
        ],
        results: [
            { value: '4.9', label: 'Overall' },
            { value: '10', label: 'Languages' },
            { value: '13', label: 'Testers' },
            { value: '2', label: 'Platforms' },
        ],
    },
    {
        slug: 'dummy-second',
        tier: 'project',
        title: 'Dummy Second',
        tagline: 'TODO: one or two lines on what this is and what it handles.',
        year: '2025',
        status: 'shipped',
        stack: ['Next.js', 'Postgres', 'Prisma'],
        links: {},
    },
    {
        slug: 'dummy-third',
        tier: 'project',
        title: 'Dummy Third',
        tagline: 'TODO: one or two lines on what this is and what it handles.',
        year: '2025',
        status: 'shipped',
        stack: ['React', 'Express', 'TypeScript'],
        links: {},
    },
    {
        slug: 'dummy-archive-one',
        tier: 'archive',
        title: 'Dummy Archive One',
        tagline: 'TODO',
        year: '2025',
        status: 'shipped',
        stack: ['React', 'Vite'],
        links: {},
        // Deliberately sparse, to prove a thin entry still looks intentional.
        overview: ['TODO: one paragraph is enough for an archive entry.'],
    },
    {
        slug: 'dummy-archive-two',
        tier: 'archive',
        title: 'Dummy Archive Two',
        tagline: 'TODO',
        year: '2024',
        status: 'prototype',
        stack: ['Python'],
        links: {},
    },
    {
        slug: 'dummy-archive-three',
        tier: 'archive',
        title: 'Dummy Archive Three',
        tagline: 'TODO',
        year: '2024',
        status: 'shipped',
        stack: ['Java'],
        links: {},
    },
]

export const CARDS = PROJECTS.filter((project) => project.tier === 'project')
export const ARCHIVE = PROJECTS.filter((project) => project.tier === 'archive')
