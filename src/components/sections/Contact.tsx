'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, FileDown, Check } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { copyText } from '@/lib/utils'
import { staggerContainer, fadeUp } from '@/lib/animations'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const ok = await copyText(siteConfig.email)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section id="contact" className="section-y relative overflow-hidden">
      {/* Very subtle gradient mesh — barely perceptible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(110,231,255,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-content section-x relative z-10">
        <div className="max-w-2xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {/* Section label */}
            <motion.p variants={fadeUp} className="font-mono text-[10px] text-tx-4 tracking-[0.18em] uppercase mb-6">
              09 / Contact
            </motion.p>

            {/* Headline — specific, not generic */}
            <motion.div variants={fadeUp} className="overflow-hidden mb-2">
              <h2
                className="font-clash text-tx-1"
                style={{
                  fontSize: 'clamp(40px,6.5vw,88px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.0,
                }}
              >
                {siteConfig.tagline}
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} className="overflow-hidden mb-8">
              <h2
                className="font-clash gradient-text"
                style={{
                  fontSize: 'clamp(40px,6.5vw,88px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.0,
                }}
              >
                {siteConfig.taglineSub}
              </h2>
            </motion.div>

            {/* Subtext */}
            <motion.p variants={fadeUp} className="font-dm text-tx-2 text-[16px] leading-relaxed mb-10 max-w-lg">
              Open to AI engineering internships, research collaborations,
              startup projects, and conversations about hard technical problems.
              PES University — graduating May 2027.
            </motion.p>

            {/* Email — large, copyable */}
            <motion.div variants={fadeUp} className="mb-10">
              <button
                onClick={handleCopy}
                data-hover
                className="group flex items-center gap-3 font-dm text-tx-1 hover:text-accent transition-colors duration-200"
                style={{ fontSize: 'clamp(16px,2.2vw,22px)' }}
                aria-label="Copy email address"
              >
                <span className="hover-line">{siteConfig.email}</span>
                <span className="text-tx-4 group-hover:text-accent transition-colors">
                  {copied ? <Check size={16} /> : <Mail size={16} />}
                </span>
              </button>
              <p className="font-mono text-[10px] text-tx-4 mt-2">
                {copied ? '✓ Copied to clipboard' : 'Click to copy'}
              </p>
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                data-hover
                className="inline-flex items-center gap-2 font-dm text-sm font-medium px-6 py-3 rounded-lg bg-accent text-bg hover:bg-accent-dim transition-colors duration-200"
              >
                <Mail size={14} />
                Send Email
              </a>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="inline-flex items-center gap-2 font-dm text-sm font-medium px-6 py-3 rounded-lg border border-white/[0.1] text-tx-2 hover:text-tx-1 hover:border-white/20 transition-all duration-200"
              >
                <Github size={14} />
                GitHub
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="inline-flex items-center gap-2 font-dm text-sm font-medium px-6 py-3 rounded-lg border border-white/[0.1] text-tx-2 hover:text-tx-1 hover:border-white/20 transition-all duration-200"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
              <a
                href={siteConfig.resume}
                download
                data-hover
                className="inline-flex items-center gap-2 font-dm text-sm font-medium px-6 py-3 rounded-lg border border-white/[0.1] text-tx-2 hover:text-tx-1 hover:border-white/20 transition-all duration-200"
              >
                <FileDown size={14} />
                Resume
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
