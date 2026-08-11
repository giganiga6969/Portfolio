'use client'
import { useEffect, useRef, useState, useCallback, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ArrowUpRight, ExternalLink } from 'lucide-react'
import { orderedProjects } from '@/data/projects'
import { padId } from '@/lib/utils'
import { visualRegistry } from '@/components/three/visualRegistry'
import React from 'react'
import type { Project } from '@/types'

// ── Progress dots ─────────────────────────────────────────────────────────────
function ProgressDots({ total, active, color }: { total: number; active: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === active ? 20 : 5,
            height: 5,
            background: i === active ? color : 'rgba(255,255,255,0.12)',
          }}
        />
      ))}
    </div>
  )
}

// ── Left panel — sticky, one project at a time ────────────────────────────────
function LeftPanel({ project, index }: { project: Project; index: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col justify-center h-full"
      >
        {/* Ghost project number */}
        <div
          className="font-clash select-none pointer-events-none leading-none mb-2"
          style={{
            fontSize: 'clamp(80px,12vw,160px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: `${project.accentColor}08`,
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          {padId(project.id)}
        </div>

        {/* Category */}
        <span
          className="font-mono text-[10px] tracking-[0.14em] uppercase mb-4 inline-block px-2.5 py-1 rounded border w-fit"
          style={{
            color: project.accentColor,
            borderColor: `${project.accentColor}30`,
            background: `${project.accentColor}0A`,
          }}
        >
          {project.category}
        </span>

        {/* Title */}
        <h3
          className="font-clash text-tx-1 mb-5 leading-tight"
          style={{
            fontSize: 'clamp(26px,3.2vw,42px)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            maxWidth: 340,
          }}
        >
          {project.title}
        </h3>

        {/* Hard problem — THE centrepiece of the left panel */}
        <div className="mb-5 p-4 rounded-lg border-l-2" style={{ borderColor: project.accentColor, background: `${project.accentColor}06` }}>
          <p className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: `${project.accentColor}70` }}>
            The engineering challenge
          </p>
          <p className="font-dm text-[14px] leading-[1.7] text-tx-1" style={{}}>
            {project.hardProblem}
          </p>
        </div>

        {/* Description */}
        <p className="font-dm text-[14px] text-tx-2 leading-[1.75] mb-5" style={{ maxWidth: 340 }}>
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] text-tx-3 px-2 py-0.5 rounded border border-white/[0.08] hover:border-white/20 hover:text-tx-2 transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-tx-3 hover:text-tx-1 transition-colors group"
            >
              <Github size={13} />
              <span className="hover-line">View on GitHub</span>
              <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-tx-3 hover:text-tx-1 transition-colors"
            >
              <ExternalLink size={13} />
              <span className="hover-line">Live</span>
            </a>
          )}
          {!project.github && !project.live && (
            <span className="font-mono text-[10px] text-tx-4">Private repository</span>
          )}
        </div>

        {/* Progress dots */}
        <div className="mt-8">
          <ProgressDots total={orderedProjects.length} active={index} color={project.accentColor} />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Visual canvas card ────────────────────────────────────────────────────────
