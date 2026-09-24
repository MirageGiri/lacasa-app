import type { CSSProperties } from 'react'
import type { Accent } from '@/components/ui'

/** Colors for a clay block, per module accent. The face runs light-to-dark
 *  so it reads as lit from above; the edge is the extrusion underneath. */
export const BLOCK: Record<Accent, CSSProperties> = {
  brand: { '--b-hi': '#F472AE', '--b-face': '#D81B72', '--b-lo': '#C2185B', '--b-edge': '#831843' } as CSSProperties,
  leaf:  { '--b-hi': '#4CC47E', '--b-face': '#2E9E5B', '--b-lo': '#1F7A44', '--b-edge': '#10603A' } as CSSProperties,
  sun:   { '--b-hi': '#FFC23D', '--b-face': '#F0A202', '--b-lo': '#C77F00', '--b-edge': '#8A5A00' } as CSSProperties,
  berry: { '--b-hi': '#EB5C9E', '--b-face': '#D6337F', '--b-lo': '#B02566', '--b-edge': '#7E1A49' } as CSSProperties,
  aqua:  { '--b-hi': '#3CC3DB', '--b-face': '#0E9BB5', '--b-lo': '#0B7D93', '--b-edge': '#075A6B' } as CSSProperties,
  coral: { '--b-hi': '#FF8A5C', '--b-face': '#F26B3A', '--b-lo': '#C2410C', '--b-edge': '#7C2D12' } as CSSProperties,
  plum:  { '--b-hi': '#A78BFA', '--b-face': '#8B5CF6', '--b-lo': '#7C3AED', '--b-edge': '#5B21B6' } as CSSProperties,
}
