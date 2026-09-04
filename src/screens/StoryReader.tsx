import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { storyById } from '@/content'
import { useLang } from '@/i18n/LanguageContext'
import StoryArt from '@/components/StoryArt'
import { ChevronLeftIcon, PauseIcon, PlayIcon } from '@/components/icons'
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
        <button onClick={() => navigate('/stories')} className="font-bold text-brand-600">
          ← {t('storiesTitle')}
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
    <div className="flex min-h-full justify-center bg-[#FFF6EC] sm:py-6">
      <div className="flex w-full max-w-md flex-col bg-[#FFF6EC] sm:min-h-0 sm:rounded-[32px] sm:shadow-[var(--shadow-lift)]">
      <header className="flex items-center gap-3 px-4 pb-3 pt-4">
        <button
          onClick={() => navigate('/stories')}
          aria-label={t('storiesTitle')}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#F0E0CC] bg-surface"
        >
          <ChevronLeftIcon size={22} />
        </button>
        <div className="min-w-0 flex-1 text-center">
          <p className="truncate text-base font-extrabold leading-tight">{b(story.title)}</p>
          <p className="text-xs font-bold text-[#8A6A4A]">
            {t('storyPage')} {index + 1} {t('ofLabel')} {story.pages.length}
          </p>
        </div>
        <div className="h-10 w-10 shrink-0" />
      </header>

      <div className="px-4">
        <div className="overflow-hidden rounded-3xl border border-[#F0E0CC] bg-[#FDEBC8]">
          <StoryArt name={page.art} />
        </div>
      </div>

      <p className="px-5 pt-5 text-[21px] font-semibold leading-[1.65] text-[#2A1F14]">
        {b(page.text)}
      </p>

      <div className="mt-auto flex flex-col gap-3.5 px-4 pb-6 pt-4">
        {canSpeak ? (
          <button
            onClick={toggleAudio}
            aria-pressed={playing}
            className="flex items-center gap-3.5 rounded-3xl border border-[#F0E0CC] bg-surface py-3 pl-3 pr-4 text-left"
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
              <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-[#F3E3D0]">
                <span
                  className={`block h-full rounded-full bg-sun-500 transition-all duration-700 ${
                    playing ? 'w-full' : 'w-0'
                  }`}
                />
              </span>
            </span>
          </button>
        ) : (
          <p className="rounded-3xl border border-[#F0E0CC] bg-surface px-4 py-3 text-sm text-[#8A6A4A]">
            {t('storyNoAudio')}
          </p>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="flex-1 rounded-full border-2 border-[#F0E0CC] bg-surface px-4 py-3.5 text-base font-extrabold text-[#8A6A4A] disabled:opacity-40"
          >
            ← {t('previous')}
          </button>

          <div className="flex shrink-0 items-center gap-1.5" aria-hidden>
            {story.pages.map((p, i) => (
              <span
                key={p.id}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-[22px] bg-brand-600' : 'w-2 bg-[#E7D3BB]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => (isLast ? navigate('/stories') : setIndex((i) => i + 1))}
            className="flex-1 rounded-full bg-brand-600 px-4 py-3.5 text-base font-extrabold text-white"
          >
            {isLast ? t('storyFinish') : `${t('next')} →`}
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}
