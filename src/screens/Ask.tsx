import { useState } from 'react'
import { useLang } from '@/i18n/LanguageContext'
import { chatProvider } from '@/lib/chatProvider'
import type { ChatMessage } from '@/lib/chatProvider'
import { Screen } from '@/components/ui'
import { BLOCK } from '@/components/blocks'
import { ChatIcon, ChevronDownIcon } from '@/components/icons'

/** Seeded from the prototype's "Ask a Question" table. Once Supabase is on,
 *  this list comes from the `questions` table instead. */
const faq = [
  {
    q: {
      en: 'What portion of my plate should be vegetables, proteins and grains?',
      es: '¿Qué parte de mi plato debe ser verduras, proteínas y granos?',
    },
    a: {
      en: 'Half your plate: fruits and vegetables, mostly vegetables. One quarter: whole grains such as brown rice, oats or whole-wheat bread. One quarter: healthy protein such as beans, fish, chicken, eggs or nuts. A small amount of healthy fats such as olive oil or avocado. To drink: water or unsweetened beverages.',
      es: 'La mitad del plato: frutas y verduras, sobre todo verduras. Un cuarto: granos integrales como arroz integral, avena o pan integral. Un cuarto: proteína saludable como frijoles, pescado, pollo, huevos o nueces. Una porción pequeña de grasas saludables como aceite de oliva o aguacate. Para tomar: agua o bebidas sin azúcar.',
    },
  },
  {
    q: {
      en: 'What are healthy protein options for my plate?',
      es: '¿Cuáles son las opciones de proteína saludable para mi plato?',
    },
    a: {
      en: 'Beans, lentils, tofu, eggs, fish, poultry, nuts and seeds are all healthy proteins. Try to limit red and processed meats.',
      es: 'Frijoles, lentejas, tofu, huevos, pescado, pollo, nueces y semillas son proteínas saludables. Trate de limitar las carnes rojas y procesadas.',
    },
  },
  {
    q: {
      en: 'What counts as a whole grain, and how much should I eat?',
      es: '¿Qué cuenta como grano integral y cuánto debo comer?',
    },
    a: {
      en: 'Whole grains include brown rice, oats, whole-wheat bread, barley and quinoa. Fill one quarter of your plate with these instead of refined grains like white bread or white rice.',
      es: 'Los granos integrales incluyen arroz integral, avena, pan integral, cebada y quinoa. Llene un cuarto de su plato con estos en lugar de granos refinados como el pan blanco o el arroz blanco.',
    },
  },
]

export default function Ask() {
  const { t, b, lang } = useLang()
  const [draft, setDraft] = useState('')
  const [sent, setSent] = useState<ChatMessage[]>([])
  const [open, setOpen] = useState<number | null>(0)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    const msgs = await chatProvider.send(text, lang)
    setSent((s) => [...s, ...msgs])
    setDraft('')
  }

  return (
    <Screen title={t('askTitle')} subtitle={t('askIntro')}>
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_380px]">
        <div className="grid content-start gap-3">
          {faq.map((entry, i) => (
            <div key={i} className="card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex min-h-13 w-full items-start gap-3 px-4 py-3.5 text-left transition-colors duration-(--duration-fast) hover:bg-brand-50/60"
              >
                <ChevronDownIcon
                  size={20}
                  className={`mt-0.5 shrink-0 text-brand-600 transition-transform duration-(--duration-base) ${open === i ? '' : '-rotate-90'}`}
                />
                <span className="flex-1 font-bold leading-snug">{b(entry.q)}</span>
              </button>
              {open === i && (
                <p className="px-4 pb-4 pl-11 text-[17px] leading-relaxed text-ink-soft">{b(entry.a)}</p>
              )}
            </div>
          ))}
        </div>

        {/* Ask panel — sits beside the FAQ on a laptop. */}
        <aside className="card flex flex-col gap-4 p-5 lg:sticky lg:top-8">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="block3d h-11 w-11"
              style={BLOCK.brand}
            >
              <ChatIcon size={22} />
            </span>
            <h2 className="text-lg font-extrabold leading-tight">{t('askSide')}</h2>
          </div>
          <p className="text-[15px] leading-relaxed text-ink-soft">{t('askSideP')}</p>

          {sent.length > 0 && (
            <div className="grid gap-2">
              {sent.map((m) => (
                <div key={m.id} className="rounded-2xl bg-brand-50 px-4 py-3">
                  <p className="font-semibold">{m.text}</p>
                  <p className="mt-1 text-sm text-ink-soft">{t('askPending')}</p>
                </div>
              ))}
            </div>
          )}

          {/* A visible label, not just a placeholder: the placeholder vanishes the
              moment someone starts typing, taking the instruction with it. */}
          <form onSubmit={submit}>
            <label htmlFor="ask-input" className="mb-2 block text-[15px] font-extrabold">
              {t('askLabel')}
            </label>
            <textarea
              id="ask-input"
              rows={3}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={t('askPlaceholder')}
              className="block w-full resize-y rounded-2xl border-2 border-line-strong bg-surface px-4 py-3 text-[17px] placeholder:text-ink-soft focus-visible:border-brand-600"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="mt-3 min-h-12 w-full rounded-full bg-brand-600 px-5 py-3 font-extrabold text-white transition-colors duration-(--duration-fast) hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t('askSend')}
            </button>
          </form>
        </aside>
      </div>
    </Screen>
  )
}
