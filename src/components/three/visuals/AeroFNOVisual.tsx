'use client'
import { useEffect, useRef } from 'react'

export default function AeroFNOVisual() {
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

    let t = 0
    let raf = 0

    // Fourier components
    const waves = [
      { freq: 1, amp: 0.12, speed: 0.8, color: 'rgba(56,189,248,0.7)', width: 2 },
      { freq: 2, amp: 0.07, speed: 1.4, color: 'rgba(56,189,248,0.45)', width: 1.5 },
      { freq: 4, amp: 0.04, speed: 2.1, color: 'rgba(56,189,248,0.25)', width: 1 },
      { freq: 8, amp: 0.02, speed: 3.2, color: 'rgba(56,189,248,0.15)', width: 0.7 },
    ]

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      // const cx = W / 2  // unused — calculations use W directly
      const cy = H / 2

      // Background gradient — deep blue/dark
      const bgGrad = ctx.createLinearGradient(0, 0, W, H)
      bgGrad.addColorStop(0, 'rgba(2,10,20,0.95)')
      bgGrad.addColorStop(1, 'rgba(5,5,5,0)')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, W, H)

      // Flow field — streamlines
      const numLines = 12
      for (let i = 0; i < numLines; i++) {
        const yBase = (H * 0.1) + (H * 0.8) * (i / (numLines - 1))
        ctx.beginPath()
        for (let x = 0; x <= W; x += 3) {
          const progress = x / W
          let y = yBase
          for (const w of waves) {
            y += Math.sin(progress * w.freq * Math.PI * 2 - t * w.speed * 0.04) * w.amp * H * 0.3
          }
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        const alpha = 0.04 + (0.02 * Math.sin(i + t * 0.02))
        ctx.strokeStyle = `rgba(56,189,248,${alpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Fourier component waves — center of canvas
      const waveY = cy * 0.7
      for (const wave of waves) {
        ctx.beginPath()
        for (let x = 0; x <= W; x += 2) {
          const progress = x / W
          const y = waveY + Math.sin(progress * wave.freq * Math.PI * 2 - t * wave.speed * 0.04) * wave.amp * H
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = wave.color
        ctx.lineWidth = wave.width
        ctx.stroke()
      }

      // Sum wave (final FNO output)
      ctx.beginPath()
      for (let x = 0; x <= W; x += 2) {
        const progress = x / W
        let y = waveY
        for (const wave of waves) {
          y += Math.sin(progress * wave.freq * Math.PI * 2 - t * wave.speed * 0.04) * wave.amp * H
        }
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = 'rgba(56,189,248,0.9)'
      ctx.lineWidth = 2.5
      ctx.stroke()

      // Frequency rings (top right)
      const ringCx = W * 0.82
      const ringCy = H * 0.28
      for (let i = 1; i <= 4; i++) {
        const r = i * 18
        const alpha = 0.06 + (4 - i) * 0.04 + Math.sin(t * 0.03 + i) * 0.02
        ctx.beginPath()
        ctx.arc(ringCx, ringCy, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(56,189,248,${alpha})`
        ctx.lineWidth = 0.5 + i * 0.1
        ctx.stroke()
      }
      ctx.fillStyle = 'rgba(56,189,248,0.8)'
      ctx.beginPath()
      ctx.arc(ringCx, ringCy, 3, 0, Math.PI * 2)
      ctx.fill()

      // Labels
      ctx.font = `500 11px 'JetBrains Mono', monospace`
      ctx.fillStyle = 'rgba(56,189,248,0.5)'
      ctx.fillText('ω₁ + ω₂ + ω₃ + ω₄ = f(x)', 14, H - 40)
      ctx.fillStyle = 'rgba(56,189,248,0.25)'
      ctx.fillText('FNO: F⁻¹(R · F[v])', 14, H - 24)
      ctx.fillText('freq. domain', ringCx - 40, ringCy + 90)

      t++
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight
      canvas.width = W; canvas.height = H
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={canvasRef} className="project-canvas" />
}
