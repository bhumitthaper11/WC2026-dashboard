import { useEffect, useRef } from 'react'

export default function ParticleOverlay({ teamR, teamG, teamB }) {
  const canvasRef = useRef(null)
  const colorRef = useRef({ r: teamR, g: teamG, b: teamB, tr: teamR, tg: teamG, tb: teamB, lerp: 1 })

  useEffect(() => {
    colorRef.current.tr = teamR
    colorRef.current.tg = teamG
    colorRef.current.tb = teamB
    colorRef.current.lerp = 0
  }, [teamR, teamG, teamB])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let rafId

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Particles ───────────────────────────────────────────────
    const N = 80
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.15,
      radius: 0.8 + Math.random() * 2.2,
      alpha: 0.2 + Math.random() * 0.6,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.01 + Math.random() * 0.02,
      size: Math.random(),          // 0=dot, 1=hex
      hexR: 4 + Math.random() * 10,
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.005,
    }))

    // ── Data streams ────────────────────────────────────────────
    const streamCount = 6
    const streams = Array.from({ length: streamCount }, (_, i) => ({
      x: (i + 0.5) * (window.innerWidth / streamCount) + (Math.random() - 0.5) * 80,
      y: -Math.random() * window.innerHeight,
      speed: 0.4 + Math.random() * 0.8,
      chars: Array.from({ length: 18 }, () => String.fromCharCode(0x30A0 + Math.random() * 96)),
      alpha: 0.04 + Math.random() * 0.08,
      spacing: 18,
    }))

    // ── Connection lines ────────────────────────────────────────
    const MAX_DIST = 120

    let frame = 0

    const render = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Lerp color
      const c = colorRef.current
      if (c.lerp < 1) {
        c.lerp = Math.min(c.lerp + 0.01, 1)
        c.r = c.r + (c.tr - c.r) * 0.01
        c.g = c.g + (c.tg - c.g) * 0.01
        c.b = c.b + (c.tb - c.b) * 0.01
      }
      const { r, g, b } = c
      const hex = `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`

      // ── Data streams ──────────────────────────────────────────
      ctx.font = '13px monospace'
      for (const s of streams) {
        s.y += s.speed
        if (s.y > canvas.height + 200) {
          s.y = -s.chars.length * s.spacing
          s.x = Math.random() * canvas.width
        }
        if (frame % 8 === 0) {
          s.chars[Math.floor(Math.random() * s.chars.length)] =
            String.fromCharCode(0x30A0 + Math.random() * 96)
        }
        for (let i = 0; i < s.chars.length; i++) {
          const cy = s.y + i * s.spacing
          if (cy < -20 || cy > canvas.height + 20) continue
          const fade = 1 - i / s.chars.length
          ctx.fillStyle = `rgba(${r},${g},${b},${s.alpha * fade})`
          ctx.fillText(s.chars[i], s.x, cy)
        }
      }

      // ── Particle update + draw ─────────────────────────────────
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed
        p.rotation += p.rotSpeed
        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20
        if (p.y < -20) p.y = canvas.height + 20
        if (p.y > canvas.height + 20) p.y = -20

        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse))

        if (p.size < 0.5) {
          // dot with glow
          ctx.save()
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${a})`
          ctx.shadowColor = hex
          ctx.shadowBlur = 8
          ctx.fill()
          ctx.restore()
        } else {
          // hexagon
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rotation)
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 6
            const x = p.hexR * Math.cos(angle)
            const y = p.hexR * Math.sin(angle)
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.strokeStyle = `rgba(${r},${g},${b},${a * 0.7})`
          ctx.lineWidth = 0.8
          ctx.stroke()
          ctx.restore()
        }
      }

      // ── Connection lines between close particles ───────────────
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_DIST) {
            const a = (1 - d / MAX_DIST) * 0.12
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${r},${g},${b},${a})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // ── Corner HUD decorations ─────────────────────────────────
      const drawCorner = (x, y, sx, sy, a) => {
        const len = 24
        ctx.save()
        ctx.strokeStyle = `rgba(${r},${g},${b},${a})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(x, y + sy * len)
        ctx.lineTo(x, y)
        ctx.lineTo(x + sx * len, y)
        ctx.stroke()
        ctx.restore()
      }
      const m = 20, alpha = 0.4
      drawCorner(m, m, 1, 1, alpha)
      drawCorner(canvas.width - m, m, -1, 1, alpha)
      drawCorner(m, canvas.height - m, 1, -1, alpha)
      drawCorner(canvas.width - m, canvas.height - m, -1, -1, alpha)

      rafId = requestAnimationFrame(render)
    }

    render()
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}
