/* Read-aloud for the storybook.
 *
 * The Glide prototype had an Audio column that was never filled. Recorded
 * narration by a native speaker is the right answer and should replace this —
 * but recording 12 pages in two languages is a production job, and the
 * browser's own speech synthesis works today, offline, on iOS, Android and
 * desktop, in both languages. So the reader ships with narration from day one
 * and gains nothing but quality when real audio arrives: swap the
 * implementation behind `speak`/`stop`, the screen does not change.
 */
import type { Lang } from '@/i18n/strings'

export const speechSupported = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window

function pickVoice(lang: Lang): SpeechSynthesisVoice | undefined {
  const want = lang === 'es' ? 'es' : 'en'
  const voices = window.speechSynthesis.getVoices()
  return (
    voices.find((v) => v.lang.toLowerCase().startsWith(want) && v.localService) ??
    voices.find((v) => v.lang.toLowerCase().startsWith(want))
  )
}

export function speak(
  text: string,
  lang: Lang,
  handlers: { onEnd?: () => void; onError?: () => void } = {},
): void {
  if (!speechSupported()) return handlers.onError?.()
  const synth = window.speechSynthesis
  synth.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = lang === 'es' ? 'es-MX' : 'en-US'
  const voice = pickVoice(lang)
  if (voice) utter.voice = voice
  // Slower than default: this is being read to a child, often in the
  // language the adult beside them is still learning.
  utter.rate = 0.9
  utter.pitch = 1.05
  utter.onend = () => handlers.onEnd?.()
  utter.onerror = () => handlers.onError?.()
  synth.speak(utter)
}

export function stopSpeaking(): void {
  if (speechSupported()) window.speechSynthesis.cancel()
}
