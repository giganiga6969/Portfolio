# Ayush Mittal — Portfolio

Personal portfolio for Ayush Mittal, AI Engineer and CS student at PES University, Bengaluru.

Built to communicate one thing clearly: **this person ships real systems.**

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Canvas visuals | HTML Canvas API (no Three.js) |
| Icons | Lucide React |
| Fonts | Space Grotesk (Google Fonts) + DM Sans + JetBrains Mono |
| Deployment | Vercel |

---

## Project Structure

```
ayush-portfolio/
├── public/
│   ├── resume.pdf              ← REPLACE with your actual resume
│   └── favicon.svg
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          Root layout, fonts, metadata
│   │   ├── page.tsx            Page assembly — imports all sections
│   │   └── globals.css         Design tokens, utilities, animations
│   │
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── ProjectShowcase.tsx  ← Main centrepiece
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── Timeline.tsx
│   │   │   ├── TechStack.tsx
│   │   │   ├── GithubShowcase.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Navbar.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   └── MagneticButton.tsx
│   │   │
│   │   └── three/
│   │       ├── visualRegistry.ts   ← Maps VisualType → Component
│   │       └── visuals/
│   │           ├── AlzheimerVisual.tsx
│   │           ├── AeroFNOVisual.tsx
│   │           ├── KafkaVisual.tsx
│   │           ├── SecureChatVisual.tsx
│   │           └── MeetingAIVisual.tsx
│   │
│   ├── data/
│   │   ├── projects.ts         ← SINGLE SOURCE OF TRUTH for all projects
│   │   └── site.ts             Stack, timeline, nav, siteConfig
│   │
│   ├── hooks/
│   │   ├── useTypewriter.ts
│   │   ├── useMagnetic.ts
│   │   ├── useInView.ts
│   │   └── useActiveSection.ts
│   │
│   ├── lib/
│   │   ├── utils.ts            cn(), lerp(), padId(), copyText()
│   │   ├── animations.ts       Framer Motion variants
│   │   └── github.ts           Language colors, formatCount
│   │
│   └── types/
│       └── index.ts            All TypeScript types
│
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Installation

### Prerequisites

- Node.js 18.17.0 or later
- npm 9+ (or pnpm / yarn)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/giganiga6969/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Add your resume
cp /path/to/your/resume.pdf public/resume.pdf

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Development

```bash
# Development server (hot reload)
npm run dev

# Type check (no build output)
npm run type-check

# Lint
npm run lint

# Production build
npm run build

# Start production server (after build)
npm start
```

---

## Environment Variables

No environment variables are required for basic operation.

### Optional: GitHub API rate limit

The GitHub showcase section fetches from the public GitHub API.
Unauthenticated requests are limited to **60 requests/hour**.

For higher traffic, create a GitHub personal access token and add:

```bash
# .env.local
GITHUB_TOKEN=ghp_your_token_here
```

Then update `GithubShowcase.tsx` fetch call:

```typescript
headers: {
  Accept: 'application/vnd.github.v3+json',
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
},
```

---

## Adding a New Project

This is a **data-driven** architecture. Adding a project requires touching exactly **3 files** and no layout changes.

### Step 1 — Add to project registry

Open `src/data/projects.ts` and add a new object:

```typescript
{
  id: 6,                        // next sequential id
  slug: 'your-project-slug',
  order: 6,                     // controls display order
  title: 'Your Project Title',
  category: 'Generative AI',    // see ProjectCategory type
  accentColor: '#FF6B6B',       // hex color for theming
  bgGlow: 'rgba(255,107,107,0.06)',
  hardProblem: 'The specific hardest technical challenge you solved — one sentence, specific.',
  description: '2-3 sentences about the system.',
  techStack: ['Python', 'FastAPI', 'Docker'],
  github: 'https://github.com/yourname/repo',  // or null
  live: null,
  visualType: 'yourvisual',     // must match Step 2
}
```

### Step 2 — Create a canvas visual

Create `src/components/three/visuals/YourVisual.tsx`:

```typescript
'use client'
import { useEffect, useRef } from 'react'

