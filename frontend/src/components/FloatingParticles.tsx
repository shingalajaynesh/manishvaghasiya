import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  r: number
  baseDx: number
  baseDy: number
  dx: number
  dy: number
  alpha: number
}

export function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    const maxDistance = 90 // line connection distance between particles
    const mouseRadius = 120 // interaction radius for mouse
    const mouse = { x: -9999, y: -9999 }

    // Dynamic particle count based on screen width (mobile friendly)
    const particleCount = Math.min(80, Math.floor((W * H) / 18000))

    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const x = Math.random() * W
      const y = Math.random() * H
      const dx = (Math.random() - 0.5) * 0.25
      const dy = (Math.random() - 0.5) * 0.25
      return {
        x,
        y,
        originX: x,
        originY: y,
        r: Math.random() * 1.5 + 0.6,
        baseDx: dx,
        baseDy: dy,
        dx,
        dy,
        alpha: Math.random() * 0.45 + 0.15,
      }
    })

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y)

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.08
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(212, 160, 23, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        // Mouse repulsion logic
        const distToMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        if (distToMouse < mouseRadius) {
          const force = (mouseRadius - distToMouse) / mouseRadius
          const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x)
          // Smoothly push particle away from cursor
          p.x += Math.cos(angle) * force * 1.8
          p.y += Math.sin(angle) * force * 1.8

          // Draw connection line to mouse cursor
          const lineAlpha = (1 - distToMouse / mouseRadius) * 0.15
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(245, 200, 66, ${lineAlpha})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        } else {
          // Return to normal inertia
          p.x += p.dx
          p.y += p.dy
        }

        // Keep inside bounds
        if (p.x < 0) {
          p.x = W
        } else if (p.x > W) {
          p.x = 0
        }
        if (p.y < 0) {
          p.y = H
        } else if (p.y > H) {
          p.y = 0
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 160, 23, ${p.alpha})`
        ctx.shadowColor = 'rgba(212, 160, 23, 0.4)'
        ctx.shadowBlur = p.r > 1.2 ? 3 : 0
        ctx.fill()
        ctx.shadowBlur = 0 // Reset shadow
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const onMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
