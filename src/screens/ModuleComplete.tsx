import { Link, Navigate, useParams } from 'react-router-dom'
import { itemsByModule, moduleById, quizzes } from '@/content'
import { useLang } from '@/i18n/LanguageContext'
import { useProgress } from '@/state/ProgressContext'
import { accent } from '@/components/ui'
import { ModuleIcon } from '@/components/icons'

/* Finishing a module used to do nothing visible. It should feel like arriving
 * somewhere — but stay on the credible side of celebratory: no points, no
 * ranking, no pressure to come back tomorrow. */

const CONFETTI = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37) % 100,
  delay: (i % 9) * 0.18,
  duration: 2.6 + (i % 5) * 0.35,
  size: 7 + (i % 4) * 3,
  color: ['#C2185B', '#2E9E5B', '#F0A202', '#8B5CF6', '#0E9BB5'][i % 5],
  round: i % 3 === 0,
}))

export default function ModuleComplete() {
  const { moduleId = '' } = useParams()
  const { t, b } = useLang()
  const { overall } = useProgress()

  const mod = moduleById[moduleId]
  if (!mod) return <Navigate to="/" replace />

  const count = itemsByModule(moduleId).length
  const a = accent(mod.accent)
  const hasQuiz = (quizzes[moduleId]?.length ?? 0) > 0

  return (
    <main id="main" tabIndex={-1} className="relative mx-auto flex min-h-[calc(100dvh-8rem)] w-full max-w-2xl flex-col items-center justify-center overflow-hidden px-6 pb-28 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {CONFETTI.map((c, i) => (
          <span
            key={i}
            className="lc-fall absolute top-0 block"
            style={{
              left: `${c.left}%`,
              width: c.size,
              height: c.size * 1.6,
              background: c.color,
              borderRadius: c.round ? '999px' : '2px',
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="lc-pop relative">
        <span
          aria-hidden
          className={`grid h-28 w-28 place-items-center rounded-full ${a.bg} ${a.text} shadow-[var(--shadow-lift)]`}
        >
          <ModuleIcon name={mod.icon} size={56} />
        </span>
      </div>

      <h1 className="relative mt-6 text-3xl font-black leading-tight">{t('moduleDone')}</h1>
      <p className="relative mt-2 text-[17px] text-ink-soft">
        {t('moduleDoneSub')} <span className="font-extrabold text-ink">{b(mod.title)}</span>
      </p>

      <div className="relative mt-6 flex items-center gap-3">
        <div className="card px-5 py-3">
          <p className="text-2xl font-black tabular-nums text-brand-700">{count}</p>
          <p className="text-xs font-bold text-ink-soft">{t('youRead')}</p>
        </div>
        <div className="card px-5 py-3">
          <p className="text-2xl font-black tabular-nums text-leaf-600">
            {overall.modulesDone}/{overall.totalModules}
          </p>
          <p className="text-xs font-bold text-ink-soft">{t('progressMods')}</p>
        </div>
      </div>

      <div className="relative mt-8 flex w-full max-w-sm flex-col gap-3">
        {hasQuiz && (
          <Link
            to={`/module/${moduleId}/quiz`}
            className="grid min-h-13 place-items-center rounded-full bg-brand-600 px-6 py-3.5 text-base font-extrabold text-white shadow-[var(--shadow-card)] transition-[background-color,transform] duration-(--duration-fast) hover:bg-brand-700 active:scale-[0.98]"
          >
            {t('takeQuiz')}
          </Link>
        )}
        <Link
          to="/"
          className="grid min-h-13 place-items-center rounded-full border-2 border-line bg-surface px-6 py-3.5 text-base font-extrabold text-ink-soft transition-colors duration-(--duration-fast) hover:border-line-strong"
        >
          {t('backToPath')}
        </Link>
      </div>
    </main>
  )
}
