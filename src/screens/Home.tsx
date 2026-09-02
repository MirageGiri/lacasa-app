import { Link } from 'react-router-dom'
import { modules, itemsByModule } from '@/content'
import { useLang } from '@/i18n/LanguageContext'
import { useProgress } from '@/state/ProgressContext'
import { ProgressBar, Screen, accent } from '@/components/ui'

export default function Home() {
  const { t, b } = useLang()
  const { moduleProgress, overall, nextUp } = useProgress()

  return (
    <Screen>
      <section className="mb-6 rounded-[--radius-card] bg-brand-600 px-5 py-5 text-white">
        <h1 className="text-2xl font-extrabold leading-tight">{t('greeting')}</h1>
        <p className="mt-3 text-sm font-semibold text-white/85">
          {overall.modulesDone} {t('ofLabel')} {overall.totalModules} {t('modulesDone')}
        </p>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${overall.pct}%` }}
          />
        </div>
        {nextUp && (
          <Link
            to={`/module/${nextUp.moduleId}/item/${nextUp.itemId}`}
            className="mt-4 inline-block rounded-full bg-white px-4 py-2.5 text-sm font-extrabold text-brand-700"
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
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl ${a.bg}`}
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
    </Screen>
  )
}
