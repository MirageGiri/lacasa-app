import { useState } from 'react'
import { useLang } from '@/i18n/LanguageContext'
import { chatProvider } from '@/lib/chatProvider'
import type { ChatMessage } from '@/lib/chatProvider'
import { Screen } from '@/components/ui'
import { ChevronDownIcon } from '@/components/icons'

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
    <Screen title={t('askTitle')}>
      <p className="mb-5 text-[17px] leading-relaxed text-ink-soft">{t('askIntro')}</p>

      <div className="grid gap-2">
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

      {sent.length > 0 && (
        <div className="mt-5 grid gap-2">
          {sent.map((m) => (
            <div key={m.id} className="rounded-card bg-brand-50 px-4 py-3">
              <p className="font-semibold">{m.text}</p>
              <p className="mt-1 text-sm text-ink-soft">{t('askPending')}</p>
            </div>
          ))}
        </div>
      )}

      {/* A visible label, not just a placeholder: the placeholder vanishes the
          moment someone starts typing, taking the instruction with it. */}
      <form onSubmit={submit} className="mt-6">
        <label htmlFor="ask-input" className="mb-2 block text-[15px] font-extrabold">
          {t('askLabel')}
        </label>
        <div className="flex gap-2">
          <input
            id="ask-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t('askPlaceholder')}
            className="min-h-12 min-w-0 flex-1 rounded-full border-2 border-line-strong bg-surface px-4 py-3 text-[17px] placeholder:text-ink-soft focus-visible:border-brand-600"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            className="min-h-12 rounded-full bg-brand-600 px-5 py-3 font-extrabold text-white transition-colors duration-(--duration-fast) hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t('askSend')}
          </button>
        </div>
      </form>
    </Screen>
  )
}
