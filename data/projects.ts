import type { StaticImageData } from 'next/image'

import linguaCover from '@/public/images/projects/lingua/cover.png'
import linguaChat from '@/public/images/projects/lingua/chat.png'
import linguaChats from '@/public/images/projects/lingua/chats.png'
import linguaSearch from '@/public/images/projects/lingua/search.png'
import linguaLanguages from '@/public/images/projects/lingua/languages.png'
import thePrizeHuntLive from '@/public/images/projects/theprizehunt/live.png'
import amazonPrimeVideoCover from '@/public/images/projects/amazon-prime-video/cover.png'
import gofetchCover from '@/public/images/projects/gofetch/cover.png'
import runcastCover from '@/public/images/projects/runcast/cover.png'
import portfolioWithBlogCover from '@/public/images/projects/portfolio-with-blog/cover.png'

const GITHUB_URL = 'https://github.com/Benk0Dev'

/*
 * Images are imported so next/image reads their real dimensions off the file.
 * Nothing is hand typed and the aspect ratio cannot go stale. Videos stay as
 * paths, they cannot be imported this way, so they carry their own size.
 */
export type Media =
    | { type: 'image'; src: StaticImageData; alt: string; caption?: string }
    | { type: 'loop'; src: string; width: number; height: number; alt: string; caption?: string }

export type Project = {
    slug: string
    tier: 'project' | 'archive'
    title: string
    tagline: string
    /* Drives the Featured pill on the card. Defaults to false. */
    featured?: boolean
    year: string
    status?: 'shipped' | 'in progress' | 'prototype'
    stack: string[]
    /* Free form, so a project labels its own links. Array order is display order. */
    links: { label: string; href: string }[]

    role?: string
    cover?: StaticImageData
    media?: Media[]
    overview?: string[]
    stackFull?: string[]
    decisions?: { title: string; body: string }[]
    /* highlight puts a value in accent. At most one per project. */
    results?: { value: string; label: string; highlight?: boolean }[]
}

/*
 * Array order is display order, no sort logic. The first project entry is the
 * full width card, the rest fill the grid below it. `featured` is separate, it
 * only decides whether the card carries the Featured pill.
 */