function ProjectVisualCard({ project, isActive }: { project: Project; isActive: boolean }) {
  const VisualComponent = visualRegistry[project.visualType]
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect()
    if (!r) return
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 5,
      y: ((e.clientY - r.top) / r.height - 0.5) * -5,
    })
  }, [])

  const onLeave = useCallback(() => setTilt({ x: 0, y: 0 }), [])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ rotateX: tilt.y, rotateY: tilt.x }}
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      className="relative w-full rounded-2xl overflow-hidden border transition-colors duration-500"
      style={{
        aspectRatio: '16 / 10',
        borderColor: isActive ? `${project.accentColor}35` : 'rgba(255,255,255,0.05)',
        background: 'rgba(6,6,6,0.9)',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      data-hover
    >
      {/* Canvas visual */}
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border animate-pulse" style={{ borderColor: project.accentColor }} />
          </div>
        }
      >
        <div className="absolute inset-0">
          <VisualComponent />
        </div>
      </Suspense>

      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 flex items-start justify-between p-5"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)' }}
      >
        <div>
          <span
            className="font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 rounded border"
            style={{
              color: project.accentColor,
              borderColor: `${project.accentColor}35`,
              background: `${project.accentColor}0C`,
            }}
          >
            {project.category}
          </span>
        </div>
        <span className="font-mono text-[9px] text-tx-4">{padId(project.id)}</span>
      </div>

      {/* Bottom — hardProblem floats over the visual */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 40%, transparent 100%)' }}
      >
        <p className="font-mono text-[10px] mb-0.5" style={{ color: `${project.accentColor}60` }}>
          engineering challenge ↓
        </p>
        <p className="font-dm text-[13px] text-tx-1 leading-snug line-clamp-2">
          {project.hardProblem}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.techStack.slice(0, 4).map((t) => (
            <span key={t} className="font-mono text-[9px] text-tx-4 px-1.5 py-0.5 rounded border border-white/[0.07]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ── Main showcase ─────────────────────────────────────────────────────────────
export default function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  // IntersectionObserver — watch each project block, update active index
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    projectRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i)
        },
        { threshold: 0.5, rootMargin: '-64px 0px -20% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section id="projects" className="section-y" ref={sectionRef}>
      <div className="max-content section-x">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 lg:mb-20"
        >
          <p className="font-mono text-[10px] text-tx-4 tracking-[0.18em] uppercase mb-4">
            05 / Work
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
            Projects
          </h2>
          <p className="font-dm text-tx-2 text-[16px] mt-4 max-w-lg leading-relaxed">
            Five systems. Five hard problems. Each built around a specific engineering constraint rather than just as an exercise.
          </p>
        </motion.div>

        {/* Desktop: sticky left + scrolling right */}
        <div className="hidden lg:flex gap-12 xl:gap-16">
          {/* Sticky left panel */}
          <div
            className="w-[380px] xl:w-[420px] flex-shrink-0"
            style={{ position: 'sticky', top: 80, height: 'calc(100vh - 100px)', alignSelf: 'flex-start' }}
          >
            <LeftPanel project={orderedProjects[activeIndex]} index={activeIndex} />
          </div>

          {/* Scrolling right — project visual cards */}
          <div className="flex-1 flex flex-col gap-[30vh]" style={{ paddingTop: '5vh', paddingBottom: '30vh' }}>
            {orderedProjects.map((project, i) => (
              <div
                key={project.id}
                ref={(el) => { projectRefs.current[i] = el }}
                className="flex items-center"
                style={{ minHeight: '60vh' }}
              >
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectVisualCard project={project} isActive={activeIndex === i} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: vertical stack */}
        <div className="lg:hidden flex flex-col gap-20">
          {orderedProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6"
            >
              {/* Visual */}
              <div className="rounded-xl overflow-hidden border border-white/[0.06]" style={{ aspectRatio: '4/3', background: 'rgba(6,6,6,0.9)' }}>
                <div className="w-full h-full relative">
                  <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-5 h-5 rounded-full border animate-pulse" style={{ borderColor: project.accentColor }} /></div>}>
                    <div className="absolute inset-0">
                      {React.createElement(visualRegistry[project.visualType])}
                    </div>
                  </Suspense>
                </div>
              </div>

              {/* Text */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="font-mono text-[9px] tracking-[0.14em] uppercase px-2 py-0.5 rounded border"
                    style={{ color: project.accentColor, borderColor: `${project.accentColor}35`, background: `${project.accentColor}0C` }}
                  >
                    {project.category}
                  </span>
                  <span className="font-mono text-[9px] text-tx-4">{padId(i + 1)} / 05</span>
                </div>

                <h3 className="font-clash text-tx-1 text-2xl mb-3" style={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
                  {project.title}
                </h3>

                {/* Hard problem — prominent */}
                <div className="mb-4 p-3 rounded-lg border-l-2" style={{ borderColor: project.accentColor, background: `${project.accentColor}06` }}>
                  <p className="font-mono text-[9px] tracking-widest uppercase mb-1.5" style={{ color: `${project.accentColor}70` }}>
                    Engineering challenge
                  </p>
                  <p className="font-dm text-[13px] text-tx-1 leading-relaxed">
                    {project.hardProblem}
                  </p>
                </div>

                <p className="font-dm text-[14px] text-tx-2 leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((t) => (
                    <span key={t} className="font-mono text-[10px] text-tx-3 px-2 py-0.5 rounded border border-white/[0.08]">{t}</span>
                  ))}
                </div>

                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-tx-3 hover:text-tx-1 transition-colors">
                    <Github size={12} />View on GitHub<ArrowUpRight size={10} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
