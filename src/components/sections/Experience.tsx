'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ArrowUpRight, ChevronDown } from 'lucide-react'
import { afemExperience } from '@/data/experience'
import { staggerContainer, fadeUp } from '@/lib/animations'

export default function Experience() {
  const [expanded, setExpanded] = useState(false)
  const { accentColor } = afemExperience

  return (
    <section id="experience" className="section-y border-t border-white/[0.04]">
      <div className="max-content section-x">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <p className="font-mono text-[10px] text-tx-4 tracking-[0.18em] uppercase mb-4">
            04 / Experience
          </p>
          <h2
            className="font-clash text-tx-1"
            style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0 }}
          >
            Research Internship
          </h2>
          <p className="font-dm text-tx-2 text-[16px] mt-4 max-w-lg leading-relaxed">
            One internship, five phases, 268 passing tests. The most substantial thing I&apos;ve built.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl border overflow-hidden"
          style={{ borderColor: `${accentColor}25`, background: 'rgba(255,255,255,0.015)' }}
        >
          {/* Top accent line */}
          <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)` }} />

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Header row */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
              <div>
                <span
                  className="font-mono text-[10px] tracking-[0.14em] uppercase mb-3 inline-block px-2.5 py-1 rounded border"
                  style={{ color: accentColor, borderColor: `${accentColor}35`, background: `${accentColor}0C` }}
                >
                  Digital Forensics
                </span>
                <h3 className="font-clash text-tx-1 text-2xl sm:text-3xl mb-1" style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>
                  {afemExperience.role} — AFEM
                </h3>
                <p className="font-mono text-[12px] text-tx-3">
                  {afemExperience.org} · {afemExperience.location}
                </p>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-3 flex-shrink-0">
                <span className="font-mono text-[11px] text-tx-4 tracking-wide">{afemExperience.period}</span>
                <a
                  href={afemExperience.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] text-tx-3 hover:text-tx-1 transition-colors group"
                >
                  <Github size={13} />
                  <span className="hover-line">View on GitHub</span>
                  <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

            {/* Summary */}
            <p className="font-dm text-[15px] text-tx-2 leading-[1.8] mb-10 max-w-3xl">
              {afemExperience.summary}
            </p>

            {/* 5-phase pipeline */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-10"
            >
              {afemExperience.phases.map((phase) => (
                <motion.div
                  key={phase.number}
                  variants={fadeUp}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.015] p-4 flex flex-col"
                >
                  <span
                    className="font-mono text-[10px] tracking-widest mb-2"
                    style={{ color: `${accentColor}90` }}
                  >
                    PHASE {phase.number}
                  </span>
                  <h4 className="font-dm text-[13px] text-tx-1 font-medium mb-2 leading-snug">
                    {phase.title}
                  </h4>
                  <p className="font-dm text-[11.5px] text-tx-3 leading-relaxed">
                    {phase.summary}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Metrics row */}
            <div className="flex flex-wrap gap-x-10 gap-y-4 pt-6 border-t border-white/[0.06] mb-2">
              {afemExperience.metrics.map((m) => (
                <div key={m.label}>
                  <p className="font-clash text-2xl text-tx-1" style={{ fontWeight: 600 }}>{m.value}</p>
                  <p className="font-mono text-[10px] text-tx-3 mt-1 tracking-wide">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Expand toggle */}
            <button
              onClick={() => setExpanded((v) => !v)}
              data-hover
              className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] text-tx-3 hover:text-tx-1 transition-colors"
            >
              {expanded ? 'Hide technical breakdown' : 'Read the technical breakdown'}
              <ChevronDown size={13} className="transition-transform duration-300" style={{ transform: expanded ? 'rotate(180deg)' : 'none' }} />
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 p-5 rounded-xl border-l-2" style={{ borderColor: accentColor, background: `${accentColor}06` }}>
                    <p className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: `${accentColor}80` }}>
                      {afemExperience.detail.heading}
                    </p>
                    <p className="font-dm text-[14px] text-tx-1 leading-[1.75] mb-5">
                      {afemExperience.detail.body}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {afemExperience.detail.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] text-tx-3 px-2 py-0.5 rounded border border-white/[0.08]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
