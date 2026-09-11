import { useCallback, useRef } from 'react'
import type { CSSProperties, ReactNode, PointerEvent } from 'react'
import { ModuleIcon } from '@/components/icons'
import type { ModuleIconName } from '@/components/icons'
import type { Accent } from '@/components/ui'

/* The 3D layer for the web layout. Pure CSS transforms driven by pointer
 * position — no WebGL, no dependencies, nothing to download. Tilt only runs
 * for a fine pointer (mouse/trackpad); on touch it is inert, and the global
 * prefers-reduced-motion rule flattens all of it. */

const canTilt = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Pointer-driven tilt. Writes CSS variables straight to the element so a
 *  mouse move never re-renders React. */
export function useTilt<T extends HTMLElement>(max = 7) {
  const ref = useRef<T | null>(null)

  const onPointerMove = useCallback(
    (e: PointerEvent<T>) => {
      const el = ref.current
      if (!el || !canTilt()) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      el.dataset.active = 'true'
      el.style.setProperty('--ry', `${(px - 0.5) * 2 * max}deg`)
      el.style.setProperty('--rx', `${(0.5 - py) * 2 * max}deg`)
      el.style.setProperty('--gx', `${px * 100}%`)
      el.style.setProperty('--gy', `${py * 100}%`)
    },
    [max],
  )

  const onPointerLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.dataset.active = 'false'
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }, [])

  return { ref, onPointerMove, onPointerLeave }
}

/** Colors for a clay block, per module accent. The face runs light-to-dark
 *  so it reads as lit from above; the edge is the extrusion underneath. */
const BLOCK: Record<Accent, CSSProperties> = {
  brand: { '--b-hi': '#63AFE6', '--b-face': '#2278BC', '--b-lo': '#1A5F96', '--b-edge': '#113A5A' } as CSSProperties,
  leaf:  { '--b-hi': '#4CC47E', '--b-face': '#2E9E5B', '--b-lo': '#1F7A44', '--b-edge': '#10603A' } as CSSProperties,
  sun:   { '--b-hi': '#FFC23D', '--b-face': '#F0A202', '--b-lo': '#C77F00', '--b-edge': '#8A5A00' } as CSSProperties,
  berry: { '--b-hi': '#EB5C9E', '--b-face': '#D6337F', '--b-lo': '#B02566', '--b-edge': '#7E1A49' } as CSSProperties,
  aqua:  { '--b-hi': '#3CC3DB', '--b-face': '#0E9BB5', '--b-lo': '#0B7D93', '--b-edge': '#075A6B' } as CSSProperties,
}

/** A module's icon as a 3D clay tile. Decorative: always sits beside the
 *  module's written title, so it is hidden from assistive tech. */
export function IconBlock({
  icon,
  accent,
  size = 52,
  className = '',
}: {
  icon: ModuleIconName
  accent: Accent
  size?: number
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={`block3d shrink-0 ${className}`}
      style={{ ...BLOCK[accent], width: size, height: size, borderRadius: size * 0.3 }}
    >
      <ModuleIcon name={icon} size={Math.round(size * 0.5)} />
    </span>
  )
}

/** Card wrapper with tilt + glare. Renders whatever element you give it. */
export function TiltSurface({
  children,
  className = '',
  max,
  style,
}: {
  children: ReactNode
  className?: string
  max?: number
  style?: CSSProperties
}) {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLDivElement>(max)
  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`tilt relative ${className}`}
      style={style}
    >
      {children}
      <span aria-hidden className="tilt-glare" />
    </div>
  )
}

const FLOATERS: { icon: ModuleIconName; accent: Accent; x: string; y: string; size: number; delay: number }[] = [
  { icon: 'apple',    accent: 'berry', x: '16%', y: '14%', size: 56, delay: 0 },
  { icon: 'droplet',  accent: 'aqua',  x: '64%', y: '6%',  size: 50, delay: -1.6 },
  { icon: 'salad',    accent: 'leaf',  x: '70%', y: '60%', size: 56, delay: -3.1 },
  { icon: 'activity', accent: 'sun',   x: '4%',  y: '64%', size: 48, delay: -4.4 },
]

/** The dashboard's hero: an isometric MyPlate (half fruit and vegetables,
 *  a quarter grains, a quarter protein) with the lesson topics floating over
 *  it. The whole stage leans toward the pointer. Decorative throughout. */
export function HeroScene({ className = '' }: { className?: string }) {
  const stage = useRef<HTMLDivElement | null>(null)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!stage.current || !canTilt()) return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    stage.current.style.setProperty('--sy', `${px * 14}deg`)
    stage.current.style.setProperty('--sx', `${-py * 10}deg`)
  }
  const onLeave = () => {
    stage.current?.style.setProperty('--sx', '0deg')
    stage.current?.style.setProperty('--sy', '0deg')
  }

  return (
    <div
      aria-hidden
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`scene relative ${className}`}
    >
      <div ref={stage} className="scene-stage">
        <div className="scene-plate">
          <div className="scene-plate-edge" />
          <div className="scene-plate-face" />
          <div className="scene-orbit" />
        </div>
        {FLOATERS.map((f) => (
          <div
            key={f.icon}
            className="scene-float"
            style={{ left: f.x, top: f.y, animationDelay: `${f.delay}s` }}
          >
            <IconBlock icon={f.icon} accent={f.accent} size={f.size} />
            <span className="scene-shadow" style={{ animationDelay: `${f.delay}s` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Circular progress with a raised centre — used for overall completion. */
export function ProgressRing({ pct, size = 112, label }: { pct: number; size?: number; label: string }) {
  const stroke = 10
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div
      className="relative grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={label}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-brand-100)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#lc-ring)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
          style={{ transition: 'stroke-dashoffset var(--duration-slow) var(--ease-out-soft)' }}
        />
        <defs>
          <linearGradient id="lc-ring" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#3593D8" />
            <stop offset="100%" stopColor="#1F7A44" />
          </linearGradient>
        </defs>
      </svg>
      <span
        aria-hidden
        className="absolute grid place-items-center rounded-full bg-surface shadow-[var(--shadow-e2)]"
        style={{ inset: stroke + 6 }}
      >
        <span className="font-display text-2xl font-extrabold tabular-nums text-ink">{pct}%</span>
      </span>
    </div>
  )
}
