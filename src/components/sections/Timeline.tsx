'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { timelineEntries } from '@/data/site'
import { staggerContainer, fadeUp } from '@/lib/animations'

export default function Timeline() {
  const lineRef = useRef<SVGLineElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const line = lineRef.current
    const section = sectionRef.current
    if (!line || !section) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) line.classList.add('drawn')
      },
      { threshold: 0.1 }
    )
    obs.observe(section)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="timeline" className="section-y" ref={sectionRef}>
      <div className="max-content section-x">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="font-mono text-[10px] text-tx-4 tracking-[0.18em] uppercase mb-4">06 / Growth</p>
          <h2 className="font-clash text-tx-1" style={{ fontSize: 'clamp(40px,6vw,80px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.0 }}>
            Research &amp; Build
          </h2>
          <p className="font-dm text-tx-2 text-[16px] mt-4 max-w-lg leading-relaxed">
            Selected milestones across my projects, research, and coursework.
          </p>
        </motion.div>

        {/* Timeline layout */}
        <div className="relative max-w-2xl">
          {/* SVG vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px" aria-hidden="true">
            <svg width="1" height="100%" className="overflow-visible">
              <line
                ref={lineRef}
                x1="0" y1="0" x2="0" y2="100%"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                className="timeline-svg-line"
              />
            </svg>
          </div>

          {/* Entries */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="flex flex-col gap-0 pl-10"
          >
            {timelineEntries.map((entry, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative pb-12 last:pb-0"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-10 top-1.5 w-2 h-2 rounded-full border-2 border-bg"
                  style={{ background: entry.domainColor }}
                  aria-hidden="true"
                />

                {/* Period */}
                <p className="font-mono text-[10px] text-tx-4 tracking-wider mb-2 uppercase">
                  {entry.period}
                </p>

                {/* Title */}
                <h3 className="font-clash text-tx-1 text-xl mb-2" style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>
                  {entry.title}
                </h3>

                {/* Domain badge */}
                <span
                  className="font-mono text-[9px] tracking-[0.12em] uppercase px-2 py-0.5 rounded border inline-block mb-3"
                  style={{
                    color: entry.domainColor,
                    borderColor: `${entry.domainColor}35`,
                    background: `${entry.domainColor}0A`,
                  }}
                >
                  {entry.domain}
                </span>

                {/* Body */}
                <p className="font-dm text-[14px] text-tx-2 leading-relaxed max-w-lg">
                  {entry.body}
                </p>

                {/* Connector line to next entry */}
                {i < timelineEntries.length - 1 && (
                  <div
                    className="absolute -left-[37px] top-5 w-px"
                    style={{ height: 'calc(100% - 8px)', background: 'rgba(255,255,255,0.04)' }}
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
