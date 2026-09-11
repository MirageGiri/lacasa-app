import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { itemById, itemsByModule, moduleById } from '@/content'
import type { Block } from '@/content/types'
import { useLang } from '@/i18n/LanguageContext'
import { useProgress } from '@/state/ProgressContext'
import { Badge, DraftBadge, ProgressFill, accent } from '@/components/ui'
import { ArrowLeftIcon, CheckIcon, XIcon } from '@/components/icons'

/* One idea per screen, rather than one long scroll.
 *
 * This is the change that helps most on a phone in a second language: a wall
 * of six bullet groups is where people give up, and a single card with a
 * Continue button is where they don't. The lesson's blocks ARE the steps —
 * the content model already knew where the seams were. */

function BlockView({ block }: { block: Block }) {
  const { b, bl } = useLang()
  switch (block.kind) {
    case 'p':
      return <p className="text-[19px] leading-relaxed">{b(block.text)}</p>
    case 'ul':
      return (
        <ul className="grid gap-3.5">
          {bl(block.items).map((line, i) => (
            <li key={i} className="flex gap-3 text-[19px] leading-relaxed">
              <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      )
    case 'stat':
      return (
        <div className="rounded-card bg-brand-50 px-6 py-7 text-center">
          <p className="text-5xl font-black leading-none text-brand-700">{block.value}</p>
          <p className="mt-3 text-base font-semibold text-ink-soft">{b(block.label)}</p>
        </div>
      )
    case 'callout':
      return (
        <div
          className={`rounded-card border-l-4 px-5 py-4 text-[19px] leading-relaxed ${
            block.tone === 'good' ? 'border-leaf-500 bg-leaf-100' : 'border-sun-500 bg-sun-100'
          }`}
        >
          {b(block.text)}
        </div>
      )
  }
}

export default function ItemDetail() {
  const { moduleId = '', itemId = '' } = useParams()
  const navigate = useNavigate()
  const { t, b } = useLang()
  const { isRead, toggleRead, moduleProgress } = useProgress()
  const [step, setStep] = useState(0)

  // A different lesson means a fresh start, not wherever the last one ended.
  useEffect(() => setStep(0), [itemId])

  const item = itemById[itemId]
  const mod = moduleById[moduleId]
  if (!item || !mod) return null

  const list = itemsByModule(moduleId)
  const idx = list.findIndex((i) => i.id === itemId)
  const steps = Math.max(item.body.length, 1)
  const last = step >= steps - 1
  const a = accent(mod.accent)

  function finish() {
    if (!isRead(itemId)) toggleRead(itemId)
    // moduleProgress still reflects pre-click state, so this lesson is the
    // one that completes the module when every other lesson is already read.
    const p = moduleProgress(moduleId)
    const completesModule = !isRead(itemId) && p.read === p.total - 1
    if (completesModule) navigate(`/module/${moduleId}/done`)
    else navigate('/')
  }

  return (
    <main id="main" tabIndex={-1} className="mx-auto flex min-h-[calc(100dvh-8rem)] w-full max-w-2xl flex-col px-4 pb-28 pt-3">
      {/* Progress across the lesson's steps */}
      <div className="flex items-center gap-3">
        <Link
          to="/"
          aria-label={t('backToPath')}
          className="-ml-1.5 grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink-soft transition-colors duration-(--duration-fast) hover:bg-line active:bg-line"
        >
          <XIcon size={22} />
        </Link>
        <div
          className="h-3 flex-1 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-label={b(item.title)}
          aria-valuemin={1}
          aria-valuemax={steps}
          aria-valuenow={step + 1}
        >
          <ProgressFill pct={((step + 1) / steps) * 100} className={a.bar} />
        </div>
        <span aria-hidden className="shrink-0 text-sm font-extrabold tabular-nums text-ink-soft">
          {step + 1}/{steps}
        </span>
      </div>

      <p className="mt-5 text-xs font-extrabold uppercase tracking-wider text-ink-soft">
        {b(mod.title)} · {t('lesson')} {idx + 1}
      </p>
      <h1 className="mt-1 text-[26px] font-extrabold leading-tight">{b(item.title)}</h1>

      <div className="mt-2 flex flex-wrap gap-2">
        <DraftBadge />
        {item.needsSourceCopy && <Badge tone="todo">{t('needsCopy')}</Badge>}
      </div>

      {/* The step itself. `key` restarts the entrance animation each time. */}
      <div key={step} className="lc-pop mt-6 flex flex-1 flex-col justify-center">
        {item.body[step] ? <BlockView block={item.body[step]} /> : null}
      </div>

      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            aria-label={t('previous')}
            className="grid min-h-13 min-w-16 place-items-center rounded-full border-2 border-line bg-surface px-5 text-ink-soft transition-colors duration-(--duration-fast) hover:border-line-strong active:bg-line"
          >
            <ArrowLeftIcon size={22} />
          </button>
        )}
        <button
          onClick={() => (last ? finish() : setStep((s) => s + 1))}
          className={`flex min-h-13 flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-extrabold text-white shadow-[var(--shadow-card)] transition-[filter,transform] duration-(--duration-fast) hover:brightness-90 active:scale-[0.98] ${a.solid}`}
        >
          {last && <CheckIcon size={20} />}
          {last ? t('finishLesson') : t('continueStep')}
        </button>
      </div>
    </main>
  )
}
