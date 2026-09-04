import { Link } from 'react-router-dom'
import { modules, itemsByModule, stories } from '@/content'
import StoryArt from '@/components/StoryArt'
import { useLang } from '@/i18n/LanguageContext'
import { useProgress } from '@/state/ProgressContext'
import { ProgressBar, Screen, accent } from '@/components/ui'

export default function Home() {
  const { t, b } = useLang()
  const { moduleProgress, overall, nextUp } = useProgress()

  return (
    <Screen>
      <section className="relative mb-6 overflow-hidden rounded-[--radius-card] bg-gradient-to-br from-brand-600 to-brand-800 px-5 py-5 text-white shadow-[var(--shadow-lift)]">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border-[14px] border-white/10"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 top-10 h-28 w-28 rounded-full border-[10px] border-white/10"
        />
        <h1 className="relative text-2xl font-extrabold leading-tight">{t('greeting')}</h1>
        <p className="relative mt-3 text-sm font-semibold text-white/85">
          {overall.modulesDone} {t('ofLabel')} {overall.totalModules} {t('modulesDone')}
        </p>
        <div className="relative mt-2 h-2 w-full overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${overall.pct}%` }}
          />
        </div>
        {nextUp && (
          <Link
            to={`/module/${nextUp.moduleId}/item/${nextUp.itemId}`}
            className="relative mt-4 inline-block rounded-full bg-white px-4 py-2.5 text-sm font-extrabold text-brand-700 shadow-[0_6px_18px_-6px_rgb(0_0_0_/_0.35)] transition hover:bg-brand-50"
          >
            {t('continueLabel')} →
          </Link>
        )}
      </section>

      <div className="grid gap-3">
        {modules.map((m) => {
          const p = moduleProgress(m.id)
          const a = accent(m.accent)
          const label = p.read === 0 ? t('startModule') : p.done ? t('reviewModule') : t('continueModule')
          return (
            <Link
              key={m.id}
              to={`/module/${m.id}`}
              className="card block px-4 py-4 transition hover:shadow-md focus-visible:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl ring-1 ring-inset ring-black/5 ${a.bg}`}
                >
                  {m.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="text-lg font-extrabold leading-snug">{b(m.title)}</h2>
                    {p.done && <span aria-hidden className="text-lg">✅</span>}
                  </div>
                  <p className="mt-0.5 text-sm text-ink-soft">{b(m.blurb)}</p>
                  <div className="mt-3">
                    <ProgressBar pct={p.pct} accent={m.accent} />
                  </div>
                  <p className="mt-2 text-xs font-bold text-ink-soft">
                    {p.read}/{p.total} {itemsByModule(m.id).length === 1 ? t('lesson') : t('lessons')}
                    <span className={`ml-2 ${a.text}`}>· {label}</span>
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <Link
        to="/stories"
        className="card mt-3 flex items-center gap-3 overflow-hidden py-0 pr-4 transition hover:shadow-md"
      >
        <span className="h-[76px] w-[92px] shrink-0 overflow-hidden bg-[#FDEBC8]">
          <StoryArt name="garden" />
        </span>
        <span className="min-w-0 flex-1 py-3">
          <span className="block text-lg font-extrabold leading-snug">{t('storiesTitle')}</span>
          <span className="block text-sm text-ink-soft">{t('storiesBlurb')}</span>
        </span>
        <span aria-hidden className="shrink-0 text-xl text-brand-500">
          →
        </span>
      </Link>

      <p className="mt-2 text-center text-xs font-bold text-ink-soft">
        {stories.length} {t('storiesTitle').toLowerCase()}
      </p>
    </Screen>
  )
}
