/** Stroke icons on a 24px grid, replacing the emoji the tab bar used.
 *  Emoji render at wildly different sizes and weights across Android
 *  versions; these stay legible and take the surrounding text color. */
type P = { size?: number; className?: string }
const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
})

export const BookIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4H9a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H3z" />
    <path d="M21 5.5A1.5 1.5 0 0 0 19.5 4H15a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H21z" />
  </svg>
)

export const TargetIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export const ChatIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M20 12a7 7 0 0 1-7 7H8.5L4.5 22v-4.4A7 7 0 0 1 4 12a7 7 0 0 1 7-7h2a7 7 0 0 1 7 7z" />
  </svg>
)

export const PersonIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </svg>
)

export const CheckIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className} strokeWidth={3}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const FlameIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className} strokeLinecap="butt">
    <path d="M12 3s5 4.2 5 9a5 5 0 0 1-10 0c0-1.6.7-3 1.5-4 .2 1.6 1 2.6 2 2.6 1.4 0 1.9-1.4 1.5-3.3-.3-1.6-.6-3-.5-4.3z" />
  </svg>
)

export const PlayIcon = ({ size = 24, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
)

export const PauseIcon = ({ size = 24, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <rect x="7" y="5" width="3.5" height="14" rx="1.2" />
    <rect x="13.5" y="5" width="3.5" height="14" rx="1.2" />
  </svg>
)

export const MailIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
)

export const ChevronLeftIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className} strokeWidth={2.5}>
    <path d="m15 5-7 7 7 7" />
  </svg>
)

/* ---------------------------------------------------------------------------
   Module + control icons, added in the UI UX Pro Max pass. They replace the
   emoji the modules, goals and quiz used (🥗 🏭 🍽️ 🍎 🧃 💧 ⚽ 🎯 🔥 🎉 💪)
   and the text glyphs used as controls (× ← → ✓ ▾ ▸). Same 24px grid and
   2px stroke as the tab icons, so the whole app speaks one icon language.
   Paths follow the Lucide set (ISC licence).
--------------------------------------------------------------------------- */

export const SaladIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M7 21h10" />
    <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" />
    <path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1" />
    <path d="m13 12 4-4" />
    <path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2" />
  </svg>
)

export const PackageIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
    <path d="M12 22V12" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="m7.5 4.27 9 5.15" />
  </svg>
)

export const UtensilsIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
)

export const AppleIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
    <path d="M10 2c1 .5 2 2 2 5" />
  </svg>
)

export const CupSodaIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8" />
    <path d="M5 8h14" />
    <path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />
    <path d="m12 8 1-6h2" />
  </svg>
)

export const DropletIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>
)

export const ActivityIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
)

export const AwardIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11" />
  </svg>
)

export const XIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className} strokeWidth={2.5}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)

export const PlusIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className} strokeWidth={2.5}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
)

export const ArrowLeftIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className} strokeWidth={2.5}>
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
)

export const ArrowRightIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className} strokeWidth={2.5}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)

export const ChevronDownIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className} strokeWidth={2.5}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

/** Module id → icon, so content files name an icon rather than draw one. */
export const MODULE_ICONS = {
  salad: SaladIcon,
  package: PackageIcon,
  utensils: UtensilsIcon,
  apple: AppleIcon,
  cupSoda: CupSodaIcon,
  droplet: DropletIcon,
  activity: ActivityIcon,
} as const

export type ModuleIconName = keyof typeof MODULE_ICONS

export function ModuleIcon({ name, size = 24, className }: P & { name: ModuleIconName }) {
  const Icon = MODULE_ICONS[name]
  return <Icon size={size} className={className} />
}

export const StoryIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 7v14" />
    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
  </svg>
)


export const SparklesIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
  </svg>
)

export const SendIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M14.54 21.69a.5.5 0 0 0 .94-.03l6.5-19a.5.5 0 0 0-.64-.63l-19 6.5a.5.5 0 0 0-.02.93l7.93 3.18a2 2 0 0 1 1.11 1.11z" />
    <path d="m21.85 2.15-10.94 10.94" />
  </svg>
)

export const ThumbUpIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
  </svg>
)

export const ThumbDownIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M17 14V2" />
    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
  </svg>
)

export const CopyIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="8" y="8" width="14" height="14" rx="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
)

export const ShieldIcon = ({ size = 24, className }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)
