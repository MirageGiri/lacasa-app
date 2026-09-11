import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { storyById } from '@/content'
import { useLang } from '@/i18n/LanguageContext'
import StoryArt from '@/components/StoryArt'
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, PauseIcon, PlayIcon } from '@/components/icons'
import { speak, speechSupported, stopSpeaking } from '@/lib/speech'

/** Reading mode. Deliberately breaks the app's design system: warm ground, no
 *  tab bar, larger type. This is the one screen for children rather than
 *  parents, and making it match the lesson screens would be the wrong kind of
 *  consistency. */
export default function StoryReader() {
  const { storyId = '' } = useParams()
  const navigate = useNavigate()
  const { t, b, lang } = useLang()

  const story = storyById[storyId]
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const canSpeak = speechSupported()

  // Stop narration when the page changes, the language changes, or we leave.
  useEffect(() => {
    stopSpeaking()
    setPlaying(false)
  }, [index, lang])

  useEffect(() => () => stopSpeaking(), [])

  if (!story) {
    return (
      <div className="p-6">
        <button onClick={() => navigate('/stories')} className="inline-flex min-h-11 items-center gap-1 font-bold text-brand-700">
          <ChevronLeftIcon size={18} />
          {t('storiesTitle')}
        </button>
      </div>
    )
  }

  const page = story.pages[index]
  const isLast = index === story.pages.length - 1

  function toggleAudio() {
    if (playing) {
      stopSpeaking()
      setPlaying(false)
      return
    }
    setPlaying(true)
    speak(b(page.text), lang, {
      onEnd: () => setPlaying(false),
      onError: () => setPlaying(false),
    })
  }

  return (
    <div className="flex min-h-full justify-center bg-paper sm:py-6">
      <div className="flex w-full max-w-md flex-col bg-paper sm:min-h-0 sm:rounded-[32px] sm:shadow-[var(--shadow-lift)]">
      <header className="flex items-center gap-3 px-4 pb-3 pt-4">
        <button
          onClick={() => navigate('/stories')}
          aria-label={t('storiesTitle')}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-paper-line bg-surface transition-colors duration-(--duration-fast) hover:bg-paper-track"
        >
          <ChevronLeftIcon size={22} />
        </button>
        <div className="min-w-0 flex-1 text-center">
          <p className="truncate text-base font-extrabold leading-tight">{b(story.title)}</p>
          <p className="text-xs font-bold text-paper-soft">
            {t('storyPage')} {index + 1} {t('ofLabel')} {story.pages.length}
          </p>
        </div>
        <div className="h-11 w-11 shrink-0" />
      </header>

      <div className="px-4">
        <div className="overflow-hidden rounded-3xl border border-paper-line bg-paper-art">
          <StoryArt name={page.art} />
        </div>
      </div>

      <p className="px-5 pt-5 text-[21px] font-semibold leading-[1.65] text-paper-ink">
        {b(page.text)}
      </p>

      <div className="mt-auto flex flex-col gap-3.5 px-4 pb-6 pt-4">
        {canSpeak ? (
          <button
            onClick={toggleAudio}
            aria-pressed={playing}
            className="flex items-center gap-3.5 rounded-3xl border border-paper-line bg-surface py-3 pl-3 pr-4 text-left"
          >
            <span
              className={`grid h-14 w-14 shrink-0 place-items-center rounded-full text-white transition ${
                playing ? 'bg-sun-500' : 'bg-brand-600'
              }`}
            >
              {playing ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-extrabold">
                {playing ? t('storyStop') : t('storyReadAloud')}
              </span>
              <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-paper-track">
                <span
                  className={`block h-full rounded-full bg-sun-500 transition-all duration-700 ${
                    playing ? 'w-full' : 'w-0'
                  }`}
                />
              </span>
            </span>
          </button>
        ) : (
          <p className="rounded-3xl border border-paper-line bg-surface px-4 py-3 text-sm text-paper-soft">
            {t('storyNoAudio')}
          </p>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="flex min-h-13 flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-paper-line bg-surface px-4 py-3.5 text-base font-extrabold text-paper-soft disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeftIcon size={18} />
            {t('previous')}
          </button>

          <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
            {story.pages.map((p, i) => (
              <span
                key={p.id}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-[22px] bg-brand-600' : 'w-2 bg-paper-dot'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => (isLast ? navigate('/stories') : setIndex((i) => i + 1))}
            className="flex min-h-13 flex-1 items-center justify-center gap-1.5 rounded-full bg-brand-600 px-4 py-3.5 text-base font-extrabold text-white transition-colors duration-(--duration-fast) hover:bg-brand-700"
          >
            {isLast ? t('storyFinish') : t('next')}
            {!isLast && <ArrowRightIcon size={18} />}
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}
