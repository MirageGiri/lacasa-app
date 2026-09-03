import type { ReactNode } from 'react'
import { useLang } from '@/i18n/LanguageContext'

const ACCENTS = {
  brand: { bg: 'bg-brand-100', text: 'text-brand-700', bar: 'bg-brand-500', ring: 'ring-brand-200' },
  leaf:  { bg: 'bg-leaf-100',  text: 'text-leaf-800',  bar: 'bg-leaf-500',  ring: 'ring-leaf-100' },
  sun:   { bg: 'bg-sun-100',   text: 'text-sun-800',   bar: 'bg-sun-500',   ring: 'ring-sun-100' },
  berry: { bg: 'bg-berry-100', text: 'text-berry-800', bar: 'bg-berry-500', ring: 'ring-berry-100' },
  aqua:  { bg: 'bg-aqua-100',  text: 'text-aqua-800',  bar: 'bg-aqua-500',  ring: 'ring-aqua-100' },
} as const

export type Accent = keyof typeof ACCENTS
export const accent = (a: Accent) => ACCENTS[a]

export function ProgressBar({ pct, accent: a = 'brand' }: { pct: number; accent?: Accent }) {
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-line"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={`h-full rounded-full transition-all duration-500 ${ACCENTS[a].bar}`} style={{ width: `${pct}%` }} />
    </div>
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
    <main className="mx-auto w-full max-w-2xl px-4 pb-28 pt-4">
      {title && <h1 className="mb-4 text-3xl font-extrabold tracking-tight">{title}</h1>}
      {children}
    </main>
  )
}
