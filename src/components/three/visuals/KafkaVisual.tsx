'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  t: number
  speed: number
  path: number  // 0=top producer, 1=mid, 2=bottom producer
  phase: 'to-broker' | 'to-consumer'
  consumerIdx: number
  color: string
}

export default function KafkaVisual() {
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

    let frame = 0
    let raf = 0
    const particles: Particle[] = []
    const COLORS = ['rgba(167,139,250,0.9)', 'rgba(167,139,250,0.7)', 'rgba(167,139,250,0.5)']

    // Spawn particles
    const spawn = () => {
      if (frame % 28 === 0) {
        particles.push({
          t: 0, speed: 0.008 + Math.random() * 0.005,
          path: Math.floor(Math.random() * 3),
          phase: 'to-broker', consumerIdx: Math.floor(Math.random() * 3),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Background
      ctx.fillStyle = 'rgba(5,5,5,0.9)'
      ctx.fillRect(0, 0, W, H)

      const pad = W * 0.1
      const prodX = pad
      const brokerX = W / 2
      const consX = W - pad

      // Producer positions (3)
      const prodYs = [H * 0.25, H * 0.5, H * 0.75]
      // Consumer positions (3)
      const consYs = [H * 0.25, H * 0.5, H * 0.75]
      // Broker Y
      const brokerY = H / 2

      const drawBox = (x: number, y: number, label: string, subLabel: string, color: string) => {
        const bw = W * 0.13
        const bh = H * 0.1
        ctx.beginPath()
        ctx.roundRect(x - bw / 2, y - bh / 2, bw, bh, 6)
        ctx.fillStyle = `rgba(${color},0.08)`
        ctx.fill()
        ctx.strokeStyle = `rgba(${color},0.3)`
        ctx.lineWidth = 0.5
        ctx.stroke()

        ctx.font = `500 11px 'JetBrains Mono', monospace`
        ctx.fillStyle = `rgba(${color},0.9)`
        ctx.textAlign = 'center'
        ctx.fillText(label, x, y - 2)
        ctx.font = `400 9px 'JetBrains Mono', monospace`
        ctx.fillStyle = `rgba(${color},0.4)`
        ctx.fillText(subLabel, x, y + 11)
        ctx.textAlign = 'left'
      }

      // Lines — producers to broker
      for (const py of prodYs) {
        ctx.beginPath()
        ctx.moveTo(prodX + W * 0.065, py)
        ctx.lineTo(brokerX - W * 0.085, brokerY)
        ctx.strokeStyle = 'rgba(167,139,250,0.08)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
      // Lines — broker to consumers
      for (const cy of consYs) {
        ctx.beginPath()
        ctx.moveTo(brokerX + W * 0.085, brokerY)
        ctx.lineTo(consX - W * 0.065, cy)
        ctx.strokeStyle = 'rgba(167,139,250,0.08)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Producers
      prodYs.forEach((py, i) => drawBox(prodX, py, `P${i + 1}`, 'Producer', '167,139,250'))
      // Broker
      const bBw = W * 0.17, bBh = H * 0.18
      ctx.beginPath()
      ctx.roundRect(brokerX - bBw / 2, brokerY - bBh / 2, bBw, bBh, 8)
      ctx.fillStyle = 'rgba(167,139,250,0.06)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(167,139,250,0.4)'
      ctx.lineWidth = 0.7
      ctx.stroke()
      ctx.font = `500 11px 'JetBrains Mono', monospace`
      ctx.fillStyle = 'rgba(167,139,250,0.9)'
      ctx.textAlign = 'center'
      ctx.fillText('KAFKA', brokerX, brokerY - 6)
      ctx.font = `400 9px 'JetBrains Mono', monospace`
      ctx.fillStyle = 'rgba(167,139,250,0.4)'
      ctx.fillText('Broker · Topics', brokerX, brokerY + 8)
      ctx.textAlign = 'left'
      // Consumers
      consYs.forEach((cy, i) => drawBox(consX, cy, `C${i + 1}`, 'Consumer', '167,139,250'))

      // Spawn + update particles
      spawn()
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.t += p.speed

        let x: number, y: number
        const py = prodYs[p.path]
        const cy = consYs[p.consumerIdx]

        if (p.phase === 'to-broker') {
          if (p.t >= 1) { p.phase = 'to-consumer'; p.t = 0 }
          x = prodX + (brokerX - prodX) * p.t
          y = py + (brokerY - py) * p.t
        } else {
          if (p.t >= 1) { particles.splice(i, 1); continue }
          x = brokerX + (consX - brokerX) * p.t
          y = brokerY + (cy - brokerY) * p.t
        }

        // Trail
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 8)
        glow.addColorStop(0, p.color.replace('0.9', '0.6').replace('0.7', '0.4').replace('0.5', '0.3'))
        glow.addColorStop(1, 'rgba(167,139,250,0)')
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Dot
        ctx.beginPath()
        ctx.arc(x, y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }

      // Counter
      const eps = 1200 + Math.floor(frame * 0.4) % 400
      ctx.font = `500 11px 'JetBrains Mono', monospace`
      ctx.fillStyle = 'rgba(167,139,250,0.5)'
      ctx.fillText(`${eps.toLocaleString()} events/sec`, 14, H - 40)
      ctx.fillStyle = 'rgba(167,139,250,0.2)'
      ctx.fillText('fault-tolerant delivery', 14, H - 24)

      frame++
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
