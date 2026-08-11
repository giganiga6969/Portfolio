// ── Project types ────────────────────────────────────────────────────────────

export type VisualType =
  | 'alzheimer'
  | 'aerofno'
  | 'kafka'
  | 'securechat'
  | 'kickstarter'

export type ProjectCategory =
  | 'Healthcare AI'
  | 'Scientific ML'
  | 'Distributed Systems'
  | 'Cybersecurity'
  | 'Applied ML'

export interface Project {
  /** Unique numeric identifier — used for display ("01", "02"…) */
  id: number
  /** URL-safe slug */
  slug: string
  /** Display order (ascending) */
  order: number
  title: string
  category: ProjectCategory
  /** Accent color hex — drives card border, badge, and visual theme */
  accentColor: string
  /** Semi-transparent bg for visual canvas */
  bgGlow: string
  /**
   * The hardest technical problem in this project — one sentence.
   * This is the most important copy on the card. Be specific.
   */
  hardProblem: string
  /** 2–3 sentence description */
  description: string
  techStack: string[]
  github: string | null
  live: string | null
  /** Maps to a visual component in src/components/three/visuals/ */
  visualType: VisualType
}

// ── Stack types ───────────────────────────────────────────────────────────────

export type StackCategory = 'AI / ML' | 'Backend' | 'Systems' | 'Tools'

export interface StackItem {
  name: string
  category: StackCategory
}

// ── Timeline types ────────────────────────────────────────────────────────────

export interface TimelineEntry {
  period: string
  title: string
  domain: string
  domainColor: string
  body: string
}

// ── Nav types ─────────────────────────────────────────────────────────────────

export interface NavLink {
  label: string
  href: string
  external?: boolean
}
