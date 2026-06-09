import { useEffect, useRef } from 'react'

export default function WebGLBackground({ teamPrimary, teamSecondary, teamR, teamG, teamB }) {
  const canvasRef = useRef(null)
  const stateRef = useRef({})

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { alpha: false, antialias: true })
    if (!gl) return

    // ── Vertex shader ──────────────────────────────────────────
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // ── Fragment shader — fluid nebula + grid ──────────────────
    const fsSource = `
      precision highp float;
      uniform vec2  u_resolution;
      uniform float u_time;
      uniform vec3  u_color1;
      uniform vec3  u_color2;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i),           hash(i + vec2(1,0)), u.x),
          mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 6; i++) {
          v += a * noise(p);
          p  = p * 2.1 + vec2(1.7, 9.2);
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 st = uv * 2.0 - 1.0;
        st.x *= u_resolution.x / u_resolution.y;

        float t = u_time * 0.18;

        // Fluid nebula
        vec2 q = vec2(fbm(st + t * 0.4), fbm(st + vec2(1.1, 3.4)));
        vec2 r = vec2(
          fbm(st + 2.0 * q + vec2(1.7 + t * 0.15, 9.2)),
          fbm(st + 2.0 * q + vec2(8.3 + t * 0.12, 2.8))
        );
        float f = fbm(st + 2.8 * r);

        // Deep space base — very dark, just a hint of team color
        vec3 base = mix(
          vec3(0.01, 0.015, 0.03),
          u_color1 * 0.12,
          clamp(f * f * 1.2, 0.0, 1.0)
        );
        base = mix(base, u_color2 * 0.08, clamp(f * 0.5, 0.0, 1.0));

        // Add a faint radial glow from center-bottom (like a stadium light)
        float dist = length(uv - vec2(0.5, 1.1));
        float glow = 0.08 / (dist * dist + 0.1);
        base += u_color1 * glow * 0.06;

        // Subtle hex grid
        vec2 grid = fract(st * 5.5 + t * 0.05) - 0.5;
        float hexLine = smoothstep(0.47, 0.5, max(abs(grid.x), abs(grid.y)));
        base += u_color1 * hexLine * 0.025;

        // Scanline
        float scan = sin(uv.y * u_resolution.y * 1.5) * 0.5 + 0.5;
        base *= 1.0 - scan * 0.04;

        // Vignette
        float vig = 1.0 - smoothstep(0.4, 1.4, length(uv - 0.5) * 1.6);
        base *= vig;

        gl_FragColor = vec4(base, 1.0);
      }
    `

    // compile
    function compile(type, src) {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsSource))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsSource))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    // full-screen quad
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, 'a_position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uRes   = gl.getUniformLocation(prog, 'u_resolution')
    const uTime  = gl.getUniformLocation(prog, 'u_time')
    const uCol1  = gl.getUniformLocation(prog, 'u_color1')
    const uCol2  = gl.getUniformLocation(prog, 'u_color2')

    let rafId, start = performance.now()

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    stateRef.current = { r: teamR / 255, g: teamG / 255, b: teamB / 255 }

    const render = () => {
      const t = (performance.now() - start) / 1000
      const { r, g, b, tr, tg, tb, lerp = 0 } = stateRef.current

      // Smooth lerp toward target color
      let cr = r, cg = g, cb = b
      if (tr !== undefined) {
        const l = Math.min(lerp + 0.015, 1)
        stateRef.current.lerp = l
        cr = r + (tr - r) * l
        cg = g + (tg - g) * l
        cb = b + (tb - b) * l
        if (l >= 1) {
          stateRef.current.r = tr
          stateRef.current.g = tg
          stateRef.current.b = tb
          stateRef.current.tr = undefined
          stateRef.current.lerp = 0
        } else {
          stateRef.current.cr = cr
          stateRef.current.cg = cg
          stateRef.current.cb = cb
        }
      }

      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, t)
      gl.uniform3f(uCol1, cr, cg, cb)
      // secondary color (blend in)
      const sr = stateRef.current.sr || cr
      const sg = stateRef.current.sg || cg
      const sb = stateRef.current.sb || cb
      gl.uniform3f(uCol2, sr, sg, sb)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafId = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // When team changes, smoothly transition color
  useEffect(() => {
    if (!stateRef.current) return
    stateRef.current.tr = teamR / 255
    stateRef.current.tg = teamG / 255
    stateRef.current.tb = teamB / 255
    stateRef.current.sr = parseInt(teamSecondary?.slice(1,3)||'c8',16)/255
    stateRef.current.sg = parseInt(teamSecondary?.slice(3,5)||'a8',16)/255
    stateRef.current.sb = parseInt(teamSecondary?.slice(5,7)||'4b',16)/255
    stateRef.current.lerp = 0
  }, [teamR, teamG, teamB, teamSecondary])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        display: 'block',
      }}
    />
  )
}
