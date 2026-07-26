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
        links: {},
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
