'use client'
import { useEffect, useRef } from 'react'

// Verified results from the repo README (model_metrics.json backed)
const MODELS = [
  { name: 'LightGBM', acc: 0.708, f1: 0.618, auc: 0.774 },
  { name: 'Random Forest', acc: 0.646, f1: 0.607, auc: 0.709 },
  { name: 'Logistic Reg.', acc: 0.650, f1: 0.607, auc: 0.711 },
  { name: 'Ensemble', acc: 0.694, f1: 0.631, auc: 0.757 },
]

const METRIC_COLORS = {
  acc: 'rgba(52,211,153,0.85)',
  f1: 'rgba(52,211,153,0.55)',
  auc: 'rgba(52,211,153,0.3)',
}

export default function KickstarterVisual() {
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

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = 'rgba(5,5,5,0.95)'
      ctx.fillRect(0, 0, W, H)

      const growth = Math.min(1, t / 60)
      const eased = 1 - Math.pow(1 - growth, 3)

      const chartTop = H * 0.14
      const chartBottom = H * 0.78
      const chartLeft = W * 0.1
      const chartRight = W * 0.94
      const groupW = (chartRight - chartLeft) / MODELS.length
      const barW = groupW * 0.2

      // Gridlines
      for (let i = 0; i <= 4; i++) {
        const y = chartBottom - ((chartBottom - chartTop) * i) / 4
        ctx.strokeStyle = 'rgba(255,255,255,0.04)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(chartLeft, y)
        ctx.lineTo(chartRight, y)
        ctx.stroke()
      }

      MODELS.forEach((m, i) => {
        const groupCx = chartLeft + groupW * (i + 0.5)
        const metrics: [number, string][] = [
          [m.acc, METRIC_COLORS.acc],
          [m.f1, METRIC_COLORS.f1],
          [m.auc, METRIC_COLORS.auc],
        ]
        metrics.forEach(([val, color], j) => {
          const barH = (chartBottom - chartTop) * val * eased
          const x = groupCx - barW * 1.5 + j * barW
          ctx.fillStyle = color
          ctx.fillRect(x, chartBottom - barH, barW * 0.8, barH)
        })

        // Model label
        ctx.font = `500 9px 'JetBrains Mono', monospace`
        ctx.fillStyle = m.name === 'Ensemble' ? 'rgba(52,211,153,0.9)' : 'rgba(255,255,255,0.35)'
        ctx.textAlign = 'center'
        ctx.fillText(m.name, groupCx, chartBottom + 16)
      })
      ctx.textAlign = 'left'

      // Legend
      const legendY = H * 0.9
      const legendItems: [string, string][] = [
        ['Accuracy', METRIC_COLORS.acc],
        ['F1', METRIC_COLORS.f1],
        ['ROC-AUC', METRIC_COLORS.auc],
      ]
      let lx = chartLeft
      ctx.font = `400 9px 'JetBrains Mono', monospace`
      legendItems.forEach(([label, color]) => {
        ctx.fillStyle = color
        ctx.fillRect(lx, legendY - 7, 8, 8)
        ctx.fillStyle = 'rgba(255,255,255,0.4)'
        ctx.fillText(label, lx + 12, legendY)
        lx += ctx.measureText(label).width + 34
      })

      // Header label
      ctx.font = `500 10px 'JetBrains Mono', monospace`
      ctx.fillStyle = 'rgba(52,211,153,0.5)'
      ctx.fillText('held-out test set · ~220K campaigns', chartLeft, H * 0.08)

      t++
      if (t < 90) raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight
      canvas.width = W; canvas.height = H
      t = 0
      draw()
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={canvasRef} className="project-canvas" />
}
