'use client'
import { useEffect, useRef } from 'react'

const LINES = [
  { label: '[ Decision ]', text: 'Adopt Kafka for real-time pipeline', color: 'rgba(251,191,36,0.8)' },
  { label: '[ Action ]', text: 'Review segmentation model by Friday', color: 'rgba(251,191,36,0.6)' },
  { label: '[ Owner ]', text: 'Ayush → FNO benchmark', color: 'rgba(251,191,36,0.5)' },
  { label: '[ Next ]', text: 'Ship encrypted broadcast v2', color: 'rgba(251,191,36,0.4)' },
]

export default function MeetingAIVisual() {
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
    const BARS = 40
    const lineProgress = [0, 0, 0, 0] // char reveal progress per line

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = 'rgba(5,5,5,0.95)'
      ctx.fillRect(0, 0, W, H)

      const splitX = W * 0.42

      // ── LEFT: Waveform ──
      const barW = (splitX * 0.85) / BARS
      const waveBase = H * 0.5

      for (let i = 0; i < BARS; i++) {
        const phase = (i / BARS) * Math.PI * 3 - t * 0.06
        const amp = Math.sin(phase) * Math.sin(phase * 0.4 + 1.2)
        const barH = Math.abs(amp) * H * 0.28 + H * 0.02

        const alpha = 0.3 + Math.abs(amp) * 0.55
        ctx.fillStyle = `rgba(251,191,36,${alpha})`
        ctx.fillRect(
          W * 0.06 + i * barW + barW * 0.15,
          waveBase - barH / 2,
          barW * 0.7,
          barH
        )
      }

      // Waveform label
      ctx.font = `400 10px 'JetBrains Mono', monospace`
      ctx.fillStyle = 'rgba(251,191,36,0.3)'
      ctx.fillText('audio input', W * 0.06, H * 0.88)

      // ── ARROW: centre divider ──
      const arrowX = splitX
      ctx.beginPath()
      ctx.moveTo(arrowX - 16, H * 0.5)
      ctx.lineTo(arrowX + 16, H * 0.5)
      ctx.strokeStyle = 'rgba(251,191,36,0.25)'
      ctx.lineWidth = 1
      ctx.stroke()
      // arrowhead
      ctx.beginPath()
      ctx.moveTo(arrowX + 8, H * 0.5 - 5)
      ctx.lineTo(arrowX + 16, H * 0.5)
      ctx.lineTo(arrowX + 8, H * 0.5 + 5)
      ctx.strokeStyle = 'rgba(251,191,36,0.35)'
      ctx.stroke()

      // ── RIGHT: Structured text output ──
      const textStartX = splitX + W * 0.06
      const lineHeight = H * 0.14

      LINES.forEach((line, i) => {
        const yBase = H * 0.25 + i * lineHeight

        // Reveal progress — stagger each line
        const startFrame = i * 55
        if (t > startFrame) {
          const chars = line.label.length + 2 + line.text.length
          lineProgress[i] = Math.min(chars, lineProgress[i] + (t > startFrame + 8 ? 0.6 : 0))
        }

        const totalVisible = Math.floor(lineProgress[i])
        const labelLen = line.label.length
        const fullStr = `${line.label}  ${line.text}`

        // Label part
        ctx.font = `500 10px 'JetBrains Mono', monospace`
        ctx.fillStyle = line.color
        const labelVisible = fullStr.slice(0, Math.min(totalVisible, labelLen))
        ctx.fillText(labelVisible, textStartX, yBase)

        // Body part
        if (totalVisible > labelLen) {
          ctx.font = `400 11px 'JetBrains Mono', monospace`
          ctx.fillStyle = line.color.replace(/[\d.]+\)$/, '0.7)')
          const body = fullStr.slice(labelLen + 2, labelLen + 2 + Math.max(0, totalVisible - labelLen - 2))
          ctx.fillText(body, textStartX, yBase + 17)
        }

        // Cursor on active line
        const activeIdx = LINES.findIndex((_, j) => lineProgress[j] < LINES[j].label.length + 2 + LINES[j].text.length)
        if (i === activeIdx && Math.floor(t * 0.04) % 2 === 0) {
          const charWidth = 7
          const cx = textStartX + (totalVisible % (labelLen + 2) > labelLen ? totalVisible - labelLen - 2 : totalVisible) * charWidth
          ctx.fillStyle = 'rgba(251,191,36,0.7)'
          ctx.fillRect(cx, yBase + (totalVisible > labelLen ? 6 : -11), 1, 12)
        }
      })

      // Reset when all done
      if (lineProgress.every((p, i) => p >= LINES[i].label.length + 2 + LINES[i].text.length) && t > 300) {
        t = 0
        lineProgress.fill(0)
      }

      // Bottom label
      ctx.font = `400 10px 'JetBrains Mono', monospace`
      ctx.fillStyle = 'rgba(251,191,36,0.2)'
      ctx.fillText('LLM pipeline · structured output', W * 0.06, H - 24)

      t++
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

  return <canvas ref={canvasRef} className="project-canvas" />
}
