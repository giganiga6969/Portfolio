'use client'
import { Suspense, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { padId } from '@/lib/utils'
import { visualRegistry } from '@/components/three/visualRegistry'
import type { Project } from '@/types'

function VisualFallback({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-6 h-6 rounded-full border animate-pulse" style={{ borderColor: color }} />
    </div>
  )
}

interface Props {
  project: Project
  isActive?: boolean
}

export default function ProjectCard({ project, isActive = false }: Props) {
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
        aspectRatio: '16/10',
        borderColor: isActive ? `${project.accentColor}35` : 'rgba(255,255,255,0.05)',
        background: 'rgba(6,6,6,0.9)',
        transformStyle: 'preserve-3d',
      }}
      data-hover
    >
      {/* Canvas */}
      <div className="absolute inset-0">
        <Suspense fallback={<VisualFallback color={project.accentColor} />}>
          <VisualComponent />
        </Suspense>
      </div>

      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 flex items-start justify-between p-5"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)' }}
      >
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
        <span className="font-mono text-[9px] text-tx-4">{padId(project.id)}</span>
      </div>

      {/* Bottom overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 40%, transparent 100%)' }}
      >
        <p className="font-mono text-[10px] mb-1" style={{ color: `${project.accentColor}60` }}>
          engineering challenge ↓
        </p>
        <p className="font-dm text-[13px] text-tx-1 leading-snug mb-3 line-clamp-2">
          {project.hardProblem}
        </p>
        <div className="flex flex-wrap gap-1.5">
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
