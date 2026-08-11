'use client'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, slideLeft } from '@/lib/animations'
import { marqueeItems } from '@/data/site'

export default function About() {
  return (
    <section id="about" className="section-y overflow-hidden">
      <div className="max-content section-x">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-16 lg:gap-24 items-start">
          {/* ── LEFT: heading ── */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative"
          >
            <div className="ghost-num absolute -top-8 -left-4 select-none pointer-events-none" aria-hidden="true">
              03
            </div>
            <p className="font-mono text-[10px] text-tx-4 tracking-[0.15em] uppercase mb-4">About</p>
            <h2 className="font-clash text-display-md text-tx-1" style={{ fontWeight: 600 }}>
              About Me
            </h2>
          </motion.div>

          {/* ── RIGHT: content ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-8"
          >
            {/* P1 */}
            <motion.div variants={fadeUp}>
              <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-3">[ focus ]</p>
              <p className="font-dm text-[17px] text-tx-2 leading-[1.8]">
                I&apos;m a Computer Science student at{' '}
                <strong className="text-tx-1 font-medium">PES University, Bengaluru</strong> (Class of 2027).
                I like building things, taking them apart when they break, and figuring out why they work the way they do. Most of my work has taken me across AI, systems, cybersecurity, and scientific computing.
              </p>
            </motion.div>

            {/* P2 */}
            <motion.div variants={fadeUp}>
              <p className="font-mono text-[10px] text-accent tracking-widest uppercase mb-3">[ approach ]</p>
              <p className="font-dm text-[17px] text-tx-2 leading-[1.8]">
                I tend to follow interesting problems rather than a particular technology. Sometimes that means exploring how a model can predict what happens next, sometimes building systems that have to handle real-time data, and sometimes figuring out what actually happened inside an autonomous agent. I enjoy the process of going from “this should work” to actually making it work.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="flex gap-10 pt-4 border-t border-white/[0.06]">
              <div>
                <p className="font-clash text-4xl text-tx-1" style={{ fontWeight: 600 }}>6</p>
                <p className="font-mono text-[11px] text-tx-3 mt-1 tracking-wide">Projects</p>
              </div>
              <div>
                <p className="font-clash text-4xl text-tx-1" style={{ fontWeight: 600 }}>5</p>
                <p className="font-mono text-[11px] text-tx-3 mt-1 tracking-wide">Domains</p>
              </div>
              <div>
                <p className="font-clash text-4xl text-tx-1" style={{ fontWeight: 600 }}>2023</p>
                <p className="font-mono text-[11px] text-tx-3 mt-1 tracking-wide">Started Building</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Marquee strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-20 marquee-wrap"
      >
        <div className="marquee-track marquee-fwd py-4">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="stack-pill mx-2 flex-shrink-0"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
