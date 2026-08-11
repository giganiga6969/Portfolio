'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { stackItems } from '@/data/site'
import { staggerContainer, fadeUp } from '@/lib/animations'
import type { StackCategory } from '@/types'

const CATEGORIES: {
  key: StackCategory
  label: string
  accent: string
}[] = [
  { key: 'AI / ML', label: 'AI / ML', accent: '#6EE7FF' },
  { key: 'Backend', label: 'Backend', accent: '#4AE3B5' },
  { key: 'Systems', label: 'Systems', accent: '#A78BFA' },
  { key: 'Tools', label: 'Tools', accent: '#8B95A7' },
]

const certifications = [
  {
    label: 'Problem Solving (Basic)',
    issuer: 'HackerRank',
    date: 'Apr 2025',
    href: '/certifications/problem-solving-basic.pdf',
  },
  {
    label: 'Amazon EC2',
    issuer: 'AWS',
    date: 'Jan 2026',
    href: '/certifications/amazon-ec2.pdf',
  },
  {
    label: 'Amazon VPC',
    issuer: 'AWS',
    date: 'Jan 2026',
    href: '/certifications/amazon-vpc.pdf',
  },
]

export default function TechStack() {
  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    items: stackItems.filter((s) => s.category === cat.key),
  }))

  return (
    <section id="stack" className="section-x section-y">
      <div className="max-content">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-14"
        >
          <p className="font-mono text-[10px] text-tx-4 tracking-widest mb-3">
            07 / Stack
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
            Tech Stack
          </h2>
        </motion.div>

        {/* ── Tech Stack ─────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
        >
          {grouped.map((cat) => (
            <motion.div key={cat.key} variants={fadeUp}>

              {/* Category header */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-1 h-4 rounded-full"
                  style={{ background: cat.accent }}
                />

                <p
                  className="font-mono text-[10px] tracking-[0.14em] uppercase"
                  style={{ color: cat.accent }}
                >
                  {cat.label}
                </p>
              </div>

              {/* Technology pills */}
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item.name}
                    className="stack-pill"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Certifications ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-20 pt-12 border-t border-white/[0.07]"
        >

          {/* Certification heading */}
          <div className="flex items-end justify-between mb-7">
            <div>
              <p className="font-mono text-[12px] text-accent tracking-[0.18em] uppercase mb-2">
                Certifications
              </p>

              <p className="font-dm text-[14px] text-tx-3">
                Verified credentials
              </p>
            </div>

            <span className="font-mono text-[10px] text-tx-4 tracking-[0.14em] uppercase">
              03 Credentials
            </span>
          </div>

          {/* Certification cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certifications.map((cert) => (
              <a
                key={cert.label}
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group min-h-[110px] flex flex-col justify-between p-5 rounded-xl border border-white/[0.08] bg-white/[0.025] hover:border-accent/30 hover:bg-white/[0.045] transition-all duration-300"
              >

                {/* Issuer + external indicator */}
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[9px] text-tx-4 tracking-[0.12em] uppercase">
                    {cert.issuer}
                  </span>

                  <ArrowUpRight
                    size={15}
                    className="text-tx-4 transition-all duration-300 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>

                {/* Certificate title + date */}
                <div>
                  <p className="font-dm text-[16px] text-tx-1">
                    {cert.label}
                  </p>

                  <p className="font-mono text-[10px] text-tx-3 mt-1">
                    {cert.date}
                  </p>
                </div>

              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}