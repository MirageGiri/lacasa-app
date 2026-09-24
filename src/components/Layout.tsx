import type { CSSProperties } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useLang } from '@/i18n/LanguageContext'
import { useProgress } from '@/state/ProgressContext'
import { BookIcon, ChatIcon, PersonIcon, SparklesIcon, TargetIcon, StoryIcon } from '@/components/icons'
import { ProgressFill } from '@/components/ui'

const tabs = [
  { to: '/', key: 'navHome', Icon: BookIcon, end: true },
  { to: '/goals', key: 'navGoals', Icon: TargetIcon, end: false },
  { to: '/chat', key: 'navChat', Icon: SparklesIcon, end: false },
  { to: '/ask', key: 'navAsk', Icon: ChatIcon, end: false },
  { to: '/profile', key: 'navProfile', Icon: PersonIcon, end: false },
] as const

/* Web-first shell. At laptop width (lg, 1024px+) navigation lives in a fixed
 * left sidebar and content gets the full width. Below that the phone layout
 * returns: brand header on top, tab bar at the bottom. */
export default function Layout() {
  const { t, lang, setLang, toggle } = useLang()
  const { overall } = useProgress()

  return (
    <div className="min-h-full">
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('main')?.focus()
        }}
      >
        {t('skipToContent')}
      </a>

      {/* ---------- Desktop sidebar ---------- */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col overflow-hidden bg-gradient-to-b from-brand-800 to-brand-950 text-white lg:flex">
        <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-600/30 blur-2xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-sun-500/15 blur-2xl" />

        <div className="relative flex items-center gap-3 px-5 pb-6 pt-6">
          <span
            aria-hidden
            className="block3d h-11 w-11 font-display text-xl font-extrabold"
            style={{ '--b-hi': '#F472AE', '--b-face': '#D81B72', '--b-lo': '#C2185B', '--b-edge': '#3E0A24' } as CSSProperties}
          >
            C
          </span>
          <div className="leading-tight">
            <p className="font-display text-lg font-extrabold tracking-tight">{t('appName')}</p>
            <p className="text-xs font-semibold text-white/75">{t('uamsProgram')}</p>
          </div>
        </div>

        <nav aria-label={t('navMain')} className="relative flex flex-col gap-1 px-3">
          {[...tabs.slice(0, 1), { to: '/stories', key: 'storiesTitle', Icon: StoryIcon, end: false } as const, ...tabs.slice(1)].map(
            ({ to, key, Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `group relative flex min-h-11 items-center gap-3 rounded-xl px-3 text-[15px] font-bold transition-colors duration-(--duration-fast) ${
                    isActive ? 'bg-white/12 text-white' : 'text-white/75 hover:bg-white/6 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      aria-hidden
                      className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-brand-300 transition-opacity ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <Icon size={20} />
                    {t(key)}
                  </>
                )}
              </NavLink>
            ),
          )}
        </nav>

        <div className="relative mt-auto flex flex-col gap-4 px-5 pb-6">
          <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white/70">{t('yourProgress')}</span>
              <span className="font-display text-sm font-extrabold tabular-nums">{overall.pct}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15" aria-hidden>
              <ProgressFill pct={overall.pct} className="bg-gradient-to-r from-aqua-500 to-leaf-500" />
            </div>
            <p className="mt-2 text-xs text-white/70">
              {overall.itemsRead} {t('ofLabel')} {overall.totalItems} {t('youRead')}
            </p>
          </div>

          <div role="group" aria-label={t('language')} className="grid grid-cols-2 gap-1 rounded-full bg-white/8 p-1 ring-1 ring-white/10">
            {(['es', 'en'] as const).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`min-h-9 rounded-full text-sm font-bold transition-colors duration-(--duration-fast) ${
                  lang === code ? 'bg-white text-brand-800' : 'text-white/80 hover:text-white'
                }`}
              >
                {code === 'es' ? 'Español' : 'English'}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* ---------- Phone header ---------- */}
      <header className="sticky top-0 z-20 overflow-hidden bg-brand-600 text-white shadow-[var(--shadow-bar)] lg:hidden">
        {/* Drawn in a darker tint, never lighter: the white title has to keep
            its contrast wherever these land. */}
        <span aria-hidden className="pointer-events-none absolute -right-10 -top-14 h-40 w-40 rounded-full bg-brand-800/35" />
        <span aria-hidden className="pointer-events-none absolute right-16 -bottom-16 h-28 w-28 rounded-full bg-brand-700/35" />
        <div className="relative mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-xl bg-white/20 text-lg font-black ring-1 ring-white/25"
            >
              C
            </span>
            <div className="leading-tight">
              <p className="text-base font-extrabold">{t('appName')}</p>
              <p className="text-xs font-semibold text-white/85">{t('tagline')}</p>
            </div>
          </div>
          <button
            onClick={toggle}
            className="grid min-h-11 min-w-11 place-items-center rounded-full bg-white/15 px-3 text-sm font-bold ring-1 ring-white/25 transition-colors duration-(--duration-fast) hover:bg-white/25 active:bg-white/30"
            aria-label={lang === 'en' ? 'Cambiar a español' : 'Switch to English'}
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
        </div>
      </header>

      <div className="lg:pl-64">
        <Outlet />
      </div>

      {/* ---------- Phone tab bar ---------- */}
      <nav
        className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface/85 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        aria-label={t('navMain')}
      >
        <div className="mx-auto flex w-full max-w-3xl">
          {tabs.map(({ to, key, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex min-h-14 flex-1 flex-col items-center justify-center gap-[3px] pb-2 pt-1.5 text-xs font-extrabold transition-colors duration-(--duration-fast) ${
                  isActive ? 'text-brand-700' : 'text-ink-soft'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`grid h-8 w-14 place-items-center rounded-full transition-colors duration-(--duration-fast) ${
                      isActive ? 'bg-brand-100' : 'bg-transparent'
                    }`}
                  >
                    <Icon size={24} />
                  </span>
                  {t(key)}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
