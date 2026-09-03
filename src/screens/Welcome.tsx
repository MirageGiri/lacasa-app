import { useLang } from '@/i18n/LanguageContext'
import { MailIcon } from '@/components/icons'

/** First-launch screen. Language comes before everything else: a family that
 *  lands on an English screen may never find a toggle in a header. */
export default function Welcome({ onContinue }: { onContinue: () => void }) {
  const { t, lang, setLang } = useLang()

  return (
    <div className="flex min-h-full flex-col bg-brand-600">
      <div className="flex flex-col items-center gap-4 px-6 pb-10 pt-16 text-center text-white">
        <div className="grid h-[76px] w-[76px] place-items-center rounded-3xl bg-white/15 text-4xl font-black">
          C
        </div>
        <div>
          <p className="text-3xl font-black tracking-tight">LA CASA</p>
          <p className="mt-1 text-[13px] font-semibold leading-snug text-white/80">
            {t('tagline')}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 rounded-t-[28px] bg-surface px-6 pb-8 pt-7">
        <section className="flex flex-col gap-2.5">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-ink-soft">
            {t('welcomeChoose')}
          </h2>
          <div className="grid grid-cols-2 gap-2.5">
            {(['es', 'en'] as const).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`rounded-full px-3 py-3.5 text-base font-extrabold transition ${
                  lang === code
                    ? 'bg-brand-600 text-white'
                    : 'border-2 border-line bg-surface text-ink-soft'
                }`}
              >
                {code === 'es' ? 'Español' : 'English'}
              </button>
            ))}
          </div>
        </section>

        <div className="h-px bg-line" />

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-extrabold leading-tight">{t('welcomeEmailH')}</h2>
          <p className="text-[15px] leading-relaxed text-ink-soft">{t('welcomeEmailP')}</p>
          <div className="flex items-center gap-2.5 rounded-2xl border-2 border-line bg-surface px-4 py-3.5 opacity-60">
            <MailIcon size={20} className="shrink-0 text-ink-soft" />
            <span className="text-[17px] text-ink-soft">correo@ejemplo.com</span>
          </div>
          <button
            disabled
            className="flex items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-4 text-[17px] font-extrabold text-white opacity-40"
          >
            {t('welcomeSend')}
            <span className="rounded-full bg-white/25 px-2 py-0.5 text-[11px] font-bold">
              {t('welcomeSoon')}
            </span>
          </button>
        </section>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-line" />
          <span className="text-[13px] font-bold text-ink-soft">{t('welcomeOr')}</span>
          <div className="h-px flex-1 bg-line" />
        </div>

        <section className="flex flex-col gap-2">
          <button
            onClick={onContinue}
            className="rounded-full border-2 border-line bg-surface px-5 py-3.5 text-[17px] font-extrabold text-brand-600"
          >
            {t('welcomeGuest')}
          </button>
          <p className="text-center text-[13px] leading-relaxed text-ink-soft">
            {t('welcomeGuestP')}
          </p>
        </section>

        <p className="mt-auto text-center text-xs text-ink-soft">{t('welcomeFooter')}</p>
      </div>
    </div>
  )
}