export default function YourVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = canvas.offsetWidth
    let H = canvas.offsetHeight
    canvas.width = W
    canvas.height = H

    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      // your canvas animation here
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight
      canvas.width = W; canvas.height = H
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={canvasRef} className="project-canvas" />
}
```

### Step 3 — Register the visual

Open `src/components/three/visualRegistry.ts`:

```typescript
// Add to the VisualType union in src/types/index.ts:
export type VisualType = 'alzheimer' | 'aerofno' | ... | 'yourvisual'

// Add to the registry:
export const visualRegistry: Record<VisualType, ComponentType> = {
  ...existing,
  yourvisual: dynamic(() => import('./visuals/YourVisual'), { ssr: false }),
}
```

### Step 4 — Deploy

```bash
git add .
git commit -m "feat: add YourProject"
git push
```

Vercel deploys automatically. That's it.

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repository to Vercel at [vercel.com](https://vercel.com) for automatic deploys on push.

### Build output

```bash
npm run build
# Output: .next/
# Static assets: .next/static/
```

### Custom domain

Set in Vercel Dashboard → Project → Settings → Domains.

---

## Font Setup (Production)

The current setup loads **Space Grotesk** from Google Fonts as a substitute for Clash Display.
For production, replace with local font files to eliminate flash of unstyled text (FOUT):

1. Download Clash Display from [fontshare.com](https://www.fontshare.com/fonts/clash-display)
2. Place `.woff2` files in `public/fonts/`
3. Replace the `<style>` block in `layout.tsx` with `localFont` from `next/font/local`

```typescript
import localFont from 'next/font/local'

const clashDisplay = localFont({
  src: [
    { path: '../../public/fonts/ClashDisplay-Regular.woff2', weight: '400' },
    { path: '../../public/fonts/ClashDisplay-Medium.woff2', weight: '500' },
    { path: '../../public/fonts/ClashDisplay-Semibold.woff2', weight: '600' },
    { path: '../../public/fonts/ClashDisplay-Bold.woff2', weight: '700' },
  ],
  variable: '--font-clash',
  display: 'swap',
})
```

---

## Troubleshooting

### `Cannot find module '@/...'`
Make sure `tsconfig.json` has `"paths": { "@/*": ["./src/*"] }`. This is already set.

### GitHub showcase shows nothing
The GitHub API returns 0 results or rate-limits. Check browser Network tab.
Add a `GITHUB_TOKEN` env var as described above.

### Canvas visuals don't appear
All canvas components require a client-side environment. They are loaded with `dynamic(..., { ssr: false })` via the visual registry. If they don't appear, check browser console for canvas context errors.

### Fonts not loading
Space Grotesk requires an internet connection in development. For offline development, install the local font files.

### Build fails with `Module not found`
Run `npm install` to ensure all dependencies are installed.
Check that all imports use the `@/` alias (not relative paths crossing directory boundaries).

### TypeScript errors after adding a project
If you add a new `visualType` string, update the `VisualType` union in `src/types/index.ts` first.

---

## Design System

| Token | Value | Usage |
|---|---|---|
| `bg` (DEFAULT) | `#050505` | Page background |
| `bg-surface` | `#0C0C0C` | Card surfaces |
| `tx-1` | `#F5F7FA` | Primary text |
| `tx-2` | `#8B95A7` | Secondary text |
| `tx-3` | `#3D4451` | Muted text |
| `tx-4` | `#1E2128` | Disabled / ghost |
| `accent` | `#6EE7FF` | Primary accent |
| Font: display | Clash Display / Space Grotesk | Headlines |
| Font: body | DM Sans | Paragraphs |
| Font: mono | JetBrains Mono | Labels, code, metadata |

---

## License

Personal portfolio — not licensed for reuse.
Design and content © 2025 Ayush Mittal.
