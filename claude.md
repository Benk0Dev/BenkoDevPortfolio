# benkodev.com

Personal portfolio for Benas "Benko" Kuliesis. Software Development Engineer at
Amazon Prime Video. Audience, in priority order: founders and startup people,
engineers, recruiters.

This file is the source of truth for design and conventions. If a request
conflicts with a rule here, say so before implementing.

---

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15, App Router |
| Language | TypeScript, `strict: true` |
| Styling | Tailwind v4, CSS-first config in `@theme`. No `tailwind.config.js` |
| Motion | `motion` v12, imported from `motion/react` |
| Theme | `next-themes`, class strategy |
| Fonts | `next/font/local`, self-hosted |
| Icons | `lucide-react` |
| Deploy | Vercel |

No CMS. No database. No form backend. No smooth-scroll library.

---

## Routes

```
/                    Homepage, single scroll
/projects/[slug]     Case study, every project has one
/cv                  Redirect to the PDF
```

Everything static at build time. No client-side data fetching.

---

## Section order

Homepage:

```
Hero        photo, "Benko.", one line, View CV + socials, scroll cue
About       claim line, job line, 3 discipline blocks, facts row
Projects    featured card full width, then 2-col grid
Archive     compact list, internal links
Stack       compact strip, no big heading
Footer      source link left, social icons right
```

Project page:

```
Pill nav
← Projects
Title, tagline, meta row, external link pills
Slider
Overview
Stack
Decisions
Results
Footer
```

Do not add a Contact section. Do not add a Next Project block. Do not add a
Media section, the slider covers it.

---

## Design tokens

Define once in `@theme`, flip under `.dark`. Never hardcode hex in components.

### Colour

```
Dark (default)          Light
bg      #000000         #FAFAF9
fg      #FAFAF9         #0A0A0A
muted   #B2B2B0         #4E4E4C
subtle  #949492         #6B6B69
faint   #7A7A78         #858583
ghost   #3E3E3C         #C2C2BC
line    rgb(250 250 249 / 0.12)   rgb(10 10 10 / 0.12)
card    #0C0C0B         #F2F2EF
card-hover #171716      #E9E9E5
accent  #3D5AFE         #3D5AFE
```

Body copy uses `muted`. Headings and emphasis use `fg`. Mono labels use `faint`.
Never use opacity on text, use a token.

### Type

Two faces only.

```
--font-display   Geist
--font-mono      Geist Mono
```

Display sizes, all `font-weight: 500`, never 600 or 700:

```
hero      clamp(3.5rem, 11vw, 9.5rem)   leading 1     tracking -0.055em
section   clamp(2.5rem, 7vw, 5rem)      leading 1     tracking -0.048em
project   clamp(2.5rem, 6vw, 4rem)      leading 1     tracking -0.052em
lead      clamp(1.15rem, 2vw, 1.5rem)   leading 1.4   tracking -0.018em
card      1.25rem to 1.5rem             leading 1.2   tracking -0.035em
body      0.875rem                      leading 1.7
```

Mono is used for all metadata, labels, nav, tags and small print:

```
font-size: 0.625rem
letter-spacing: 0.15em
text-transform: uppercase
```

`text-wrap: balance` on headings, `text-wrap: pretty` on body.

The card size is `--text-card-title` in `@theme`, not `--text-card`. Tailwind
derives `text-*` utilities from both `--text-*` and `--color-*`, so a size and
a colour sharing a name collide and the colour wins.

---

## Layout rules

**Everything is centred.** Content column `max-width: 34rem` for prose,
`max-width: 44rem` for card grids and multi-column blocks.

**Four exceptions are left-aligned**, and only these four:

1. Decision paragraphs on project pages
2. Stack strip rows (label column needs a shared left edge)
3. About discipline blocks
4. Project card body text

Rule of thumb: anything over three lines is left-aligned inside a centred
container. Anything shorter is centred.

Section spacing: `clamp(4rem, 10vw, 8rem)` between sections.

Section headings are large and centred with nothing above them. No eyebrow
labels, no section numbers, no left rail.

---

## Accent rule

`#3D5AFE` is the only colour on the site. It carries weight because it is rare.

