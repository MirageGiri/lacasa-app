import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { itemById, moduleById, modules } from '@/content'
import { useLang } from '@/i18n/LanguageContext'
import { assistantProvider } from '@/lib/chatProvider'
import type { ChatMessage } from '@/lib/chatProvider'
import { IconBlock } from '@/components/depth'
import { BLOCK } from '@/components/blocks'
import {
  ArrowRightIcon,
  ChatIcon,
  CheckIcon,
  CopyIcon,
  PlusIcon,
  SendIcon,
  ShieldIcon,
  SparklesIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from '@/components/icons'

/* The assistant screen. Written against `assistantProvider`, so today it runs
 * on the lesson-matching demo and later on the Azure OpenAI edge function with
 * no changes here. Conversation lives in memory only — nothing a family types
 * is saved on the device or sent anywhere in demo mode. */

const SUGGESTIONS = [
  { en: 'How much water should my kids drink?', es: '¿Cuánta agua deben tomar mis hijos?' },
  { en: 'What is a balanced plate?', es: '¿Qué es un plato balanceado?' },
  { en: 'How do I read sugar on a food label?', es: '¿Cómo leo el azúcar en una etiqueta?' },
  { en: 'Ideas to get my family moving', es: 'Ideas para que mi familia haga más actividad física' },
]

const ASSISTANT_BLOCK = BLOCK.brand

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function AssistantAvatar({ size = 36 }: { size?: number }) {
  return (
    <span aria-hidden className="block3d shrink-0" style={{ ...ASSISTANT_BLOCK, width: size, height: size, borderRadius: size * 0.32 }}>
      <SparklesIcon size={Math.round(size * 0.52)} />
    </span>
  )
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span key={i} className="lc-dot h-2 w-2 rounded-full bg-brand-400" style={{ animationDelay: `${i * 160}ms` }} />
      ))}
    </span>
  )
}

