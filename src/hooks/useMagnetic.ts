'use client'
import { useRef, useCallback } from 'react'

export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width / 2) * strength
      const y = (e.clientY - r.top - r.height / 2) * strength
      el.style.transform = `translate(${x}px,${y}px)`
      el.style.transition = 'transform 0.1s ease'
    },
    [strength]
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0,0)'
    el.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
