import { NavLink, Outlet } from 'react-router-dom'
import { useLang } from '@/i18n/LanguageContext'
import { BookIcon, ChatIcon, PersonIcon, TargetIcon } from '@/components/icons'

const tabs = [
  { to: '/', key: 'navHome', Icon: BookIcon, end: true },
  { to: '/goals', key: 'navGoals', Icon: TargetIcon, end: false },
  { to: '/ask', key: 'navAsk', Icon: ChatIcon, end: false },
  { to: '/profile', key: 'navProfile', Icon: PersonIcon, end: false },
] as const

export default function Layout() {
  const { t, lang, toggle } = useLang()

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-20 border-b border-line bg-brand-600 text-white">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 text-lg font-black"
            >
              C
            </span>
            <div className="leading-tight">
              <p className="text-base font-extrabold">{t('appName')}</p>
              <p className="text-[11px] font-semibold text-white/80">{t('tagline')}</p>
            </div>
          </div>
          <button
            onClick={toggle}
            className="rounded-full bg-white/15 px-3 py-2 text-sm font-bold transition hover:bg-white/25"
            aria-label={lang === 'en' ? 'Cambiar a español' : 'Switch to English'}
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
        </div>
      </header>

      <Outlet />

      <nav
        className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        aria-label={t('navHome')}
      >
        <div className="mx-auto flex w-full max-w-2xl">
          {tabs.map(({ to, key, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-[3px] py-2.5 text-xs font-extrabold transition ${
                  isActive ? 'text-brand-600' : 'text-ink-soft'
                }`
              }
            >
              <Icon size={24} />
              {t(key)}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
