import { useState } from 'react'
import { goalOptions, modules, itemsByModule } from '@/content'
import { useLang } from '@/i18n/LanguageContext'
import { useProgress } from '@/state/ProgressContext'
import { ProgressBar, Screen } from '@/components/ui'
import { CheckIcon, FlameIcon } from '@/components/icons'
import { isSupabaseConfigured } from '@/lib/supabase'
import { todayKey } from '@/lib/storage'

const WEEKDAY_LETTERS = {
  en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  es: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
} as const

/** Last seven days, oldest first, for the streak strip. */
function lastSevenDays(lang: 'en' | 'es') {
  const out: { key: string; label: string; isToday: boolean }[] = []
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    out.push({ key: todayKey(d), label: WEEKDAY_LETTERS[lang][d.getDay()], isToday: i === 0 })
  }
  return out
}

export default function Profile() {
  const { t, b, lang, setLang } = useLang()
  const { overall, moduleProgress, goals, goalStreak, reset } = useProgress()
  const [confirming, setConfirming] = useState(false)

  const days = lastSevenDays(lang)
  // The goal with the longest run is the one worth showing at the top.
  const lead = [...goals].sort((a, c) => goalStreak(c.goalId) - goalStreak(a.goalId))[0]
  const leadOption = lead && goalOptions.find((o) => o.id === lead.goalId)
  const leadStreak = lead ? goalStreak(lead.goalId) : 0
  const checkIns = new Set(lead?.checkIns ?? [])

  const started = modules.filter((m) => moduleProgress(m.id).read > 0)

  return (
    <Screen title={t('progressTitle')}>
      <div className="grid grid-cols-2 gap-3">
        <div className="card px-4 py-4">
          <p className="text-[34px] font-black leading-none tabular-nums text-brand-700">
            {overall.itemsRead}
            <span className="text-lg font-extrabold text-ink-soft">/{overall.totalItems}</span>
          </p>
          <p className="mt-1.5 text-[13px] font-bold text-ink-soft">{t('progressRead')}</p>
        </div>
        <div className="card px-4 py-4">
          <p className="text-[34px] font-black leading-none tabular-nums text-leaf-600">
            {overall.modulesDone}
            <span className="text-lg font-extrabold text-ink-soft">/{overall.totalModules}</span>
          </p>
          <p className="mt-1.5 text-[13px] font-bold text-ink-soft">{t('progressMods')}</p>
        </div>
      </div>

      <section className="card mt-3 flex flex-col gap-3 px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <FlameIcon size={24} className="text-sun-500" />
            <span className="text-[17px] font-extrabold">
              {leadStreak} {t('goalStreak')}
            </span>
          </div>
          <span className="min-w-0 truncate text-[13px] font-bold text-ink-soft">
            {leadOption ? b(leadOption.text) : t('progressNoGoal')}
          </span>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {days.map((day) => {
            const done = checkIns.has(day.key)
            return (
              <div key={day.key} className="flex flex-col items-center gap-1.5">
                <div
                  className={`grid h-[34px] w-full place-items-center rounded-xl ${
                    done
                      ? 'bg-emerald-100'
                      : day.isToday
                        ? 'border-2 border-dashed border-line bg-surface'
                        : 'bg-line'
                  }`}
                >
                  {done && <CheckIcon size={16} className="text-leaf-600" />}
                </div>
                <span className="text-[11px] font-bold text-ink-soft">{day.label}</span>
              </div>
            )
          })}
        </div>
      </section>

      {started.length > 0 && (
        <section className="card mt-3 flex flex-col gap-3.5 px-4 py-4">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-ink-soft">
            {t('progressByMod')}
          </h2>
          {started.map((m) => {
            const p = moduleProgress(m.id)
            return (
              <div key={m.id} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="min-w-0 flex-1 text-[15px] font-bold leading-snug">
                    {b(m.title)}
                  </span>
                  <span className="shrink-0 text-[13px] font-extrabold tabular-nums text-ink-soft">
                    {p.read}/{itemsByModule(m.id).length}
                  </span>
                </div>
                <ProgressBar pct={p.pct} accent={m.accent} />
              </div>
            )
          })}
        </section>
      )}

      <section className="card mt-3 px-4 py-4">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-ink-soft">
          {t('language')}
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {(['en', 'es'] as const).map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
              className={`rounded-full px-4 py-3 font-extrabold transition ${
                lang === code
                  ? 'bg-brand-600 text-white'
                  : 'border border-line bg-surface text-ink-soft'
              }`}
            >
              {code === 'en' ? t('english') : t('spanish')}
            </button>
          ))}
        </div>
      </section>

      <section className="card mt-3 px-4 py-4">
        {confirming ? (
          <>
            <p className="text-[17px] leading-relaxed">{t('resetConfirm')}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => {
                  reset()
                  setConfirming(false)
                }}
                className="flex-1 rounded-full bg-red-600 px-4 py-3 font-extrabold text-white"
              >
                {t('resetProgress')}
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="flex-1 rounded-full border border-line px-4 py-3 font-bold"
              >
                {t('previous')}
              </button>
            </div>
          </>
        ) : (
          <button onClick={() => setConfirming(true)} className="font-bold text-red-600">
            {t('resetProgress')}
          </button>
        )}
      </section>

      {!isSupabaseConfigured && (
        <p className="mt-4 text-center text-xs text-ink-soft">
          Running on device storage — add Supabase keys to sync across devices.
        </p>
      )}
    </Screen>
  )
}
