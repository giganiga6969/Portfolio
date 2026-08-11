'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin } from 'lucide-react'
import { useTypewriter } from '@/hooks/useTypewriter'
import { siteConfig } from '@/data/site'
import { staggerContainer, fadeUp, wordReveal } from '@/lib/animations'

const ROLES = ['Digital Forensics', 'Medical Imaging', 'Scientific ML', 'Distributed Systems', 'Cybersecurity']
const WORDS = ['BUILDING', 'SYSTEMS', 'THAT MATTER']

// 50 particles, no O(n²) connection lines — clean and fast
function ParticleField() {
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

    const COUNT = 50
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.2 + 0.4,
      a: Math.random() * 0.35 + 0.08,
    }))

    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (const p of pts) {
        p.x = (p.x + p.vx + W) % W
        p.y = (p.y + p.vy + H) % H
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(110,231,255,${p.a})`
        ctx.fill()
      }
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
}

// Domain topology — CSS SVG, zero JS runtime cost
function DomainTopology() {
  const domains = [
    { label: 'MEDICAL IMAGING', x: 80, y: 55 },
    { label: 'SCI · ML', x: 300, y: 30 },
    { label: 'DISTRIBUTED', x: 390, y: 130 },
    { label: 'SECURITY', x: 350, y: 310 },
    { label: 'FORENSICS', x: 100, y: 330 },
  ]
  const edges: [number, number][] = [[0,1],[1,2],[2,3],[3,4],[4,0],[0,2],[1,3],[1,4]]

  return (
    <div className="relative w-full max-w-[520px] aspect-square" aria-hidden="true">
      <svg viewBox="0 0 520 420" className="w-full h-full">
        {/* Connection lines */}
        {edges.map(([a, b], i) => {
          const na = domains[a], nb = domains[b]
          return (
            <line
              key={i}
              x1={na.x + 60} y1={na.y + 14}
              x2={nb.x + 60} y2={nb.y + 14}
              stroke="rgba(110,231,255,0.08)" strokeWidth="0.5"
            />
          )
        })}
        {/* Nodes */}
        {domains.map((d, i) => (
          <g key={i}>
            <circle cx={d.x + 60} cy={d.y + 14} r={i === 0 ? 22 : 14}
              fill="rgba(110,231,255,0.04)" stroke="rgba(110,231,255,0.12)" strokeWidth="0.5" />
            <circle cx={d.x + 60} cy={d.y + 14} r={i === 0 ? 5 : 3}
              fill={i === 0 ? '#6EE7FF' : 'rgba(110,231,255,0.5)'} />
            <text
              x={d.x + 60} y={d.y + 36}
              textAnchor="middle"
              fill="rgba(110,231,255,0.3)"
              fontSize="9"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.08em"
            >
              {d.label}
            </text>
          </g>
        ))}
        {/* Outer perimeter ring */}
        <ellipse cx="260" cy="205" rx="195" ry="175"
          fill="none" stroke="rgba(110,231,255,0.03)" strokeWidth="0.5" />
      </svg>
    </div>
  )
}

export default function Hero() {
  const { text } = useTypewriter({ words: ROLES, typeSpeed: 72, deleteSpeed: 36, pause: 2200 })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ paddingTop: 'var(--nav-height)' }}
    >
      <ParticleField />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom,transparent,#050505)' }} />

      <div className="relative z-10 max-content section-x w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-64px)]">

          {/* LEFT */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center py-20 lg:py-0"
          >
            <motion.p variants={fadeUp}
              className="font-mono text-tx-4 text-[10px] tracking-[0.18em] uppercase mb-8">
              Computer Science Student · PES University · Bengaluru
            </motion.p>

            {/* Headline — each word clips from below */}
            <div className="mb-8" aria-label="Building Systems That Matter">
              {WORDS.map((word, i) => (
                <div key={word} className="overflow-hidden leading-none">
                  <motion.span
                    variants={wordReveal}
                    custom={i}
                    className="block font-clash"
                    style={{
                      fontSize: 'clamp(56px,8.5vw,124px)',
                      fontWeight: 700,
                      letterSpacing: '-0.03em',
                      lineHeight: 0.88,
                      color: word === 'SYSTEMS' ? '#6EE7FF' : '#F5F7FA',
                    }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>

            {/* Typewriter */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5 h-7">
              <span className="font-mono text-accent text-sm select-none">→</span>
              <span className="font-mono text-tx-2 text-[15px]">
                {text}
                <span className="inline-block w-[2px] h-[15px] bg-accent ml-0.5 animate-[cursor-blink_1s_step-end_infinite] align-middle" aria-hidden="true" />
              </span>
            </motion.div>

            {/* Sub */}
            <motion.p variants={fadeUp}
              className="font-dm text-tx-2 text-[16px] leading-[1.75] max-w-[440px] mb-10">
              I&apos;m a CS student at PES University, working across medical imaging,
scientific computing, distributed systems, and cybersecurity. Most recently,
I built a tamper-evident forensic pipeline for autonomous agents during a
research internship at PESU C-ISFCR.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
              <a href="#projects" data-hover
                className="group inline-flex items-center gap-2 font-dm text-sm font-medium px-6 py-[11px] rounded-lg border border-accent/30 bg-accent/[0.07] text-accent hover:bg-accent/[0.13] hover:border-accent/50 transition-all duration-200">
                View Projects
                <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform duration-200" />
              </a>
              <a href={siteConfig.resume} download data-hover
                className="inline-flex items-center gap-2 font-dm text-sm font-medium px-6 py-[11px] rounded-lg border border-white/[0.09] text-tx-2 hover:text-tx-1 hover:border-white/20 transition-all duration-200">
                Resume ↓
              </a>
              <div className="flex items-center gap-1 ml-1">
                <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" data-hover
                  className="p-2 text-tx-4 hover:text-tx-2 transition-colors" aria-label="GitHub">
                  <Github size={15} />
                </a>
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" data-hover
                  className="p-2 text-tx-4 hover:text-tx-2 transition-colors" aria-label="LinkedIn">
                  <Linkedin size={15} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — domain topology */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.5 }}
            className="hidden lg:flex items-center justify-center"
            aria-hidden="true"
          >
            <DomainTopology />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] text-tx-4 tracking-[0.2em] uppercase">scroll</span>
        <div className="animate-[scroll-cue_1.4s_ease-in-out_infinite]">
          <ArrowDown size={11} className="text-tx-4" />
        </div>
      </motion.div>
    </section>
  )
}
