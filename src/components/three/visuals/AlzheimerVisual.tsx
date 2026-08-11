'use client'

import { useEffect, useRef } from 'react'

export default function AlzheimerVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let frame = 0
    let animationId = 0

    const resize = () => {
      width = canvas.offsetWidth || 600
      height = canvas.offsetHeight || 400

      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const draw = () => {
      frame += 1

      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2
      const brainRadius = Math.min(width, height) * 0.28

      // Background glow
      const background = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        brainRadius * 2.2
      )

      background.addColorStop(0, 'rgba(20,40,35,0.9)')
      background.addColorStop(1, 'rgba(0,0,0,0)')

      ctx.fillStyle = background
      ctx.fillRect(0, 0, width, height)

      // Brain layers
      for (let i = 5; i >= 1; i--) {
        const r = brainRadius * (i / 5)

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)

        g.addColorStop(0, `rgba(74,227,181,${0.04 * i})`)
        g.addColorStop(1, 'rgba(74,227,181,0)')

        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      }

      // Segmentation ring
      const pulse = Math.sin(frame * 0.03) * 5

      ctx.beginPath()
      ctx.arc(cx, cy, brainRadius * 0.62 + pulse, 0, Math.PI * 2)

      ctx.strokeStyle = `rgba(74,227,181,${
        0.55 + Math.sin(frame * 0.04) * 0.2
      })`

      ctx.lineWidth = 2
      ctx.setLineDash([8, 5])
      ctx.stroke()
      ctx.setLineDash([])

      // Heatmap regions
      const regions = [
        [-70, -30, 26],
        [60, 20, 22],
        [-10, 55, 18],
      ]

      regions.forEach(([ox, oy, r]) => {
        const x = cx + ox
        const y = cy + oy

        const grad = ctx.createRadialGradient(x, y, 0, x, y, r)

        grad.addColorStop(
          0,
          `rgba(74,227,181,${
            0.18 + Math.sin(frame * 0.02) * 0.05
          })`
        )

        grad.addColorStop(1, 'rgba(74,227,181,0)')

        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })

      // HUD
      ctx.font = '11px monospace'
      ctx.fillStyle = 'rgba(74,227,181,0.85)'
      ctx.fillText('94.7% confidence', 16, height - 40)

      ctx.fillStyle = 'rgba(74,227,181,0.45)'
      ctx.fillText('Early-stage indicators detected', 16, height - 22)

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
    />
  )
}