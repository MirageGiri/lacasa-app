import { useState } from 'react'
import { goalOptions, moduleById } from '@/content'
import { useLang } from '@/i18n/LanguageContext'
import { useProgress } from '@/state/ProgressContext'
import { Screen, accent } from '@/components/ui'
import { CheckIcon, FlameIcon, ModuleIcon, PlusIcon, TargetIcon } from '@/components/icons'

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
                <span aria-hidden className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${a.bg} ${a.text}`}>
                  {mod ? <ModuleIcon name={mod.icon} size={22} /> : <TargetIcon size={22} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-bold leading-snug">{b(option.text)}</p>
                  {streak > 0 && (
                    <p className="mt-1 flex items-center gap-1 text-sm font-bold text-leaf-600">
                      <FlameIcon size={16} className="text-sun-600" />
                      {streak} {t('goalStreak')}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => checkInGoal(option.id)}
                  aria-pressed={done}
                  className={`flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-3 text-[15px] font-extrabold text-white transition-colors duration-(--duration-fast) ${
                    done ? 'bg-leaf-600 hover:bg-leaf-800' : 'bg-brand-600 hover:bg-brand-700'
                  }`}
                >
                  {done && <CheckIcon size={18} />}
                  {done ? t('goalDoneToday') : t('goalMarkToday')}
                </button>
                <button
                  onClick={() => removeGoal(option.id)}
                  className="min-h-12 rounded-full border border-line px-4 py-3 text-[15px] font-bold text-ink-soft transition-colors duration-(--duration-fast) hover:border-line-strong hover:text-ink"
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
                className="flex min-h-12 items-center gap-3 rounded-card border border-line px-4 py-3 text-left font-semibold transition-colors duration-(--duration-fast) hover:border-brand-300 hover:bg-brand-50"
              >
                {moduleById[o.moduleId] && (
                  <span aria-hidden className={`shrink-0 ${accent(moduleById[o.moduleId].accent).text}`}>
                    <ModuleIcon name={moduleById[o.moduleId].icon} size={20} />
                  </span>
                )}
                <span>{b(o.text)}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        available.length > 0 && (
          <button
            onClick={() => setPicking(true)}
            className="mt-4 flex min-h-13 w-full items-center justify-center gap-2 rounded-full border-2 border-dashed border-brand-400 px-5 py-3.5 font-extrabold text-brand-700 transition-colors duration-(--duration-fast) hover:bg-brand-50"
          >
            <PlusIcon size={20} />
            {t('goalsAdd')}
          </button>
        )
      )}
    </Screen>
  )
}