**At most one accent element visible at a time.** Not a global count, a
per-viewport rule. If two accent elements would appear on screen together,
one of them is wrong.

Sanctioned uses:

- `BK` logo in nav
- Full stop after "Benko" in the hero
- "Amazon Prime Video" in the About lead
- "Startups" value in the About facts row
- "Featured" badge on the featured project card
- "Shipped" status on a project page meta row
- Active dot in the slider

Never use accent for: body text, links in prose, hover states, borders on
anything other than the Featured badge, or more than one item in the same row.

---

## Arrow convention

```
↗   (arrow-up-right)   leaves the site: CV, GitHub, live demo, source
→   (arrow-right)      stays on the site: project cards, archive rows
←   (arrow-left)       back navigation
```

Never mix these up. An internal link with `↗` reads as broken.

---

## Dot background

Framing pattern down the left and right edges of every section, faded out
toward the centre so content sits on clean black. The mask runs horizontally,
so the dots form two vertical bands rather than a ring.

```css
.dots {
  background-image: radial-gradient(circle, var(--dot) 2px, transparent 2px);
  background-size: 22px 22px;
  mask-image: linear-gradient(to right, black 0%, transparent 24%, transparent 76%, black 100%);
}
```

Both stops must carry the same radius. A smaller transparent stop kills the
antialiasing and the dots go hard edged.

`--dot` is `rgb(250 250 249 / 0.16)` dark, `rgb(10 10 10 / 0.08)` light. Dark
needs roughly double the alpha, white on black reads far fainter than black on
off-white at the same value.

On mobile, tighten `background-size` to 16px and drop to
`rgb(250 250 249 / 0.11)` dark, `rgb(10 10 10 / 0.05)` light.

Never fade the dots top-down. It collides with the hero photo fade.

---

## Nav

Two states, one component, used on every page.

**At top:** fully transparent. No border, no background. Logo left, links
centre, theme toggle right.

**Scrolled:** a single centred floating pill containing logo, links and toggle.
Background `#131312`, `0.5px` border, `border-radius: 99px`, backdrop blur.
Padding is an even `10px` with a `26px` gap between the logo, the link list
and the toggle. The logo and the toggle are both square boxes, so the padding
has no reason to be asymmetric. The link list needs breathing room around it.

Left padding is `--pill-pad-left` in `globals.css`, kept on its own so the
pill can be balanced by eye without touching the component.

**Transition is a crossfade, not a morph.** Fade the bare nav out over 150ms,
fade and rise the pill in with `scale(0.96)` to `scale(1)`. Do not try to
animate elements across the viewport.

**Use an IntersectionObserver sentinel**, not a scroll listener:

```tsx
const [scrolled, setScrolled] = useState(false)
useEffect(() => {
  const el = document.getElementById('nav-sentinel')
  if (!el) return
  const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting))
  io.observe(el)
  return () => io.disconnect()
}, [])
```

Links: `Home`, `About`, `Projects`. Three only. All the same muted colour with
**no active state**, brightening only on hover. On the homepage they are
anchors, on project pages they point back to `/#about` etc.

Set `scroll-margin-top: 6rem` on every anchored section or the pill covers the
heading on jump.

---

## Data model

One file, `data/projects.ts`. One type. `tier` controls homepage presentation
only, every project gets a slug page. `featured` is separate from `tier` and
only decides whether a card carries the Featured pill.

```ts
export type Project = {
  slug: string
  tier: 'project' | 'archive'
  title: string
  tagline: string
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
```

Array order is display order. No sort logic.

`generateStaticParams` maps every project, not just featured ones.

Project page sections render conditionally on their field being present. An
archive project with only `overview` and `media` should still look intentional.

**Do not invent project copy.** Leave `TODO` strings if content is missing.

---

## Slider

Used for the project page cover. Behaviour:

- **Frameless.** No border, no background panel. Only the image and the arrows
  are visible.
- **Fixed height container** (`clamp(16rem, 45vh, 30rem)`), `object-fit: contain`.
  Height must not change between slides.
- Arrows pinned to the left and right edges of the invisible container so they
  stay put regardless of image aspect ratio.
