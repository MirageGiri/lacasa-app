import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '@/i18n/LanguageContext'
import { ChevronLeftIcon } from '@/components/icons'

/* `bar` is a mark: progress fills, dots, tints. It is NOT a background for
 * text — white on sun-500 is 2.1:1 and on leaf-500 3.4:1. Anything with white
 * text or a white icon on it uses `solid`, which clears 4.5:1 for every
 * accent (brand 4.7, leaf 5.4, sun 5.0, berry 6.4, aqua 4.8). */
const ACCENTS = {
  brand: { bg: 'bg-brand-100', text: 'text-brand-700', bar: 'bg-brand-500', solid: 'bg-brand-600', ring: 'ring-brand-200' },
  leaf:  { bg: 'bg-leaf-100',  text: 'text-leaf-800',  bar: 'bg-leaf-500',  solid: 'bg-leaf-600',  ring: 'ring-leaf-100' },
  sun:   { bg: 'bg-sun-100',   text: 'text-sun-800',   bar: 'bg-sun-500',   solid: 'bg-sun-700',   ring: 'ring-sun-100' },
  berry: { bg: 'bg-berry-100', text: 'text-berry-800', bar: 'bg-berry-500', solid: 'bg-berry-600', ring: 'ring-berry-100' },
  aqua:  { bg: 'bg-aqua-100',  text: 'text-aqua-800',  bar: 'bg-aqua-500',  solid: 'bg-aqua-600',  ring: 'ring-aqua-100' },
} as const

export type Accent = keyof typeof ACCENTS
export const accent = (a: Accent) => ACCENTS[a]

/** Progress fill animates with transform, not width: width changes force
 *  layout on every frame, scaleX runs on the compositor. */
export function ProgressFill({ pct, className }: { pct: number; className: string }) {
  return (
    <div
      className={`h-full w-full origin-left rounded-full transition-transform duration-(--duration-slow) ease-(--ease-out-soft) ${className}`}
      style={{ transform: `scaleX(${Math.max(0, Math.min(100, pct)) / 100})` }}
    />
  )
}

export function ProgressBar({ pct, accent: a = 'brand', label }: { pct: number; accent?: Accent; label?: string }) {
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-line"
      role="progressbar"
      aria-label={label}
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <ProgressFill pct={pct} className={ACCENTS[a].bar} />
    </div>
  )
}

/** Back link with a full 44px tap target — the old "← Home" text link was a
 *  20px-tall strip of type. */
export function BackLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="-ml-2 inline-flex min-h-11 items-center gap-1 rounded-full px-2 text-[15px] font-bold text-brand-700 transition-colors hover:bg-brand-50"
    >
      <ChevronLeftIcon size={18} />
      {children}
    </Link>
  )
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'draft' | 'todo' }) {
  const tones = {
    neutral: 'bg-line text-ink-soft',
    draft: 'bg-sun-100 text-sun-800',
    todo: 'bg-aqua-100 text-aqua-800',
  }
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>
  )
}

/** Shown on Spanish curriculum text so reviewers can see what is still a draft.
 *  Flip SHOW_DRAFT_BADGES to false before the family-facing release. */
export const SHOW_DRAFT_BADGES = true

export function DraftBadge() {
  const { lang, t } = useLang()
  if (!SHOW_DRAFT_BADGES || lang !== 'es') return null
  return <Badge tone="draft">{t('draftBadge')}</Badge>
}

export function Screen({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <main id="main" tabIndex={-1} className="mx-auto w-full max-w-2xl px-4 pb-28 pt-4">
      {title && <h1 className="mb-4 text-3xl font-extrabold tracking-tight">{title}</h1>}
      {children}
    </main>
  )
}
