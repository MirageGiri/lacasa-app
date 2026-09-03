/** Placeholder illustrations for the storybook, drawn as SVG so they cost no
 *  bytes, scale on any screen, and work offline. Commission real art before
 *  this ships to families — these hold the layout, nothing more. */
export type ArtName = 'garden' | 'mango' | 'table' | 'water'

const frame = {
  viewBox: '0 0 342 250',
  role: 'img' as const,
  preserveAspectRatio: 'xMidYMid slice',
  className: 'block w-full',
}

function Garden() {
  return (
    <svg {...frame} aria-label="Un jardín con una arcada y plantas">
      <rect width="342" height="250" fill="#FDEBC8" />
      <circle cx="292" cy="46" r="30" fill="#F7C948" />
      <circle cx="292" cy="46" r="20" fill="#F0A202" />
      <ellipse cx="171" cy="238" rx="220" ry="52" fill="#6BBF83" />
      <ellipse cx="171" cy="252" rx="220" ry="48" fill="#2E9E5B" />
      <path d="M92 196V104a79 79 0 0 1 158 0v92" fill="none" stroke="#A5673F" strokeWidth="15" strokeLinecap="round" />
      <path d="M92 196V104a79 79 0 0 1 158 0v92" fill="none" stroke="#C08552" strokeWidth="6" strokeLinecap="round" />
      <g fill="#2E9E5B">
        <ellipse cx="96" cy="112" rx="25" ry="17" transform="rotate(-28 96 112)" />
        <ellipse cx="118" cy="76" rx="22" ry="14" transform="rotate(-14 118 76)" />
        <ellipse cx="171" cy="58" rx="27" ry="16" />
        <ellipse cx="224" cy="76" rx="22" ry="14" transform="rotate(14 224 76)" />
        <ellipse cx="246" cy="112" rx="25" ry="17" transform="rotate(28 246 112)" />
      </g>
      <g fill="#2E9E5B">
        <path d="M44 214c0-18 9-30 18-30s18 12 18 30z" />
        <path d="M264 214c0-16 8-27 16-27s16 11 16 27z" />
      </g>
      <circle cx="66" cy="196" r="7" fill="#E0218A" />
      <circle cx="280" cy="192" r="6" fill="#E0218A" />
    </svg>
  )
}

function Mango() {
  return (
    <svg {...frame} aria-label="Un mango sonriente">
      <rect width="342" height="250" fill="#FDEBC8" />
      <ellipse cx="171" cy="250" rx="220" ry="56" fill="#6BBF83" />
      <g>
        <ellipse cx="171" cy="140" rx="58" ry="66" fill="#F5A623" />
        <ellipse cx="153" cy="118" rx="22" ry="27" fill="#F7B94A" opacity="0.65" />
        <path d="M171 78c7-17 24-23 36-21-2 15-14 26-29 26z" fill="#2E9E5B" />
        <circle cx="153" cy="134" r="7.5" fill="#3A2418" />
        <circle cx="189" cy="134" r="7.5" fill="#3A2418" />
        <circle cx="156" cy="131" r="2.5" fill="#FFFFFF" />
        <circle cx="192" cy="131" r="2.5" fill="#FFFFFF" />
        <path d="M151 160a21 21 0 0 0 40 0" fill="none" stroke="#3A2418" strokeWidth="5.5" strokeLinecap="round" />
        <ellipse cx="133" cy="156" rx="10" ry="6" fill="#EE8E6B" opacity="0.55" />
        <ellipse cx="209" cy="156" rx="10" ry="6" fill="#EE8E6B" opacity="0.55" />
      </g>
    </svg>
  )
}

function Water() {
  return (
    <svg {...frame} aria-label="Un vaso de agua">
      <rect width="342" height="250" fill="#E4F3FC" />
      <ellipse cx="171" cy="250" rx="220" ry="56" fill="#BEE3F7" />
      <path d="M126 82h90l-11 118a14 14 0 0 1-14 12h-40a14 14 0 0 1-14-12z" fill="#FFFFFF" stroke="#8FC7E8" strokeWidth="5" />
      <path d="M133 124h76l-8 76a11 11 0 0 1-11 9h-38a11 11 0 0 1-11-9z" fill="#0284C7" opacity="0.75" />
      <ellipse cx="171" cy="82" rx="45" ry="9" fill="#FFFFFF" stroke="#8FC7E8" strokeWidth="5" />
      <g fill="#0284C7" opacity="0.5">
        <circle cx="72" cy="70" r="9" />
        <circle cx="264" cy="58" r="12" />
        <circle cx="288" cy="104" r="7" />
      </g>
    </svg>
  )
}

function Table() {
  return (
    <svg {...frame} aria-label="Una mesa con frutas y verduras">
      <rect width="342" height="250" fill="#FDEBC8" />
      <rect x="26" y="158" width="290" height="20" rx="8" fill="#C08552" />
      <rect x="54" y="178" width="16" height="52" rx="6" fill="#A5673F" />
      <rect x="272" y="178" width="16" height="52" rx="6" fill="#A5673F" />
      <ellipse cx="171" cy="150" rx="112" ry="26" fill="#FFFFFF" stroke="#EAE3EE" strokeWidth="4" />
      <path d="M59 150a112 26 0 0 1 112-26v26z" fill="#2E9E5B" />
      <path d="M171 124a112 26 0 0 1 79 8 112 26 0 0 1-79 18z" fill="#F0A202" />
      <path d="M171 150a112 26 0 0 0 79-18 112 26 0 0 1-79 18z" fill="#E0218A" />
      <circle cx="112" cy="138" r="11" fill="#6BBF83" />
      <circle cx="214" cy="140" r="10" fill="#F5A623" />
      <circle cx="171" cy="112" r="14" fill="#C2185B" />
      <path d="M171 98c3-7 10-9 15-8-1 6-6 10-12 10z" fill="#2E9E5B" />
    </svg>
  )
}

export default function StoryArt({ name }: { name: ArtName }) {
  switch (name) {
    case 'mango': return <Mango />
    case 'water': return <Water />
    case 'table': return <Table />
    default: return <Garden />
  }
}
