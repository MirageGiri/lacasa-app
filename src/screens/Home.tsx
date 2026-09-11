import { Link } from 'react-router-dom'
import { modules, itemsByModule, stories } from '@/content'
import { useLang } from '@/i18n/LanguageContext'
import { useProgress } from '@/state/ProgressContext'
import { ProgressFill, Screen, accent } from '@/components/ui'
import { CheckIcon, FlameIcon, ModuleIcon } from '@/components/icons'
import StoryArt from '@/components/StoryArt'

/* The lesson list became a path. A flat list of 29 lessons reads as a syllabus;
 * a path shows you where you are and what is one step away.
 *
 * Nodes are NOT locked. A learning app locks ahead because skipping breaks the
 * scaffolding — but this is health information, and refusing to show a parent
 * the hydration module until they have read module 1 would be withholding
 * something they came for. The path motivates; it does not gate. */

/** Serpentine offset, in px, for the nth node down the path. */
const OFFSETS = [0, 46, 74, 46, 0, -46, -74, -46]
const offsetAt = (i: number) => OFFSETS[i % OFFSETS.length]

function Trail({ from, to }: { from: number; to: number }) {
  // Three dots easing between two nodes, so the path reads as continuous.
  return (
    <div aria-hidden className="relative h-11">
      {[0.25, 0.5, 0.75].map((f) => (
        <span
          key={f}
          className="absolute left-1/2 h-2 w-2 rounded-full bg-brand-200"
          style={{
            top: `${f * 100}%`,
            transform: `translate(calc(-50% + ${from + (to - from) * f}px), -50%)`,
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const { t, b } = useLang()
  const { isRead, moduleProgress, overall, nextUp, goals, goalStreak } = useProgress()

  const bestStreak = goals.reduce((best, g) => Math.max(best, goalStreak(g.goalId)), 0)
  let nodeIndex = 0

  return (
    <Screen>
      {/* Status strip — progress and streak, without turning into a scoreboard. */}
      <section className="relative mb-5 overflow-hidden rounded-card bg-gradient-to-br from-brand-600 to-brand-800 px-5 py-4 text-white shadow-[var(--shadow-lift)]">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full border-[14px] border-white/10"
        />
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-extrabold leading-tight">{t('greeting')}</p>
            <p className="mt-1 text-sm font-semibold text-white/85">
              {overall.itemsRead} {t('ofLabel')} {overall.totalItems} {t('youRead')}
            </p>
          </div>
          {bestStreak > 0 && (
            <div className="flex shrink-0 flex-col items-center rounded-2xl bg-white/15 px-3 py-2">
              <FlameIcon size={22} className="text-sun-100" />
              <span className="text-base font-black leading-none">{bestStreak}</span>
              <span className="sr-only">{t('goalStreak')}</span>
            </div>
          )}
        </div>
        <div className="relative mt-3 h-2 w-full overflow-hidden rounded-full bg-white/25" aria-hidden>
          <ProgressFill pct={overall.pct} className="bg-white" />
        </div>
      </section>

      {/* The path itself */}
      <div className="pb-4">
        {modules.map((m) => {
          const list = itemsByModule(m.id)
          const p = moduleProgress(m.id)
          const a = accent(m.accent)

          return (
            <section key={m.id} className="mb-2">
              {/* Module marker — a checkpoint, not a card */}
              <div className="my-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-line" />
                <Link
                  to={`/module/${m.id}`}
                  className={`flex min-h-11 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-extrabold transition-transform duration-(--duration-fast) active:scale-95 ${a.bg} ${a.text}`}
                >
                  <ModuleIcon name={m.icon} size={18} className="shrink-0" />
                  {b(m.title)}
                  {p.done && <CheckIcon size={16} />}
                </Link>
                <span className="h-px flex-1 bg-line" />
              </div>

              {list.map((item, i) => {
                const here = nodeIndex++
                const from = offsetAt(here)
                const to = offsetAt(here + 1)
                const done = isRead(item.id)
                const current = nextUp?.itemId === item.id

                return (
                  <div key={item.id}>
                    <div className="relative flex justify-center">
                      {current && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -top-7 rounded-full bg-brand-600 px-3 py-1 text-xs font-black tracking-wide text-white shadow-[var(--shadow-card)]"
                          style={{ transform: `translateX(${from}px)` }}
                        >
                          {t('pathStart')}
                        </span>
                      )}
                      <Link
                        to={`/module/${m.id}/item/${item.id}`}
                        aria-label={b(item.title)}
                        aria-current={current ? 'step' : undefined}
                        className={`relative grid place-items-center rounded-full font-black transition-transform duration-(--duration-fast) active:scale-95 ${
                          current ? 'h-[74px] w-[74px]' : 'h-16 w-16'
                        } ${
                          done
                            ? `${a.solid} text-white shadow-[var(--shadow-card)]`
                            : current
                              ? `bg-surface ring-[5px] ring-brand-500 shadow-[var(--shadow-lift)] ${a.text}`
                              : `${a.bg} ${a.text} ring-1 ring-inset ring-black/5`
                        }`}
                        style={{ transform: `translateX(${from}px)` }}
                      >
                        {current && (
                          <span
                            aria-hidden
                            className="absolute -inset-2 rounded-full ring-2 ring-brand-200"
                          />
                        )}
                        {done ? <CheckIcon size={28} /> : <span className="text-xl">{i + 1}</span>}
                      </Link>
                    </div>
                    <Trail from={from} to={to} />
                  </div>
                )
              })}
            </section>
          )
        })}

        {/* Storybook sits at the end of the path, as a reward rather than a tab */}
        <div className="mt-2 grid gap-3">
          {stories.map((s) => (
            <Link key={s.id} to={`/story/${s.id}`} className="card flex items-center gap-3 overflow-hidden p-0">
              <span className="h-[76px] w-[92px] shrink-0 overflow-hidden bg-paper-art">
                <StoryArt name={s.cover} />
              </span>
              <span className="min-w-0 flex-1 py-2 pr-4">
                <span className="block text-xs font-extrabold uppercase tracking-wider text-ink-soft">
                  {t('storiesTitle')}
                </span>
                <span className="block font-extrabold leading-snug">{b(s.title)}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Screen>
  )
}
