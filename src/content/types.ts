import type { ModuleIconName } from '@/components/icons'

/** Every human-readable string in the curriculum carries both languages. */
export interface Bilingual {
  en: string
  /** Drafted by Claude, pending review by LA CASA clinical staff. */
  es: string
}

export interface BilingualList {
  en: string[]
  es: string[]
}

/** A block of item body copy. Richer than the Glide prototype's single
 *  free-text column, so a statistic can render as a statistic. */
export type Block =
  | { kind: 'p'; text: Bilingual }
  | { kind: 'ul'; items: BilingualList }
  | { kind: 'stat'; value: string; label: Bilingual }
  | { kind: 'callout'; tone: 'good' | 'warn'; text: Bilingual }

export interface Item {
  id: string
  moduleId: string
  title: Bilingual
  /** One-line summary used on cards and in search. */
  summary: Bilingual
  body: Block[]
  image?: string
  /** True where the Glide source copy was truncated or a placeholder, so the
   *  LA CASA team knows exactly which cards still need their words. */
  needsSourceCopy?: boolean
}

export interface QuizQuestion {
  id: string
  prompt: Bilingual
  choices: BilingualList
  /** Index into choices. */
  answer: number
  explanation: Bilingual
}

export interface GoalOption {
  id: string
  moduleId: string
  text: Bilingual
}

export interface Module {
  id: string
  order: number
  title: Bilingual
  blurb: Bilingual
  /** Tailwind-ish accent token used for the module's card and header. */
  accent: 'brand' | 'leaf' | 'sun' | 'berry' | 'aqua'
  /** Named SVG icon — emoji render differently on every Android version. */
  icon: ModuleIconName
}
