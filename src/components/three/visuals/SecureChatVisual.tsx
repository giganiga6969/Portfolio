'use client'
import { useEffect, useRef } from 'react'

interface Packet {
  fromIdx: number
  toIdx: number
  t: number
  speed: number
}

export default function SecureChatVisual() {
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
    const packets: Packet[] = []

    // Build hex grid nodes
    const buildNodes = () => {
      const nodes: [number, number][] = []
      const cols = Math.max(5, Math.floor(W / 80))
      const rows = Math.max(4, Math.floor(H / 70))
      const dx = W / (cols)
      const dy = H / (rows)

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const offsetX = r % 2 === 0 ? 0 : dx / 2
          nodes.push([c * dx + offsetX + dx * 0.5, r * dy + dy * 0.5])
        }
      }
      return nodes
    }

    let nodes = buildNodes()

    // Edges — connect nearby nodes
    const buildEdges = () => {
      const edges: [number, number][] = []
      const THRESH = Math.min(W, H) * 0.22
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i][0] - nodes[j][0]
          const dy = nodes[i][1] - nodes[j][1]
          if (Math.sqrt(dx * dx + dy * dy) < THRESH) edges.push([i, j])
        }
      }
      return edges
    }
    let edges = buildEdges()

    const spawnPacket = () => {
      if (edges.length === 0) return
      const edge = edges[Math.floor(Math.random() * edges.length)]
      const flip = Math.random() > 0.5
      packets.push({
        fromIdx: flip ? edge[0] : edge[1],
        toIdx: flip ? edge[1] : edge[0],
        t: 0,
        speed: 0.006 + Math.random() * 0.008,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Dark bg
      ctx.fillStyle = 'rgba(5,5,5,0.95)'
      ctx.fillRect(0, 0, W, H)

      // Draw edges
      for (const [a, b] of edges) {
        ctx.beginPath()
        ctx.moveTo(nodes[a][0], nodes[a][1])
        ctx.lineTo(nodes[b][0], nodes[b][1])
        ctx.strokeStyle = 'rgba(248,113,113,0.1)'
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Hex nodes
      for (const [nx, ny] of nodes) {
        // Hexagon
        ctx.save()
        ctx.translate(nx, ny)
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2 - Math.PI / 6
          if (i === 0) ctx.moveTo(Math.cos(a) * 10, Math.sin(a) * 10)
          else ctx.lineTo(Math.cos(a) * 10, Math.sin(a) * 10)
        }
        ctx.closePath()
        ctx.strokeStyle = 'rgba(248,113,113,0.2)'
        ctx.lineWidth = 0.5
        ctx.stroke()
        ctx.fillStyle = 'rgba(248,113,113,0.03)'
        ctx.fill()
        ctx.restore()

        // Center dot
        ctx.beginPath()
        ctx.arc(nx, ny, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(248,113,113,0.4)'
        ctx.fill()
      }

      // Spawn packets
      if (frame % 18 === 0) spawnPacket()

      // Animate packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]
        p.t += p.speed
        if (p.t >= 1) { packets.splice(i, 1); continue }

        const [fx, fy] = nodes[p.fromIdx]
        const [tx, ty] = nodes[p.toIdx]
        const x = fx + (tx - fx) * p.t
        const y = fy + (ty - fy) * p.t

        // Glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 12)
        glow.addColorStop(0, 'rgba(248,113,113,0.4)')
        glow.addColorStop(1, 'rgba(248,113,113,0)')
        ctx.beginPath()
        ctx.arc(x, y, 12, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Lock icon (simple rectangle + arc)
        ctx.save()
        ctx.translate(x, y)
        ctx.strokeStyle = 'rgba(248,113,113,0.9)'
        ctx.lineWidth = 1
        ctx.strokeRect(-3, -1, 6, 5)
        ctx.beginPath()
        ctx.arc(0, -1, 3, Math.PI, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      // Labels
      ctx.font = `500 11px 'JetBrains Mono', monospace`
      ctx.fillStyle = 'rgba(248,113,113,0.6)'
      ctx.fillText('RSA-2048 · AES-256', 14, H - 40)
      ctx.fillStyle = 'rgba(248,113,113,0.25)'
      ctx.fillText('E2E encrypted · zero plaintext on wire', 14, H - 24)

      frame++
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight
      canvas.width = W; canvas.height = H
      nodes = buildNodes()
      edges = buildEdges()
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={canvasRef} className="project-canvas" />
}
