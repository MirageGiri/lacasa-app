import { useState } from 'react'
import { goalOptions, moduleById } from '@/content'
import { useLang } from '@/i18n/LanguageContext'
import { useProgress } from '@/state/ProgressContext'
import { Screen, accent } from '@/components/ui'

export default function Goals() {
  const { t, b } = useLang()
  const { goals, addGoal, removeGoal, checkInGoal, goalDoneToday, goalStreak } = useProgress()
  const [picking, setPicking] = useState(false)

  const chosen = goals
    .map((g) => ({ tracked: g, option: goalOptions.find((o) => o.id === g.goalId) }))
    .filter((x): x is { tracked: typeof goals[number]; option: (typeof goalOptions)[number] } => Boolean(x.option))

  const available = goalOptions.filter((o) => !goals.some((g) => g.goalId === o.id))

  return (
    <Screen title={t('goalsTitle')}>
      {chosen.length === 0 && !picking && (
        <p className="mb-5 text-[17px] leading-relaxed text-ink-soft">{t('goalsEmpty')}</p>
      )}

      <div className="grid gap-3">
        {chosen.map(({ option }) => {
          const done = goalDoneToday(option.id)
          const streak = goalStreak(option.id)
          const mod = moduleById[option.moduleId]
          const a = accent(mod?.accent ?? 'brand')
          return (
            <div key={option.id} className="card px-4 py-4">
              <div className="flex items-start gap-3">
                <span aria-hidden className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-xl ${a.bg}`}>
                  {mod?.emoji ?? '🎯'}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold leading-snug">{b(option.text)}</p>
                  {streak > 0 && (
                    <p className="mt-1 text-sm font-bold text-leaf-600">
                      🔥 {streak} {t('goalStreak')}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => checkInGoal(option.id)}
                  aria-pressed={done}
                  className={`flex-1 rounded-full px-4 py-3 text-sm font-extrabold transition ${
                    done ? 'bg-leaf-500 text-white' : 'bg-brand-600 text-white'
                  }`}
                >
                  {done ? `✓ ${t('goalDoneToday')}` : t('goalMarkToday')}
                </button>
                <button
                  onClick={() => removeGoal(option.id)}
                  className="rounded-full border border-line px-4 py-3 text-sm font-bold text-ink-soft"
                >
                  {t('goalRemove')}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {picking ? (
        <div className="mt-4 card px-4 py-4">
          <p className="mb-3 font-extrabold">{t('goalsChoose')}</p>
          <div className="grid gap-2">
            {available.map((o) => (
              <button
                key={o.id}
                onClick={() => { addGoal(o.id); setPicking(false) }}
                className="rounded-[--radius-card] border border-line px-4 py-3 text-left font-semibold transition hover:border-brand-300"
              >
                <span aria-hidden className="mr-2">{moduleById[o.moduleId]?.emoji}</span>
                {b(o.text)}
              </button>
            ))}
          </div>
        </div>
      ) : (
        available.length > 0 && (
          <button
            onClick={() => setPicking(true)}
            className="mt-4 w-full rounded-full border-2 border-dashed border-brand-300 px-5 py-3.5 font-extrabold text-brand-700"
          >
            + {t('goalsAdd')}
          </button>
        )
      )}
    </Screen>
  )
}
