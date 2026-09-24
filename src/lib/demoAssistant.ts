/* ---------------------------------------------------------------------------
   Demo assistant — NOT an LLM.

   Lets the chat UI be shown today. It matches the question's words against
   the LA CASA lessons and answers with that lesson's own copy, so it can only
   ever repeat reviewed curriculum. When the Azure OpenAI edge function exists,
   `chatProvider.ts` swaps this out; the chat screen does not change.
--------------------------------------------------------------------------- */
import { items, modules } from '@/content'
import type { Block, Item } from '@/content/types'
import type { Lang } from '@/i18n/strings'

const STOP = new Set(
  (
    'the and for are how what why when who can should my our your you with about into from that this have has ' +
    'does did much many more most some any kids kid child children family need needs tell give idea ideas get ' +
    'que qué como cómo cual cuál cuanto cuánto cuanta cuánta cuantos para por con los las una uno unos unas del ' +
    'mis sus mas más debe deben puedo pueden hijos hijo familia sobre dar ideas tener hay'
  ).split(' '),
)

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const tokens = (s: string) =>
  norm(s)
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !STOP.has(w))
    // crude stem so "drinks"/"drink", "bebidas"/"bebida" meet
    .map((w) => w.replace(/(es|s)$/, ''))

function blockText(b: Block, lang: Lang): string {
  switch (b.kind) {
    case 'p':
    case 'callout':
      return b.text[lang]
    case 'ul':
      return b.items[lang].join(' ')
    case 'stat':
      return `${b.value} ${b.label[lang]}`
  }
}

interface Indexed {
  item: Item
  title: Set<string>
  rest: Set<string>
}

/* Built once. Each lesson's words, split into title words and body words. */
const INDEX: Indexed[] = items
  .filter((i) => !i.needsSourceCopy)
  .map((item) => ({
    item,
    title: new Set(tokens(`${item.title.en} ${item.title.es}`)),
    rest: new Set(
      tokens(
        `${item.summary.en} ${item.summary.es} ${item.body.map((b) => blockText(b, 'en') + ' ' + blockText(b, 'es')).join(' ')}`,
      ),
    ),
  }))

/* Inverse document frequency: a word that appears in every lesson ("drink")
 * says little; a word in two lessons ("water") says a lot. */
const IDF = (() => {
  const df = new Map<string, number>()
  for (const x of INDEX) for (const w of new Set([...x.title, ...x.rest])) df.set(w, (df.get(w) ?? 0) + 1)
  const n = INDEX.length
  return (w: string) => Math.log((n + 1) / ((df.get(w) ?? 0) + 0.5))
})()

/* Topic words per module, so a question lands in the right module before the
 * best lesson inside it is chosen: "water" should mean Hydration even though
 * the sugary-drink lessons mention water too. Module titles are included, so
 * the "Tell me about <module>" chips always resolve. */
const TOPIC: Record<string, string> = {
  m1: 'healthy eating nutrition diet alimentacion saludable nutricion dieta why important',
  m2: 'processed ultra ultraprocessed additive chip snack procesado ultraprocesado aditivo',
  m3: 'plate portion serving balanced myplate plato porcion balanceado',
  m4: 'fruit vegetable veggie apple fruta verdura vegetal manzana',
  m5: 'sugar sugary soda juice label candy sweet azucar azucarada refresco jugo etiqueta dulce',
  m6: 'water hydration hydrate thirsty agua hidratacion hidratar sed',
  m7: 'active activity exercise move moving sport play walk actividad ejercicio mover moverse deporte jugar caminar fisica',
}
const MODULE_WORDS = new Map(
  modules.map((m) => [m.id, new Set(tokens(`${m.title.en} ${m.title.es} ${TOPIC[m.id] ?? ''}`))]),
)

/* "How much" and "how many" are stop words, so on their own "how much water
 * should my kids drink" scored the amounts lesson no higher than any other
 * water lesson. An amount question now prefers a lesson whose title asks one. */
const AMOUNT = /\b(how much|how many|cuanta|cuanto|cuantas|cuantos)\b/

function score(x: Indexed, q: string[], asksAmount: boolean): number {
  const topic = MODULE_WORDS.get(x.item.moduleId)
  const base = q.reduce(
    (s, w) => s + IDF(w) * ((x.title.has(w) ? 3 : 0) + (x.rest.has(w) ? 1 : 0)) + (topic?.has(w) ? 4 : 0),
    0,
  )
  const titleAsksAmount = AMOUNT.test(norm(`${x.item.title.en} ${x.item.title.es}`))
  return base > 0 && asksAmount && titleAsksAmount ? base + 8 : base
}