export const PROJECTS: Project[] = [
    {
        slug: 'lingua',
        tier: 'project',
        title: 'Lingua',
        tagline:
            'A mobile multilingual messaging app.',
        featured: true,
        year: '2026',
        status: 'shipped',
        stack: ['React Native', 'TypeScript', 'AWS', 'WebSockets', 'GCP Translation LLM'],
        links: [
            { label: 'GitHub', href: `${GITHUB_URL}/multilingual-messaging-app` },
            { label: 'Demo', href: 'https://www.youtube.com/watch?v=L3uEJDroPto' },
        ],
        role: 'Final Year Project',
        cover: linguaCover,
        media: [
            { src: linguaChat, caption: 'Chat with a speaker of another language', alt: 'Chat Screen Screenshot', type: 'image' },
            { src: linguaChats, caption: 'Chats history', alt: 'Chats Screen Screenshot', type: 'image' },
            { src: linguaSearch, caption: 'Searching for users', alt: 'Search Screen Screenshot', type: 'image' },
            { src: linguaLanguages, caption: 'Wide selection of languages', alt: 'Languages Screen Screenshot', type: 'image' },
        ],
        overview: [
            'Lingua lets people who do not share a language message each other normally. Each person writes and reads in their own language, and translation is applied automatically as messages are sent.',
            'A fully functional MVP: passwordless sign in, user search, chats with full history, read receipts, multi-device sync, and language and theme settings. Messages and their translations are encrypted at rest with AES-256-GCM.',
            'Tested in a closed beta where users held genuine cross-language conversations on their own devices, rating both translation quality and overall usability.',
        ],
        stackFull: [
            'React Native',
            'Expo',
            'TypeScript',
            'Zustand',
            'AWS CDK',
            'Lambda',
            'API Gateway',
            'Express',
            'WebSockets',
            'Neon Postgres',
            'Prisma',
            'DynamoDB',
            'S3',
            'Cognito',
            'AES-256-GCM',
            'Secrets Manager',
            'GCP Translation LLM',
        ],
        decisions: [
            {
                title: 'Choosing a translation provider',
                body: 'Three providers were compared before picking one. Scores on a standard translation benchmark came out near identical, so the choice came down to how each one handled short, casual, informal text, which is what a messaging app actually sends.',
            },
            {
                title: 'No end-to-end encryption',
                body: 'Translation runs server side, so the backend has to be able to read message content. End-to-end encryption is not compatible with that, so messages and translations are encrypted at rest and in transit instead.',
            },
            {
                title: 'Email codes instead of SMS',
                body: 'SMS is the standard choice for passwordless sign in and would be the right one in production. It carries a per-message cost though, which was not worth paying across months of development and testing on a university project, so one-time codes are sent by email instead.',
            },
        ],
        results: [
            { value: '13', label: 'Testers' },
            { value: '10', label: 'Languages' },
            { value: '4.9', label: 'Rating', highlight: true },
        ],
    },
    {
        slug: 'the-prize-hunt',
        tier: 'project',
        title: 'The Prize Hunt',
        tagline:
            'A prize competition platform with instant wins.',
        year: '2025-26',
        status: 'shipped',
        stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Supabase'],
        links: [{ label: 'Client Site', href: 'https://theprizehunt.co.uk' }],
        role: 'Client Project',
        // TODO: add images from the site I actually coded, not just the RaffleX one
        cover: thePrizeHuntLive,
        media: [
            { src: thePrizeHuntLive, caption: 'The live client site, built on RaffleX', alt: 'Live Client Site Screenshot', type: 'image' },
        ],
        overview: [
            'A prize competition platform where users buy tickets for a chance to win, with instant wins revealed at the point of purchase. Built end to end as the sole engineer for a startup client.',
            'Accounts and authentication, competition listings with countdowns and bulk pricing, a basket, wallet funded purchases, randomised ticket allocation, instant win prizes and payouts, transactional emails, and an admin dashboard for running competitions.',
            'The client is now live on RaffleX rather than on this platform. I recommended the move, set their site up there, wrote the custom code it needed, and handled branding, domains and mailing lists. That call is covered in the decisions below.',
        ],
        stackFull: [
            'Next.js',
            'React',
            'TypeScript',
            'Tailwind CSS',
            'Radix UI',
            'Zustand',
            'Prisma',
            'Zod',
            'PostgreSQL',
            'Supabase',
            'JWT',
            'Resend',
            'React Email',
        ],
        decisions: [
            {
                title: 'Allocating tickets under concurrent load',
                body: 'Two people buying the last tickets at the same moment must never get the same number. Tickets are selected in raw SQL that locks the rows it takes and skips any that another transaction is already holding, picking at random from the rest. The wallet debit, the ticket assignment and the purchase record all run in one transaction, so a purchase either completes fully or not at all.',
            },
            {
                title: 'Instant wins decided before the competition opens',
                body: 'Each instant win is attached to a specific ticket number when the competition is created, rather than rolled when someone buys. Buying that ticket reveals a result that was already set. Prizes cannot be changed mid competition, but every outcome is fixed in advance and can be checked afterwards, which matters when people are paying for a chance to win.',
            },
            {
                title: 'Buying instead of building',
                body: 'The platform was taking too long and the client needed to be selling. RaffleX already did what I was building, for a monthly fee that barely registers, plus a few pence on every sale. I recommended it, moved them across, and they launched months earlier than finishing the custom build would have allowed. It also meant their site did not end up depending on one person to keep it running.',
            },
        ],
    },
    {
        slug: 'amazon-pv-internship',
        tier: 'project',
        title: 'Amazon Prime Video',
        tagline: 'Automated quarterly business review metrics.',
        year: '2025',
        status: 'shipped',
        stack: ['AWS CDK', 'Athena', 'QuickSight', 'SQL'],
        links: [],
        role: 'Internship Project',
        cover: amazonPrimeVideoCover,
        media: [],
        overview: [
            'An automated pipeline and dashboard for the metrics behind the organisation\'s quarterly business review, replacing a collection process that had been done by hand every quarter.',
            'Mostly a data engineering problem. Infrastructure is defined in CDK, the data stays raw until the reporting layer, and the aggregation is handled in SQL. The output is a QuickSight dashboard embedded in the internal wiki, where metrics can be read week by week and month by month rather than only at quarter end.',
            'My manager\'s manager introduced it to the wider team as "this will make your lives 100x easier".',
        ],
        stackFull: [
            'AWS CDK',
            'CloudFormation',
            'Athena',
            'Lake Formation',
            'SQL',
            'QuickSight',
        ],
        decisions: [
            {
                title: 'Choosing the simpler architecture',
                body: 'The design I first proposed ran a Glue ETL job aggregating into Redshift for the dashboard to read. Design review pushed on whether that complexity was earning anything, and it wasn\'t. It cost more to run, and changing a figure meant re-running jobs before you could see whether it was right. What I built keeps the data raw until the reporting layer, so each adjustment is a single query edit.',
            },
            {
                title: 'Checking the metrics before automating them',
                body: 'Once a number is on a dashboard people tend to trust it, so automating a metric before I properly understood it would just have made any mistake harder to spot. Tracing each one back to its source took longer than building the pipeline, but it was the part that made the output worth relying on.',
            },
            {
                title: 'Making it easy to pick up',
                body: 'The internship was going to end and someone else would own this, so it needed to be something another engineer could extend without me. The simpler pipeline helped, and I documented every data source and the steps for adding a new metric.',
            },
        ],
        results: [
            { value: '50+', label: 'Metrics' },
            { value: '5', label: 'Teams' },
            { value: '80%', label: 'Automated', highlight: true },
        ],
    },
    {
        slug: 'gofetch',
        tier: 'project',
        title: 'GoFetch',
        tagline: 'A pet minding web platform.',
        year: '2025',
        status: 'prototype',
        stack: ['React', 'TypeScript', 'Express', 'Socket.IO'],
        links: [{ label: 'GitHub', href: `${GITHUB_URL}/gofetch` }],
        role: 'University Group Project, Team Lead',
        cover: gofetchCover,
        media: [
            { src: gofetchCover, caption: 'Minder browse page', alt: 'GoFetch Screenshot', type: 'image' },
        ],
        overview: [
            'A two sided platform connecting pet owners with local pet minders. Minders set up a profile and list the services they offer. Owners add their pets, browse minders by location, price and rating, then book and pay for a service.',
            'Each side gets its own dashboard covering bookings, services, pets and reviews, with real time messaging between owners and minders and an admin area for handling reports and suspending accounts. Built as a prototype, so payments are simulated and data sits in local JSON files rather than a real database.',
            'Led a team of seven from research and system design through to build. I designed the interface and built most of the front end, including the booking workflow, filtered browsing and both dashboards. My first product build.',
        ],
        stackFull: [
            'React',
            'Vite',
            'CSS',
            'Node.js',
            'Express',
            'TypeScript',
            'Multer',
            'Socket.IO',
            'JSON store',
            'Google Maps',
        ],
        decisions: [
            {
                title: 'One account, two roles',
                body: 'Owners and minders could have been separate account types, but plenty of people are both, and that would have meant two logins and two profiles for the same person. A user holds either role or both and switches between them, with the dashboard changing to match.',
            },
            {
                title: 'No database',
                body: 'Data sits in JSON files that the server reads and writes directly. It made the project runnable by anyone on the team with nothing to install or configure, which mattered more than durability for a prototype with a fixed deadline. It would not survive real use, and that was the accepted trade.',
            },
        ],
    },
    {
        slug: 'neural-curve-fitting',
        tier: 'archive',
        title: 'Neural Curve Fitting',
        tagline: 'A neural network that predicts an unseen curve from a few points.',
        year: '2026',
        stack: ['Python', 'PyTorch', 'NumPy'],
        links: [{ label: 'GitHub', href: `${GITHUB_URL}/Neural-Curve-Fitting` }],
        role: 'University Coursework',
        overview: [
            'Built for a Neural Networks and Deep Learning module. Shown a handful of points from a curve it has never seen, the model has to work out which curve it is and draw the rest of it. Trained on 30,000 of them in PyTorch.',
            'The model only ever sees points on a curve, never the formula behind it. I trained three versions with increasing internal memory and the improvement stopped at four, which pointed to the curves being generated from four independent values, something the dataset never stated anywhere.',
        ],
        stackFull: [
            'PyTorch',
            'MLP',
            'Adam',
            'NumPy',
        ],
    },
    {
        slug: 'tryhackme',
        tier: 'archive',
        title: 'TryHackMe',
        tagline: 'Offensive security labs.',
        year: '2026',
        stack: ['Linux', 'Networking', 'Web Security'],
        links: [],
        role: 'University Coursework',
        overview: [
            'The practical component of a Security Engineering module. TryHackMe hosts deliberately vulnerable machines to attack in a contained environment.',
            'I escalated from a standard user to root on Linux by abusing misconfigured sudo rules, SUID binaries and capabilities. Scanned hosts to find services on non-standard ports, brute forced login forms, cracked password hashes, and pulled credentials out of captured traffic. Exploited XSS and SQL injection by hand, including blind cases where the application gives nothing back and the data has to be sent somewhere I controlled.',
        ],
        stackFull: [
            'Linux',
            'sudo',
            'SUID',
            'Capabilities',
            'John the Ripper',
            'nmap',
            'Hydra',
            'Wireshark',
            'Netcat',
            'Burp Suite',
            'XSS',
            'SQL injection',
        ],
    },
    // TODO: Add Big Data module coursework
    // {
    //     slug: '',
    //     tier: 'archive',
    //     title: '',
    //     tagline: '',
    //     year: '2026',
    //     stack: [],
    //     links: [],
    //     role: 'University Coursework',
    //     overview: [
    //     ],
    //     stackFull: [
    //     ],
    // },
    {
        slug: 'runcast',
        tier: 'archive',
        title: 'RunCast',
        tagline: 'A weather app for runners.',
        year: '2025',
        status: 'shipped',
        stack: ['React', 'JavaScript'],
        links: [
            { label: 'GitHub', href: `${GITHUB_URL}/RunCast` },
            { label: 'Live', href: 'https://benk0dev.github.io/RunCast/' },
        ],
        role: 'University Group Project, Team Lead',
        media: [
            { src: runcastCover, caption: 'The live site', alt: 'RunCast Screenshot', type: 'image' },
        ],
        overview: [
            'A weather app aimed at runners rather than general use. It scores current conditions out of ten from temperature, humidity, wind and recent rainfall, and names the specific problem when the score is low, from icy surfaces to hydration in high humidity.',
            'It also recommends what to wear, item by item with the reasoning for each, adjusting for temperature band, rain, night visibility, and grip when the ground is likely to still be wet. Conditions come from two weather APIs, one for current readings and forecast, the other for rainfall over the past few hours.',
            'Led a team of five, covering both design and development.',
        ],
        stackFull: [
            'React',
            'JavaScript',
            'CSS',
            'WeatherAPI',
            'OpenWeatherMap',
            'Figma',
        ],
    },
    {
        slug: 'horse-race-simulator',
        tier: 'archive',
        title: 'Horse Race Simulator',
        tagline: 'A desktop horse racing and betting simulator.',
        year: '2024',
        stack: ['Java'],
        links: [{ label: 'GitHub', href: `${GITHUB_URL}/Horse-Race-Simulator` }],
        role: 'University Project',
        media: [
            { src: '/videos/horse-race-simulator.mp4', caption: 'Runthrough of placing a bet on the simulator', alt: 'Horse Race Simulator Video', type: 'loop', width: 1590, height: 1334 },
        ],
        overview: [
            'A desktop simulator for a series of three horse races. Horses are customisable down to name, colour and saddle, and track length and race count are set before the series starts. Each horse has a confidence value that decides both how fast it runs and how likely it is to fall, so the boldest horse is not always the safest bet.',
            'Odds are not a formula. Before each race the whole thing is simulated ten thousand times and the odds come from how often each horse actually wins. Winning raises a horse\'s confidence and falling lowers it, so form drifts across the series and the odds follow it.',
            'Speed, win rate and fall rate update after every race, with final standings decided on points.',
        ],
        stackFull: [
            'Java',
            'Java Swing',
        ],
    },
    {
        slug: 'portfolio-with-blog',
        tier: 'archive',
        title: 'Portfolio with Blog',
        tagline: 'A portfolio website with a built-in blog.',
        year: '2024',
        stack: ['JavaScript', 'PHP', 'MySQL'],
        links: [{ label: 'GitHub', href: `${GITHUB_URL}/Portfolio-With-Blog` }],
        role: 'University Project',
        media: [
            { src: portfolioWithBlogCover, caption: 'Blog page', alt: 'Portfolio with Blog Screenshot', type: 'image' },
        ],
        overview: [
            'A portfolio site with a blog attached, and my first time building anything with a database behind it. Posts are written through a login protected form with a preview step that renders a post exactly as it will appear before it is saved.',
            'The blog lists posts newest first and can be filtered by month. Built with PHP and MySQL and no framework, so routing, sessions and queries were all written by hand.',
        ],
        stackFull: [
            'HTML',
            'CSS',
            'JavaScript',
            'PHP',
            'MySQL',
        ],
    },
    {
        slug: 'dynamic-noughts-and-crosses-ai',
        tier: 'archive',
        title: 'Dynamic Noughts and Crosses AI',
        tagline: 'A desktop noughts and crosses game against an AI.',
        year: '2023',
        stack: ['Python', 'SQLite', 'Minimax'],
        links: [{ label: 'GitHub', href: `${GITHUB_URL}/Dynamic-Noughts-and-Crosses-AI` }],
        role: 'A-Level Project',
        media: [
            { src: '/videos/dynamic-noughts-and-crosses-ai.mp4', caption: 'Runthrough of playing the game', alt: 'Dynamic Noughts and Crosses AI Video', type: 'loop', width: 2390, height: 1790 },
        ],
        overview: [
            'A desktop game where the board keeps growing. Beat the AI on a 3x3 and the next round is 4x4, then 5x5, and so on, with the run needed to win growing more slowly than the board itself. Draw and the target drops by one, down to a floor of three. Lose and you start over.',
            'The AI holds back on purpose in the scoring mode, varying how far ahead it looks and playing the occasional random move so it stays beatable. A separate mode drops the handicap and searches the full 3x3 tree, where a draw is the best result available.',
            'A local two player mode takes any board size and win length. Finished games can be stepped back through move by move. Accounts and high scores live in a local SQLite database, with a leaderboard covering everyone who has played on that machine.',
        ],
        stackFull: [
            'Python',
            'PyGame',
            'SQLite',
            'Minimax',
        ],
    },
    {
        slug: 'particles-collision-simulator',
        tier: 'archive',
        title: 'Particles Collision Simulator',
        tagline: 'A physics simulation of particles colliding in one-dimensional space.',
        year: '2023',
        stack: ['Python'],
        links: [{ label: 'GitHub', href: `${GITHUB_URL}/Particles-Collision-Simulator` }],
        role: 'Personal Project',
        media: [
            { src: '/videos/particles-collision-simulator.mp4', caption: 'Loop of the simulation running', alt: 'Particles Collision Simulator Video', type: 'loop', width: 1592, height: 990 },
        ],
        overview: [
            'Three balls moving along a line, bouncing off each other and off the walls at either end. Velocities after each impact come from conservation of momentum and the coefficient of restitution.',
            'Masses, starting positions, velocities and elasticity are all set in the script, so the balls can be perfectly elastic or made to lose energy on every collision.',
        ],
        stackFull: [
            'Python',
            'PyGame',
        ],
    },
]

export const CARDS = PROJECTS.filter((project) => project.tier === 'project')
export const ARCHIVE = PROJECTS.filter((project) => project.tier === 'archive')
