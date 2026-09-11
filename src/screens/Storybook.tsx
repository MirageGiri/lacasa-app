import { Link } from 'react-router-dom'
import { stories } from '@/content'
import { useLang } from '@/i18n/LanguageContext'
import { Badge, Screen } from '@/components/ui'
import StoryArt from '@/components/StoryArt'

export default function Storybook() {
  const { t, b } = useLang()

  return (
    <Screen title={t('storiesTitle')}>
      <p className="mb-5 text-[17px] leading-relaxed text-ink-soft">{t('storiesBlurb')}</p>

      <div className="grid gap-3">
        {stories.map((story) => (
          <Link
            key={story.id}
            to={`/story/${story.id}`}
            className="card block overflow-hidden"
          >
            <div className="bg-paper-art">
              <StoryArt name={story.cover} />
            </div>
            <div className="flex flex-col gap-1.5 px-4 py-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-extrabold leading-snug">{b(story.title)}</h2>
                {story.needsSourceCopy && <Badge tone="todo">{t('needsCopy')}</Badge>}
              </div>
              <p className="text-sm text-ink-soft">{b(story.blurb)}</p>
              <p className="text-xs font-bold text-ink-soft">
                {story.pages.length} {t('storyPage').toLowerCase()}s
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Screen>
  )
}
