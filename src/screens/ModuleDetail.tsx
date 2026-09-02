import { Link, useParams } from 'react-router-dom'
import { itemsByModule, moduleById, quizzes } from '@/content'
import { useLang } from '@/i18n/LanguageContext'
import { useProgress } from '@/state/ProgressContext'
import { Badge, ProgressBar, Screen, accent } from '@/components/ui'

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
      <Link to="/" className="text-sm font-bold text-brand-600">← {t('navHome')}</Link>

      <div className={`mt-3 rounded-[--radius-card] px-5 py-5 ${a.bg}`}>
        <span aria-hidden className="text-4xl">{mod.emoji}</span>
        <h1 className="mt-2 text-2xl font-extrabold leading-tight">{b(mod.title)}</h1>
        <p className="mt-1 text-sm text-ink-soft">{b(mod.blurb)}</p>
        <div className="mt-4"><ProgressBar pct={p.pct} accent={mod.accent} /></div>
        <p className="mt-2 text-xs font-bold text-ink-soft">
          {p.read}/{p.total} {t('lessons')}
        </p>
      </div>

      <ol className="mt-4 grid gap-2">
        {list.map((item, idx) => (
          <li key={item.id}>
            <Link
              to={`/module/${moduleId}/item/${item.id}`}
              className="card flex items-center gap-3 px-4 py-3.5 transition hover:shadow-md"
            >
              <span
                aria-hidden
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-extrabold ${
                  isRead(item.id) ? 'bg-leaf-500 text-white' : `${a.bg} ${a.text}`
                }`}
              >
                {isRead(item.id) ? '✓' : idx + 1}
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
          className="mt-4 flex items-center justify-between rounded-[--radius-card] bg-brand-600 px-5 py-4 text-white transition hover:bg-brand-700"
        >
          <span>
            <span className="block text-base font-extrabold">{t('quizTitle')}</span>
            <span className="block text-sm text-white/85">
              {score ? `${t('quizScore')} ${score.correct}/${score.total}` : t('quizIntro')}
            </span>
          </span>
          <span aria-hidden className="text-2xl">→</span>
        </Link>
      )}
    </Screen>
  )
}
