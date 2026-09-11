import { Link, useParams } from 'react-router-dom'
import { itemsByModule, moduleById, quizzes } from '@/content'
import { useLang } from '@/i18n/LanguageContext'
import { useProgress } from '@/state/ProgressContext'
import { BackLink, Badge, ProgressBar, Screen, accent } from '@/components/ui'
import { ArrowRightIcon, CheckIcon } from '@/components/icons'
import { IconBlock, TiltSurface } from '@/components/depth'

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
  const next = list.find((i) => !isRead(i.id))

  return (
    <Screen>
      <BackLink to="/">{t('navHome')}</BackLink>

      <div className="mt-3 grid items-start gap-5 lg:grid-cols-[minmax(320px,380px)_1fr] lg:gap-6">
        {/* Module summary — sticks beside the lesson list on a laptop. */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-8">
          <TiltSurface max={4} className={`lc-rise overflow-hidden rounded-card p-6 shadow-[var(--shadow-e2)] ${a.bg}`}>
            <IconBlock icon={mod.icon} accent={mod.accent} size={72} className="depth-2" />
            <p className={`depth-1 mt-5 text-xs font-bold uppercase tracking-wider ${a.text}`}>
              {t('moduleN')} {mod.order} · {p.total} {p.total === 1 ? t('lesson') : t('lessons')}
            </p>
            <h1 className="depth-1 mt-1 text-3xl font-extrabold leading-tight">{b(mod.title)}</h1>
            <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{b(mod.blurb)}</p>
            <div className="mt-5">
              <ProgressBar pct={p.pct} accent={mod.accent} label={b(mod.title)} />
            </div>
            <p className="mt-2 text-sm font-bold tabular-nums text-ink-soft">
              {p.read}/{p.total} {t('lessons')}
            </p>
            {next && (
              <Link
                to={`/module/${moduleId}/item/${next.id}`}
                className={`mt-5 flex min-h-12 items-center justify-center gap-2 rounded-full px-5 font-extrabold text-white shadow-[var(--shadow-e2)] transition-[filter,transform] duration-(--duration-fast) hover:brightness-90 active:scale-[0.98] ${a.solid}`}
              >
                {p.read > 0 ? t('continueModule') : t('startModule')}
                <ArrowRightIcon size={18} />
              </Link>
            )}
          </TiltSurface>

          {quiz.length > 0 && (
            <Link
              to={`/module/${moduleId}/quiz`}
              className="lc-rise flex items-center justify-between gap-4 rounded-card bg-gradient-to-br from-brand-600 to-brand-800 px-5 py-4 text-white shadow-[var(--shadow-e2)] transition-[filter] duration-(--duration-fast) hover:brightness-110"
              style={{ animationDelay: '80ms' }}
            >
              <span>
                <span className="block text-base font-extrabold">{t('quizTitle')}</span>
                <span className="block text-sm text-white/85">
                  {score ? `${t('quizScore')} ${score.correct}/${score.total}` : t('quizIntro')}
                </span>
              </span>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15">
                <ArrowRightIcon size={20} />
              </span>
            </Link>
          )}
        </div>

        {/* Lessons */}
        <section aria-labelledby="lessons-h">
          <h2 id="lessons-h" className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-soft">
            {t('inThisModule')}
          </h2>
          <ol className="grid gap-3 xl:grid-cols-2">
            {list.map((item, idx) => {
              const done = isRead(item.id)
              const current = next?.id === item.id
              return (
                <li key={item.id} className="lc-rise" style={{ animationDelay: `${60 + idx * 45}ms` }}>
                  <Link
                    to={`/module/${moduleId}/item/${item.id}`}
                    className={`card flex h-full items-start gap-4 p-4 ${current ? 'ring-2 ring-brand-500' : ''}`}
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                        done ? 'bg-leaf-600 text-white' : `${a.bg} ${a.text}`
                      }`}
                    >
                      {done ? (
                        <>
                          <CheckIcon size={18} />
                          <span className="sr-only">{t('markedComplete')}</span>
                        </>
                      ) : (
                        <span className="font-display text-sm font-extrabold">{idx + 1}</span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-bold uppercase tracking-wider text-ink-soft">
                        {current ? t('upNext') : `${t('lesson')} ${idx + 1}`}
                      </span>
                      <span className="mt-0.5 block text-[17px] font-bold leading-snug">{b(item.title)}</span>
                      <span className="mt-1 block text-[15px] leading-relaxed text-ink-soft">{b(item.summary)}</span>
                      {item.needsSourceCopy && (
                        <span className="mt-2 block">
                          <Badge tone="todo">{t('needsCopy')}</Badge>
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </section>
      </div>
    </Screen>
  )
}