function AssistantMessage({ m, text, done }: { m: ChatMessage; text: string; done: boolean }) {
  const { t, b } = useLang()
  const [copied, setCopied] = useState(false)
  const [vote, setVote] = useState<'up' | 'down' | null>(null)
  const related = (m.sourceItemIds ?? []).map((id) => itemById[id]).filter(Boolean).slice(0, 1)

  async function copy() {
    try {
      await navigator.clipboard.writeText(m.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked — nothing to do */
    }
  }

  return (
    <li className="lc-rise flex items-start gap-3">
      <AssistantAvatar />
      <div className="min-w-0 max-w-[min(640px,85%)]">
        <p className="mb-1 text-xs font-bold text-ink-soft">{t('chatAiLabel')}</p>
        <div className="rounded-2xl rounded-tl-md border border-line bg-canvas px-4 py-3 text-[16px] leading-relaxed whitespace-pre-line">
          {text}
          {!done && <span aria-hidden className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-brand-500" />}
        </div>

        {done &&
          related.map((item) => {
            const mod = moduleById[item.moduleId]
            return (
              <Link
                key={item.id}
                to={`/module/${item.moduleId}/item/${item.id}`}
                className="group mt-2 flex items-center gap-3 rounded-2xl border border-line bg-surface p-2.5 pr-4 shadow-[var(--shadow-e1)] transition-shadow duration-(--duration-fast) hover:shadow-[var(--shadow-e2)]"
              >
                {mod && <IconBlock icon={mod.icon} accent={mod.accent} size={40} />}
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold uppercase tracking-wider text-ink-soft">{t('chatRelated')}</span>
                  <span className="block truncate font-bold">{b(item.title)}</span>
                </span>
                <ArrowRightIcon size={18} className="shrink-0 text-brand-700 transition-transform duration-(--duration-fast) group-hover:translate-x-0.5" />
              </Link>
            )
          })}

        {done && (
          <div className="mt-1 flex items-center gap-0.5 text-ink-soft">
            <button
              onClick={copy}
              aria-label={copied ? t('chatCopied') : t('chatCopy')}
              title={copied ? t('chatCopied') : t('chatCopy')}
              className="grid h-11 w-11 place-items-center rounded-full transition-colors duration-(--duration-fast) hover:bg-line hover:text-ink"
            >
              {copied ? <CheckIcon size={16} className="text-leaf-600" /> : <CopyIcon size={16} />}
            </button>
            <button
              onClick={() => setVote(vote === 'up' ? null : 'up')}
              aria-pressed={vote === 'up'}
              aria-label={t('chatHelpful')}
              title={t('chatHelpful')}
              className={`grid h-11 w-11 place-items-center rounded-full transition-colors duration-(--duration-fast) hover:bg-line ${vote === 'up' ? 'text-leaf-600' : 'hover:text-ink'}`}
            >
              <ThumbUpIcon size={16} />
            </button>
            <button
              onClick={() => setVote(vote === 'down' ? null : 'down')}
              aria-pressed={vote === 'down'}
              aria-label={t('chatNotHelpful')}
              title={t('chatNotHelpful')}
              className={`grid h-11 w-11 place-items-center rounded-full transition-colors duration-(--duration-fast) hover:bg-line ${vote === 'down' ? 'text-danger-600' : 'hover:text-ink'}`}
            >
              <ThumbDownIcon size={16} />
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

export default function Chat() {
  const { t, b, lang } = useLang()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)
  const [streaming, setStreaming] = useState<{ id: string; words: number } | null>(null)
  const logRef = useRef<HTMLOListElement | null>(null)
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  // Keep the newest message in view.
  useEffect(() => {
    const el = logRef.current?.parentElement
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reducedMotion() ? 'auto' : 'smooth' })
  }, [messages, thinking, streaming?.words])

  // Reveal the latest reply word by word, the way a streamed model answer
  // arrives. Reduced motion shows it whole.
  useEffect(() => {
    if (!streaming) return
    const msg = messages.find((m) => m.id === streaming.id)
    const total = msg ? msg.text.split(/(\s+)/).length : 0
    if (streaming.words >= total) {
      setStreaming(null)
      return
    }
    const timer = setTimeout(() => setStreaming((s) => (s ? { ...s, words: s.words + 2 } : s)), 28)
    return () => clearTimeout(timer)
  }, [streaming, messages])

  // Grow the composer with its content, up to five lines.
  useEffect(() => {
    const el = inputRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [draft])

  async function ask(text: string) {
    const q = text.trim()
    if (!q || thinking || streaming) return
    setDraft('')
    const [userMsg, ...rest] = await assistantProvider.send(q, lang)
    setMessages((m) => [...m, userMsg])
    setThinking(true)
    // A short beat before the reply, so it reads as an answer rather than an echo.
    await new Promise((r) => setTimeout(r, reducedMotion() ? 0 : 750))
    setThinking(false)
    setMessages((m) => [...m, ...rest])
    const reply = rest.find((r) => r.role === 'assistant')
    if (reply && !reducedMotion()) setStreaming({ id: reply.id, words: 0 })
    inputRef.current?.focus()
  }

  function submit(e: FormEvent) {
    e.preventDefault()
    void ask(draft)
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    // Enter sends; Shift+Enter makes a new line.
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      void ask(draft)
    }
  }

  const busy = thinking || streaming !== null
  const empty = messages.length === 0

  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto flex h-[calc(100dvh-8.5rem)] w-full max-w-7xl gap-6 px-3 pb-3 pt-3 sm:px-6 lg:h-dvh lg:px-10 lg:py-8"
    >
      {/* ---------- Conversation ---------- */}
      <section className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[24px] border border-line bg-surface shadow-[var(--shadow-e2)]">
        <header className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-5">
          <AssistantAvatar size={40} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-lg font-extrabold leading-tight">{t('chatTitle')}</h1>
              <span className="rounded-full bg-sun-100 px-2 py-0.5 text-xs font-bold text-sun-800">{t('chatDemo')}</span>
            </div>
            <p className="flex items-center gap-1.5 truncate text-sm text-ink-soft">
              <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-leaf-500" />
              {t('chatStatus')}
            </p>
          </div>
          {!empty && (
            <button
              onClick={() => {
                setMessages([])
                setStreaming(null)
                inputRef.current?.focus()
              }}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 border-line px-3.5 text-sm font-bold text-ink-soft transition-colors duration-(--duration-fast) hover:border-line-strong hover:text-ink"
            >
              <PlusIcon size={16} />
              <span className="hidden sm:inline">{t('chatNew')}</span>
            </button>
          )}
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          {empty ? (
            <div className="mx-auto flex max-w-xl flex-col items-center py-6 text-center lg:py-12">
              <span className="lc-rise">
                <AssistantAvatar size={72} />
              </span>
              <h2 className="mt-5 text-2xl font-extrabold tracking-tight lg:text-3xl">{t('chatHello')}</h2>
              <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">{t('chatHelloP')}</p>
              <p className="mt-7 text-xs font-bold uppercase tracking-wider text-ink-soft">{t('chatTry')}</p>
              <div className="mt-3 grid w-full gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={s.en}
                    onClick={() => void ask(s[lang])}
                    className="lc-rise flex min-h-13 items-center gap-2 rounded-2xl border border-line bg-surface px-4 py-3 text-left text-[15px] font-semibold shadow-[var(--shadow-e1)] transition-[border-color,box-shadow] duration-(--duration-fast) hover:border-brand-300 hover:shadow-[var(--shadow-e2)]"
                    style={{ animationDelay: `${120 + i * 60}ms` }}
                  >
                    <SparklesIcon size={16} className="shrink-0 text-brand-600" />
                    {s[lang]}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ol ref={logRef} role="log" aria-live="polite" aria-busy={busy} aria-label={t('chatTitle')} className="mx-auto flex max-w-3xl flex-col gap-5">
              {messages.map((m) => {
                if (m.role === 'user') {
                  return (
                    <li key={m.id} className="lc-rise flex justify-end">
                      <p className="max-w-[min(560px,85%)] rounded-2xl rounded-br-md bg-brand-600 px-4 py-3 text-[16px] leading-relaxed text-white shadow-[var(--shadow-e1)] whitespace-pre-line">
                        {m.text}
                      </p>
                    </li>
                  )
                }
                const isStreaming = streaming?.id === m.id
                const shown = isStreaming ? m.text.split(/(\s+)/).slice(0, streaming.words).join('') : m.text
                return <AssistantMessage key={m.id} m={m} text={shown} done={!isStreaming} />
              })}
              {thinking && (
                <li className="flex items-center gap-3">
                  <AssistantAvatar />
                  <span className="rounded-2xl rounded-tl-md border border-line bg-canvas px-4 py-3.5">
                    <TypingDots />
                    <span className="sr-only">{t('chatTyping')}</span>
                  </span>
                </li>
              )}
            </ol>
          )}
        </div>

        {/* ---------- Composer ---------- */}
        <form onSubmit={submit} className="border-t border-line bg-surface px-3 pb-3 pt-3 sm:px-5">
          <label htmlFor="chat-input" className="sr-only">
            {t('chatInputLabel')}
          </label>
          <div className="flex items-end gap-2 rounded-[22px] border-2 border-line-strong/60 bg-surface p-1.5 pl-4 transition-colors duration-(--duration-fast) focus-within:border-brand-600 focus-within:ring-4 focus-within:ring-brand-100">
            <textarea
              id="chat-input"
              ref={inputRef}
              rows={1}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t('chatPlaceholder')}
              className="composer-input max-h-40 min-h-11 flex-1 resize-none bg-transparent py-2.5 text-[16px] leading-snug placeholder:text-ink-soft"
            />
            <button
              type="submit"
              disabled={!draft.trim() || busy}
              aria-label={t('askSend')}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-600 text-white shadow-[var(--shadow-e1)] transition-[background-color,opacity] duration-(--duration-fast) hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <SendIcon size={18} />
            </button>
          </div>
          <p className="mt-2 px-1 text-center text-xs leading-snug text-ink-soft">{t('chatDisclaimer')}</p>
        </form>
      </section>

      {/* ---------- Side panel (wide screens) ---------- */}
      <aside className="hidden w-80 shrink-0 flex-col gap-4 overflow-y-auto xl:flex">
        <section className="card p-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-ink-soft">{t('chatTopics')}</h2>
          <ul className="mt-3 grid gap-1">
            {modules.map((m) => (
              <li key={m.id}>
                <button
                  onClick={() => void ask(`${t('chatAbout')} ${b(m.title).toLowerCase()}`)}
                  disabled={busy}
                  className="flex min-h-11 w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left text-[15px] font-semibold transition-colors duration-(--duration-fast) hover:bg-brand-50 disabled:opacity-50"
                >
                  <IconBlock icon={m.icon} accent={m.accent} size={30} />
                  <span className="min-w-0 flex-1 leading-snug">{b(m.title)}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="card p-5">
          <div className="flex items-center gap-2">
            <ShieldIcon size={20} className="text-leaf-600" />
            <h2 className="font-display text-base font-extrabold">{t('chatSafeTitle')}</h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t('chatDisclaimer')}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t('chatPrivacy')}</p>
        </section>

        <Link
          to="/ask"
          className="flex items-center gap-3 rounded-card bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white shadow-[var(--shadow-e2)] transition-[filter] duration-(--duration-fast) hover:brightness-110"
        >
          <ChatIcon size={24} className="shrink-0" />
          <span className="min-w-0 flex-1">
            <span className="block font-extrabold">{t('chatPerson')}</span>
            <span className="block text-sm text-white/85">{t('chatPersonP')}</span>
          </span>
          <ArrowRightIcon size={18} className="shrink-0" />
        </Link>
      </aside>
    </main>
  )
}