/** First block that reads well on its own in a chat bubble. */
function excerpt(item: Item, lang: Lang): string {
  const i = item.body.findIndex((x) => x.kind === 'ul' || x.kind === 'p' || x.kind === 'stat')
  const b = item.body[i]
  if (!b) return item.summary[lang]
  const bullets = (lines: string[]) => lines.slice(0, 5).map((l) => `• ${l}`).join('\n')
  if (b.kind === 'ul') return bullets(b.items[lang])
  if (b.kind === 'stat') return `${b.value} — ${b.label[lang]}`
  // A lead-in such as "We can have:" means nothing without the list after it.
  const text = blockText(b, lang)
  const next = item.body[i + 1]
  if (text.trim().endsWith(':') && next?.kind === 'ul') return `${text}\n${bullets(next.items[lang])}`
  return text
}

/* Checked on accent-stripped, lower-cased text, before anything else.
 * CRISIS wins over SAFETY: someone who mentions self-harm gets 988, not a
 * suggestion to ask their clinic. Both lists need clinical review before
 * launch — they are a floor, not a complete screen. */
const CRISIS =
  /\b(suicid|kill myself|killing myself|end my life|want to die|wanna die|hurt myself|hurting myself|self.?harm|cut myself|matarme|quitarme la vida|quiero morir|no quiero vivir|hacerme dano|lastimarme|autolesi|cortarme)/

const SAFETY =
  /\b(dose|dosis|medicine|medicina|medicamento|pill|pastilla|diagnos|emergenc|chest pain|dolor de pecho|allerg|alergi|insulin|insulina|pregnan|embaraz|overdose|sobredosis|can.?t breathe|cannot breathe|no puedo respirar|no puede respirar|chok|atragant|ahog|poison|venen|intoxic|seizure|convuls|unconscious|inconscien|faint|desmay|bleeding|sangra|sangrad|sangre)/

const GREETING = /^\s*(hi|hello|hey|hola|buenas|buenos dias|buenas tardes)\b/

const COPY = {
  intro: {
    en: ['Good question! Here is what the LA CASA lessons say:', 'Here is what we cover in the lessons:', 'Great thing to ask about.'],
    es: ['¡Buena pregunta! Esto dicen las lecciones de LA CASA:', 'Esto es lo que vemos en las lecciones:', 'Muy buena pregunta.'],
  },
  outro: {
    en: 'Open the lesson below for the full details.',
    es: 'Abra la lección de abajo para ver todos los detalles.',
  },
  hello: {
    en: 'Hi! I can help with healthy eating, sugary drinks, water, fruits and vegetables, and staying active. What would you like to know?',
    es: '¡Hola! Puedo ayudarle con alimentación saludable, bebidas azucaradas, agua, frutas y verduras, y actividad física. ¿Qué le gustaría saber?',
  },
  unknown: {
    en: 'I’m not sure about that one yet. I can help with healthy eating, sugary drinks, water, fruits and vegetables, and physical activity. You can also send your question to the LA CASA team on the Ask page.',
    es: 'Todavía no sé responder eso. Puedo ayudarle con alimentación saludable, bebidas azucaradas, agua, frutas y verduras, y actividad física. También puede enviar su pregunta al equipo de LA CASA en la página Preguntar.',
  },
  crisis: {
    en: 'I’m really sorry you’re going through this, and I’m glad you said something. You don’t have to face it alone: call or text 988 (Suicide & Crisis Lifeline) any time, day or night — press 2 for Spanish. If you or someone else is in danger right now, call 911.',
    es: 'Siento mucho que esté pasando por esto, y me alegra que lo haya dicho. No tiene que enfrentarlo sin ayuda: llame o envíe un mensaje de texto al 988 (Línea de Prevención del Suicidio y Crisis) a cualquier hora, de día o de noche — oprima 2 para español. Si usted u otra persona está en peligro ahora mismo, llame al 911.',
  },
  safety: {
    en: 'That sounds like a question for a doctor or nurse, and I can’t give personal medical advice. If it’s an emergency, call 911. For everything else, please ask your clinic or send your question to the LA CASA team.',
    es: 'Esa pregunta es para un médico o una enfermera, y no puedo dar consejos médicos personales. Si es una emergencia, llame al 911. Para lo demás, consulte con su clínica o envíe su pregunta al equipo de LA CASA.',
  },
}

export interface DemoReply {
  text: string
  sourceItemIds: string[]
}

export function demoReply(question: string, lang: Lang): DemoReply {
  const n = norm(question)
  if (CRISIS.test(n)) return { text: COPY.crisis[lang], sourceItemIds: [] }
  if (SAFETY.test(n)) return { text: COPY.safety[lang], sourceItemIds: [] }
  if (GREETING.test(n) && tokens(n).length <= 2) return { text: COPY.hello[lang], sourceItemIds: [] }

  const q = tokens(question)
  const asksAmount = AMOUNT.test(n)
  const ranked = INDEX.map((x) => ({ i: x.item, s: score(x, q, asksAmount) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)

  if (ranked.length === 0) return { text: COPY.unknown[lang], sourceItemIds: [] }

  const best = ranked[0].i
  const intros = COPY.intro[lang]
  const intro = intros[question.length % intros.length]
  return {
    text: `${intro}\n\n${excerpt(best, lang)}\n\n${COPY.outro[lang]}`,
    sourceItemIds: ranked.slice(0, 2).map((x) => x.i.id),
  }
}
