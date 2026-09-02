import { Link, useNavigate, useParams } from 'react-router-dom'
import { itemById, itemsByModule, moduleById } from '@/content'
import type { Block } from '@/content/types'
import { useLang } from '@/i18n/LanguageContext'
import { useProgress } from '@/state/ProgressContext'
import { Badge, DraftBadge, Screen, accent } from '@/components/ui'

function BlockView({ block }: { block: Block }) {
  const { b, bl } = useLang()
  switch (block.kind) {
    case 'p':
      return <p className="text-[17px] leading-relaxed">{b(block.text)}</p>
    case 'ul':
      return (
        <ul className="grid gap-2.5">
          {bl(block.items).map((line, i) => (
            <li key={i} className="flex gap-2.5 text-[17px] leading-relaxed">
              <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      )
    case 'stat':
      return (
        <div className="rounded-[--radius-card] bg-brand-50 px-5 py-4 text-center">
          <p className="text-4xl font-black leading-none text-brand-700">{block.value}</p>
          <p className="mt-1.5 text-sm font-semibold text-ink-soft">{b(block.label)}</p>
        </div>
      )
    case 'callout':
      return (
        <div
          className={`rounded-[--radius-card] border-l-4 px-4 py-3 text-[17px] leading-relaxed ${
            block.tone === 'good'
              ? 'border-leaf-500 bg-emerald-50'
              : 'border-sun-500 bg-amber-50'
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
  const { isRead, toggleRead } = useProgress()

  const item = itemById[itemId]
  const mod = moduleById[moduleId]
  if (!item || !mod) return <Screen title="Not found"><p /></Screen>

  const list = itemsByModule(moduleId)
  const idx = list.findIndex((i) => i.id === itemId)
  const prev = idx > 0 ? list[idx - 1] : null
  const next = idx < list.length - 1 ? list[idx + 1] : null
  const read = isRead(itemId)
  const a = accent(mod.accent)

  return (
    <Screen>
      <Link to={`/module/${moduleId}`} className="text-sm font-bold text-brand-600">
        ← {b(mod.title)}
      </Link>

      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-ink-soft">
        {t('lesson')} {idx + 1} {t('ofLabel')} {list.length}
      </p>
      <h1 className="mt-1 text-3xl font-extrabold leading-tight">{b(item.title)}</h1>

      <div className="mt-2 flex flex-wrap gap-2">
        <DraftBadge />
        {item.needsSourceCopy && <Badge tone="todo">{t('needsCopy')}</Badge>}
      </div>

      <article className="mt-5 grid gap-4">
        {item.body.map((block, i) => (
          <BlockView key={i} block={block} />
        ))}
      </article>

      <button
        onClick={() => toggleRead(itemId)}
        aria-pressed={read}
        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-base font-extrabold transition ${
          read ? 'bg-leaf-500 text-white' : `${a.bg} ${a.text}`
        }`}
      >
        <span aria-hidden>{read ? '✓' : '○'}</span>
        {read ? t('markedComplete') : t('markComplete')}
      </button>

      <div className="mt-4 flex gap-3">
        {prev ? (
          <button
            onClick={() => navigate(`/module/${moduleId}/item/${prev.id}`)}
            className="flex-1 rounded-full border border-line bg-surface px-4 py-3 text-sm font-bold"
          >
            ← {t('previous')}
          </button>
        ) : <span className="flex-1" />}
        {next ? (
          <button
            onClick={() => navigate(`/module/${moduleId}/item/${next.id}`)}
            className="flex-1 rounded-full bg-brand-600 px-4 py-3 text-sm font-bold text-white"
          >
            {t('next')} →
          </button>
        ) : (
          <button
            onClick={() => navigate(`/module/${moduleId}`)}
            className="flex-1 rounded-full bg-brand-600 px-4 py-3 text-sm font-bold text-white"
          >
            {t('backToModule')}
          </button>
        )}
      </div>
    </Screen>
  )
}
