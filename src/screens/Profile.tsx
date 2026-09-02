import { useState } from 'react'
import { useLang } from '@/i18n/LanguageContext'
import { useProgress } from '@/state/ProgressContext'
import { Screen } from '@/components/ui'
import { isSupabaseConfigured } from '@/lib/supabase'

export default function Profile() {
  const { t, lang, setLang } = useLang()
  const { overall, reset } = useProgress()
  const [confirming, setConfirming] = useState(false)

  return (
    <Screen title={t('profileTitle')}>
      <section className="card px-4 py-4">
        <h2 className="text-sm font-extrabold uppercase tracking-wide text-ink-soft">{t('language')}</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {(['en', 'es'] as const).map((code) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
              className={`rounded-full px-4 py-3 font-extrabold transition ${
                lang === code ? 'bg-brand-600 text-white' : 'border border-line bg-surface text-ink-soft'
              }`}
            >
              {code === 'en' ? t('english') : t('spanish')}
            </button>
          ))}
        </div>
      </section>

      <section className="card mt-3 px-4 py-4">
        <h2 className="text-sm font-extrabold uppercase tracking-wide text-ink-soft">{t('yourProgress')}</h2>
        <p className="mt-2 text-3xl font-black text-brand-700">
          {overall.itemsRead}
          <span className="text-lg font-bold text-ink-soft">/{overall.totalItems}</span>
        </p>
        <p className="text-sm font-semibold text-ink-soft">
          {overall.modulesDone} {t('ofLabel')} {overall.totalModules} {t('modulesDone')}
        </p>
      </section>

      <section className="card mt-3 px-4 py-4">
        {confirming ? (
          <>
            <p className="text-[17px] leading-relaxed">{t('resetConfirm')}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => { reset(); setConfirming(false) }}
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
