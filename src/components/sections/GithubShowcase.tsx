'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Star, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { orderedProjects } from '@/data/projects'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { formatCount, getGithubLanguageColor } from '@/lib/github'

interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  updated_at: string
}

function RepoCard({ repo, accentColor }: { repo: Repo; accentColor: string }) {
  const since = (() => {
    const d = new Date(repo.updated_at)
    const days = Math.floor((Date.now() - d.getTime()) / 86400000)
    if (days < 1) return 'Today'
    if (days < 7) return `${days}d ago`
    if (days < 30) return `${Math.floor(days / 7)}w ago`
    return `${Math.floor(days / 30)}mo ago`
  })()

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      data-hover
      className="group block rounded-xl border border-white/[0.06] bg-white/[0.015] p-5 hover:border-white/[0.12] hover:bg-white/[0.025] transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Github size={13} className="text-tx-4 flex-shrink-0" />
          <span className="font-mono text-[11px] text-tx-2 group-hover:text-tx-1 transition-colors truncate">
            {repo.name}
          </span>
        </div>
        <ArrowUpRight
          size={13}
          className="text-tx-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
        />
      </div>

      {repo.description && (
        <p className="font-dm text-[13px] text-tx-3 leading-relaxed mb-4 line-clamp-2">
          {repo.description}
        </p>
      )}

      <div className="flex items-center gap-4 flex-wrap">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: getGithubLanguageColor(repo.language) }}
            />
            <span className="font-mono text-[10px] text-tx-4">{repo.language}</span>
          </div>
        )}
        {repo.stargazers_count > 0 && (
          <div className="flex items-center gap-1">
            <Star size={10} className="text-tx-4" />
            <span className="font-mono text-[10px] text-tx-4">
              {formatCount(repo.stargazers_count)}
            </span>
          </div>
        )}
        <span className="font-mono text-[10px] text-tx-4 ml-auto">{since}</span>
      </div>

      {/* Accent rule on hover */}
      <div
        className="mt-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${accentColor}50, transparent)` }}
      />
    </a>
  )
}

export default function GithubShowcase() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const PINNED = orderedProjects
      .filter((p) => p.github !== null)
      .map((p) => p.github!.split('/').pop()!)

    fetch('https://api.github.com/users/giganiga6969/repos?sort=updated&per_page=30', {
      headers: { Accept: 'application/vnd.github.v3+json' },
    })
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub API ${r.status}`)
        return r.json() as Promise<Repo[]>
      })
      .then((data) => {
        const pinned = data.filter((r) => PINNED.includes(r.name))
        const sorted = PINNED
          .map((name) => pinned.find((r) => r.name === name))
          .filter((r): r is Repo => r !== undefined)
        setRepos(sorted.length > 0 ? sorted : data.slice(0, 4))
      })
      .catch(() => setRepos([]))
      .finally(() => setLoading(false))
  }, [])

  const accentColors = orderedProjects.reduce<Record<string, string>>((acc, p) => {
    if (p.github) {
      const name = p.github.split('/').pop()
      if (name) acc[name] = p.accentColor
    }
    return acc
  }, {})

  return (
    <section id="github" className="section-y border-t border-white/[0.04]">
      <div className="max-content section-x">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex items-end justify-between flex-wrap gap-4"
        >
          <div>
            <p className="font-mono text-[10px] text-tx-4 tracking-[0.18em] uppercase mb-4">
              08 / Open Source
            </p>
            <h2
              className="font-clash text-tx-1"
              style={{
                fontSize: 'clamp(40px,6vw,80px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
              }}
            >
              GitHub
            </h2>
          </div>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="flex items-center gap-1.5 font-mono text-[11px] text-tx-3 hover:text-tx-1 transition-colors"
          >
            <Github size={13} />
            giganiga6969
            <ArrowUpRight size={11} />
          </a>
        </motion.div>

        {/* Repo cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.05] bg-white/[0.01] p-5 animate-pulse"
                style={{ height: 130 }}
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {repos.map((repo) => (
              <motion.div key={repo.id} variants={fadeUp}>
                <RepoCard
                  repo={repo}
                  accentColor={accentColors[repo.name] ?? '#6EE7FF'}
                />
              </motion.div>
            ))}
            {repos.length === 0 && (
              <p className="font-mono text-[11px] text-tx-4 col-span-2 py-8 text-center">
                Visit{' '}
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover-line"
                >
                  github.com/giganiga6969
                </a>{' '}
                to see all repositories.
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
