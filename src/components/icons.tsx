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
