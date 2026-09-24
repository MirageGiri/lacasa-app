import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { goalOptions, itemById, itemsByModule, moduleById, modules, stories } from '@/content'
import type { Module } from '@/content'
import { useLang } from '@/i18n/LanguageContext'
import { useProgress } from '@/state/ProgressContext'
import { ProgressFill, Screen, accent } from '@/components/ui'
import { ArrowRightIcon, CheckIcon, FlameIcon, StoryIcon } from '@/components/icons'
import { HeroScene, IconBlock, ProgressRing, TiltSurface } from '@/components/depth'
import StoryArt from '@/components/StoryArt'
import { todayKey } from '@/lib/storage'

/* Web dashboard. Replaces the numbered lesson path: a family sees, at a glance,
 * what to read next, how far they have come, and every module as a card they
 * can open in any order. Nothing is locked — this is health information, and
 * a parent who came for hydration should not have to read module 1 first. */

function lastSeven() {
  const out: string[] = []
  for (let i = 6; i >= 0; i -= 1) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    out.push(todayKey(d))
  }
  return out
}

const rise = (i: number) => ({ animationDelay: `${60 + i * 55}ms` })

function ModuleCard({ m, index }: { m: Module; index: number }) {
  const { t, b } = useLang()
  const { moduleProgress, quizScores } = useProgress()
  const p = moduleProgress(m.id)
  const a = accent(m.accent)
  const quiz = quizScores[m.id]

  return (
    <TiltSurface
      className="lc-rise group flex h-full flex-col rounded-card border border-line bg-surface p-5 shadow-[var(--shadow-e2)] hover:shadow-[var(--shadow-e3)]"
      style={rise(index)}
    >
      <div className="depth-1 pointer-events-none flex items-start justify-between gap-3">
        <IconBlock icon={m.icon} accent={m.accent} size={50} />
        {p.done ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-leaf-100 px-2.5 py-1 text-xs font-bold text-leaf-800">
            <CheckIcon size={14} />
            {t('reviewModule')}
          </span>
        ) : (
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${a.bg} ${a.text}`}>
            {p.read > 0 ? `${p.pct}%` : t('startModule')}
          </span>
        )}
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-ink-soft">
        {t('moduleN')} {m.order} · {p.total} {p.total === 1 ? t('lesson') : t('lessons')}
      </p>
      <h3 className="mt-1 text-lg font-extrabold leading-snug">
        {/* Stretched link: the whole card is the target, one tab stop. */}
        <Link to={`/module/${m.id}`} className="after:absolute after:inset-0 after:z-10 after:rounded-card after:content-['']">
          {b(m.title)}
        </Link>
      </h3>
      <p className="mt-1.5 line-clamp-2 text-[15px] leading-relaxed text-ink-soft">{b(m.blurb)}</p>

      <div className="mt-auto pt-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-line" aria-hidden>
          <ProgressFill pct={p.pct} className={a.bar} />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs font-bold text-ink-soft">
          <span className="tabular-nums">
            {p.read}/{p.total} {t('lessons')}
          </span>
          {quiz && (
            <span className="tabular-nums">
              {t('quizShort')} {quiz.correct}/{quiz.total}
            </span>
          )}
        </div>
      </div>
    </TiltSurface>
  )
}

function FeaturedModule({ m }: { m: Module }) {
  const { t, b } = useLang()
  const { isRead, moduleProgress } = useProgress()
  const list = itemsByModule(m.id)
  const p = moduleProgress(m.id)
  const a = accent(m.accent)
  const next = list.find((i) => !isRead(i.id)) ?? list[0]
  const shown = list.slice(0, 3)

  return (
    <TiltSurface
      max={4}
      className="lc-rise flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-[var(--shadow-e2)] hover:shadow-[var(--shadow-e3)] sm:col-span-2"
      style={rise(0)}
    >
      <div className={`relative flex items-start gap-4 px-6 pb-5 pt-6 ${a.bg}`}>
        <IconBlock icon={m.icon} accent={m.accent} size={68} className="depth-2" />
        <div className="depth-1 min-w-0">
          <p className={`text-xs font-bold uppercase tracking-wider ${a.text}`}>
            {t('upNext')} · {t('moduleN')} {m.order}
          </p>
          <h3 className="mt-1 text-2xl font-extrabold leading-tight">
            <Link to={`/module/${m.id}`} className="hover:underline">
              {b(m.title)}
            </Link>
          </h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{b(m.blurb)}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
        <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">{t('inThisModule')}</p>
        <ol className="mt-2 grid gap-1">
          {shown.map((item) => {
            const done = isRead(item.id)
            const current = item.id === next?.id && !done
            return (
              <li key={item.id}>
                <Link
                  to={`/module/${m.id}/item/${item.id}`}
                  aria-current={current ? 'step' : undefined}
                  className={`flex min-h-11 items-center gap-3 rounded-xl px-2.5 py-2 transition-colors duration-(--duration-fast) hover:bg-brand-50 ${
                    current ? 'bg-brand-50' : ''
                  }`}
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                      done
                        ? 'bg-leaf-600 text-white'
                        : current
                          ? 'bg-brand-600 text-white'
                          : 'border-2 border-line-strong/50 text-transparent'
                    }`}
                  >
                    {done ? <CheckIcon size={14} /> : current ? <ArrowRightIcon size={14} /> : null}
                    <span className="sr-only">{done ? t('markedComplete') : ''}</span>
                  </span>
                  <span className={`min-w-0 flex-1 truncate text-[15px] ${current ? 'font-extrabold' : 'font-semibold'}`}>
                    {b(item.title)}
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
        {list.length > shown.length && (
          <Link to={`/module/${m.id}`} className="mt-1 inline-flex min-h-11 items-center px-2.5 text-sm font-bold text-brand-700 hover:underline">
            +{list.length - shown.length} {t('lessons')}
          </Link>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
          <div className="min-w-40 flex-1">
            <div className="h-2 overflow-hidden rounded-full bg-line" aria-hidden>
              <ProgressFill pct={p.pct} className={a.bar} />
            </div>
            <p className="mt-1.5 text-xs font-bold tabular-nums text-ink-soft">
              {p.read}/{p.total} {t('lessons')}
            </p>
          </div>
          {next && (
            <Link
              to={`/module/${m.id}/item/${next.id}`}
              className={`inline-flex min-h-12 items-center gap-2 rounded-full px-5 font-extrabold text-white shadow-[var(--shadow-e2)] transition-[filter,transform] duration-(--duration-fast) hover:brightness-90 active:scale-[0.98] ${a.solid}`}
            >
              {p.read > 0 ? t('continueModule') : t('startModule')}
              <ArrowRightIcon size={18} />
            </Link>
          )}
        </div>
      </div>
    </TiltSurface>
  )
}

export default function Home() {
  const { t, b } = useLang()
  const { overall, nextUp, goals, goalStreak } = useProgress()

  const nextItem = nextUp ? itemById[nextUp.itemId] : null
  const nextMod = nextUp ? moduleById[nextUp.moduleId] : null
  const featured = nextMod ?? modules[0]
  const others = modules.filter((m) => m.id !== featured.id)

  const lead = [...goals].sort((a, c) => goalStreak(c.goalId) - goalStreak(a.goalId))[0]
  const leadOption = lead && goalOptions.find((o) => o.id === lead.goalId)
  const streak = lead ? goalStreak(lead.goalId) : 0
  const checkIns = new Set(lead?.checkIns ?? [])
  const week = lastSeven()

  return (
    <Screen>
      <div className="grid gap-4 lg:gap-5 xl:grid-cols-12">
        {/* ---------- Hero ---------- */}
        <section
          className="lc-rise relative overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white shadow-[var(--shadow-e3)] xl:col-span-8"
          style={rise(0)}
        >
          <span aria-hidden className="pointer-events-none absolute -left-24 -top-32 h-80 w-80 rounded-full bg-brand-400/30 blur-3xl" />
          <span aria-hidden className="pointer-events-none absolute -bottom-40 right-10 h-80 w-80 rounded-full bg-sun-500/25 blur-3xl" />

          <div className="relative grid items-center gap-2 md:grid-cols-[1fr_minmax(260px,330px)]">
            <div className="px-6 pb-6 pt-6 md:py-8 md:pl-8 md:pr-2">
              <p className="text-sm font-semibold text-white/85">{t('tagline')}</p>
              <h1 className="mt-1.5 text-3xl font-extrabold leading-[1.1] tracking-tight md:text-[40px]">
                {t('greeting')}
              </h1>
              <p className="mt-2 text-[15px] text-white/85">
                {overall.itemsRead} {t('ofLabel')} {overall.totalItems} {t('youRead')} · {overall.modulesDone}/
                {overall.totalModules} {t('modulesDone')}
              </p>

              {nextItem && nextMod ? (
                <Link
                  to={`/module/${nextMod.id}/item/${nextItem.id}`}
                  className="group mt-5 flex items-center gap-4 rounded-2xl bg-white/12 p-3 pr-4 ring-1 ring-white/20 backdrop-blur-md transition-colors duration-(--duration-fast) hover:bg-white/18"
                >
                  <IconBlock icon={nextMod.icon} accent={nextMod.accent} size={48} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-bold uppercase tracking-wider text-white/75">
                      {t('upNext')}
                    </span>
                    <span className="block truncate text-base font-extrabold">{b(nextItem.title)}</span>
                    <span className="block truncate text-sm text-white/80">{b(nextMod.title)}</span>
                  </span>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-brand-700 transition-transform duration-(--duration-fast) group-hover:translate-x-0.5">
                    <ArrowRightIcon size={20} />
                  </span>
                </Link>
              ) : (
                <p className="mt-5 rounded-2xl bg-white/12 p-4 font-bold ring-1 ring-white/20">{t('allRead')}</p>
              )}
            </div>

            <HeroScene className="hidden h-[300px] md:block" />
          </div>
        </section>

        {/* ---------- Stats ---------- */}
        <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:gap-5 xl:col-span-4 xl:grid-cols-1">
          <section
            className="lc-rise flex min-w-0 items-center gap-5 rounded-card border border-line bg-surface p-5 shadow-[var(--shadow-e2)]"
            style={rise(1)}
          >
            <ProgressRing pct={overall.pct} size={104} label={`${overall.pct}%`} />
            <div className="min-w-0">
              <h2 className="text-xs font-bold uppercase tracking-wider text-ink-soft">{t('yourProgress')}</h2>
              <p className="mt-1 font-display text-2xl font-extrabold tabular-nums">
                {overall.itemsRead}
                <span className="text-base font-bold text-ink-soft">/{overall.totalItems}</span>
              </p>
              <p className="text-sm text-ink-soft">{t('progressRead')}</p>
              <p className="mt-1 text-sm font-bold text-leaf-600">
                {overall.modulesDone}/{overall.totalModules} {t('modulesDone')}
              </p>
            </div>
          </section>

          <section
            className="lc-rise flex min-w-0 flex-col rounded-card border border-line bg-surface p-5 shadow-[var(--shadow-e2)]"
            style={rise(2)}
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="block3d h-11 w-11"
                style={{ '--b-hi': '#FFC23D', '--b-face': '#F0A202', '--b-lo': '#C77F00', '--b-edge': '#8A5A00' } as CSSProperties}
              >
                <FlameIcon size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-xl font-extrabold leading-tight tabular-nums">
                  {streak} {t('goalStreak')}
                </p>
                <p className="truncate text-sm text-ink-soft">
                  {leadOption ? b(leadOption.text) : t('streakEmpty')}
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-ink-soft">{t('lastSevenDays')}</p>
            <div className="mt-2 grid grid-cols-7 gap-1.5" aria-hidden>
              {week.map((d) => (
                <span
                  key={d}
                  className={`h-7 rounded-lg ${
                    checkIns.has(d) ? 'bg-gradient-to-b from-leaf-500 to-leaf-600 shadow-[0_3px_0_var(--color-leaf-800)]' : 'bg-line'
                  }`}
                />
              ))}
            </div>
            <Link to="/goals" className="mt-3 inline-flex min-h-11 items-center gap-1 self-start text-sm font-bold text-brand-700 hover:underline">
              {t('openGoals')}
              <ArrowRightIcon size={16} />
            </Link>
          </section>
        </div>
      </div>

      {/* ---------- Modules ---------- */}
      <div className="mb-4 mt-9 flex items-end justify-between gap-3">
        <h2 className="text-2xl font-extrabold tracking-tight">{t('modulesTitle')}</h2>
        <span className="text-sm font-bold text-ink-soft">
          {overall.modulesDone}/{overall.totalModules} {t('modulesDone')}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
        <FeaturedModule m={featured} />
        {others.map((m, i) => (
          <ModuleCard key={m.id} m={m} index={i + 1} />
        ))}

        {stories.slice(0, 1).map((s) => (
          <TiltSurface
            key={s.id}
            max={4}
            className="lc-rise overflow-hidden rounded-card border border-line bg-surface shadow-[var(--shadow-e2)] hover:shadow-[var(--shadow-e3)] sm:col-span-2 lg:col-span-1 xl:col-span-4"
            style={rise(others.length + 1)}
          >
            <div className="grid h-full grid-cols-[42%_1fr] lg:grid-cols-1 xl:grid-cols-[260px_1fr]">
              <div className="max-h-44 overflow-hidden bg-paper-art">
                <StoryArt name={s.cover} />
              </div>
              <div className="flex flex-col justify-center gap-1 p-5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-soft">
                  <StoryIcon size={14} />
                  {t('storiesTitle')}
                </span>
                <h3 className="text-lg font-extrabold leading-snug">
                  <Link to={`/story/${s.id}`} className="after:absolute after:inset-0 after:z-10 after:content-['']">
                    {b(s.title)}
                  </Link>
                </h3>
                <p className="line-clamp-2 text-[15px] text-ink-soft">{b(s.blurb)}</p>
              </div>
            </div>
          </TiltSurface>
        ))}
      </div>
    </Screen>
  )
}
