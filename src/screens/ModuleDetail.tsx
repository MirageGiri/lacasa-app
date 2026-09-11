import { Link, useParams } from 'react-router-dom'
import { itemsByModule, moduleById, quizzes } from '@/content'
import { useLang } from '@/i18n/LanguageContext'
import { useProgress } from '@/state/ProgressContext'
import { BackLink, Badge, ProgressBar, Screen, accent } from '@/components/ui'
import { ArrowRightIcon, CheckIcon, ModuleIcon } from '@/components/icons'

export default function ModuleDetail() {
  const { moduleId = '' } = useParams()
  const { t, b } = useLang()
  const { isRead, moduleProgress, quizScores } = useProgress()

  const mod = moduleById[moduleId]
  if (!mod) return <Screen title="Not found"><p /></Screen>

  const list = itemsByModule(moduleId)
  const p = moduleProgress(moduleId)
  const a = accent(mod.accent)
  const quiz = quizzes[moduleId] ?? []
  const score = quizScores[moduleId]

  return (
    <Screen>
      <BackLink to="/">{t('navHome')}</BackLink>

      <div className={`mt-2 rounded-card px-5 py-5 ${a.bg}`}>
        <span aria-hidden className={`grid h-14 w-14 place-items-center rounded-2xl bg-surface/70 ${a.text}`}>
          <ModuleIcon name={mod.icon} size={30} />
        </span>
        <h1 className="mt-2 text-2xl font-extrabold leading-tight">{b(mod.title)}</h1>
        <p className="mt-1 text-sm text-ink-soft">{b(mod.blurb)}</p>
        <div className="mt-4"><ProgressBar pct={p.pct} accent={mod.accent} label={b(mod.title)} /></div>
        <p className="mt-2 text-sm font-bold text-ink-soft">
          {p.read}/{p.total} {t('lessons')}
        </p>
      </div>

      <ol className="mt-4 grid gap-2">
        {list.map((item, idx) => (
          <li key={item.id}>
            <Link
              to={`/module/${moduleId}/item/${item.id}`}
              className="card flex items-center gap-3 px-4 py-3.5"
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-extrabold ${
                  isRead(item.id) ? 'bg-leaf-600 text-white' : `${a.bg} ${a.text}`
                }`}
              >
                {isRead(item.id) ? (
                  <>
                    <CheckIcon size={16} />
                    <span className="sr-only">{t('markedComplete')}</span>
                  </>
                ) : (
                  idx + 1
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold leading-snug">{b(item.title)}</span>
                <span className="block text-sm text-ink-soft">{b(item.summary)}</span>
              </span>
              {item.needsSourceCopy && <Badge tone="todo">{t('needsCopy')}</Badge>}
            </Link>
          </li>
        ))}
      </ol>

      {quiz.length > 0 && (
        <Link
          to={`/module/${moduleId}/quiz`}
          className="mt-4 flex items-center justify-between gap-4 rounded-card bg-brand-600 px-5 py-4 text-white shadow-[var(--shadow-card)] transition-colors duration-(--duration-fast) hover:bg-brand-700 active:bg-brand-800"
        >
          <span>
            <span className="block text-base font-extrabold">{t('quizTitle')}</span>
            <span className="block text-sm text-white/85">
              {score ? `${t('quizScore')} ${score.correct}/${score.total}` : t('quizIntro')}
            </span>
          </span>
          <ArrowRightIcon size={24} className="shrink-0" />
        </Link>
      )}
    </Screen>
  )
}