- Image capped at `calc(100% - 5rem)` wide so it never sits under the arrows.
- Dots below, active dot is a wider pill in accent.
- **With one image:** identical layout, no arrows, no dots.
- Keyboard arrow keys and touch swipe both supported.

Loops are `.mp4` (muted, autoplay, loop, playsinline) or animated `.webp`,
treated as images in the data model. Never actual `.gif`.

---

## Motion

Shared easing: `cubic-bezier(0.16, 1, 0.3, 1)`. Durations 180ms to 420ms.

- Hero words rise and fade on load, 40ms stagger, once, not scroll-triggered
- Section content rises 24px and fades on enter, 60ms stagger between children
- Results numbers count up when scrolled into view
- Theme toggle uses a View Transitions circular wipe from the button
- Project title shares a `view-transition-name` between the card and the
  project page so it travels on navigation

Use CSS scroll-driven animations (`animation-timeline: view()`) for simple
enter transitions. Reserve `motion` for the hero sequence, hover physics and
the count-up.

**Non-negotiable:**

- `prefers-reduced-motion: reduce` kills every transform and stagger, keeps
  opacity fades at 100ms
- Transform and opacity only, never layout properties
- All text readable if JS fails
- No scroll hijacking. Native scroll, `scroll-behavior: smooth` guarded by a
  reduced-motion query

---

## Responsive

Mobile is the primary target, most traffic arrives from LinkedIn and X.

| Width | Behaviour |
|---|---|
| `< 640px` | Single column. Hero clamps to ~4rem. Cards stack. Nav pill holds all three links, no hamburger. Dots tighten. |
| `640 to 1024px` | Two-column card grid. Facts row stays 3-up. |
| `> 1024px` | Full layout. |

Use `dvh` not `vh` for the hero. Use container queries for cards so they
respond to their own space.

Test at 375, 768, 1440 and 2560. Test on a real phone over local network,
not just the responsive simulator.

---

## Performance

- Lighthouse 100 across the board, mobile throttled
- LCP under 1.2s, hero is text so keep heavy images below the fold
- Zero CLS, self-hosted fonts with `size-adjust`, explicit image dimensions
- AVIF or WebP via `next/image`, `priority` only on the project cover
- Total JS under 100kb gzipped

---

## Copy rules

- **No em dashes anywhere.** Use commas, full stops or parentheses.
- Sentence case for headings and buttons. Uppercase only for mono labels.
- No filler: avoid "passionate", "leverage", "seamless", "cutting edge",
  "results-driven".
- No hedging: "though not limited to", "I'm always looking to" and similar
  weaken every sentence they appear in.
- Prefer specific over impressive. "50+ business metrics" beats "large scale".
- British spelling.

---

## Deliberately excluded

Do not add these, they were considered and rejected:

- Contact form or contact section
- Phone number
- `/projects` index page
- Search
- Blog
- Accordion on the stack section
- Skills percentage bars
- Experience and education sections (they are on the CV)
- Active state on nav links
- Next Project block on case studies
- Wordmark or logo in the footer
- Smooth-scroll libraries

---

## File structure

```
app/
  layout.tsx
  page.tsx
  projects/[slug]/page.tsx
  projects/[slug]/opengraph-image.tsx
  cv/route.ts
  sitemap.ts
  robots.ts
  globals.css
components/
  nav.tsx
  hero.tsx
  about.tsx
  projects.tsx
  archive.tsx
  stack.tsx
  footer.tsx
  slider.tsx
  dots.tsx
data/
  projects.ts
  stack.ts
public/
  images/
  benko.png
  cv.pdf
```

---

## Build order

Commit after each. One section per session.

1. Tokens, fonts, theme switching, layout primitives
2. Nav, both states
3. Hero
4. About
5. Projects cards and archive list
6. Stack strip and footer
7. `/projects/[slug]` and `generateStaticParams`
8. Metadata, OG images, sitemap, JSON-LD Person schema
9. Reduced motion pass, mobile pass, Lighthouse pass

`data/projects.ts` gets populated alongside the sections that read from it,
not as a step of its own.

---

## Working notes

- Ask before adding a dependency
- Ask before adding a section, page or nav link
- Prefer editing an existing component over creating a new one
- If a design decision here seems wrong, say so rather than working around it