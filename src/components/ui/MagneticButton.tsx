'use client'
import { useRef } from 'react'

interface Props {
  strength?: number
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  download?: boolean | string
  'aria-label'?: string
}

export default function MagneticButton({
  strength = 0.35,
  as: Tag = 'button',
  href,
  target,
  rel,
  children,
  className,
  onClick,
  download,
  'aria-label': ariaLabel,
}: Props) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * strength
    const y = (e.clientY - r.top - r.height / 2) * strength
    el.style.transform = `translate(${x}px,${y}px)`
    el.style.transition = 'transform 0.1s ease'
  }

  const onLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = ''
    ref.current.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1)'
  }

  if (Tag === 'a') {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        download={download}
        aria-label={ariaLabel}
        className={className}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </button>
  )
}
