import type { Bilingual } from './types'

export interface StoryPage {
  id: string
  text: Bilingual
  /** Named illustration drawn as inline SVG in StoryArt.tsx. */
  art: 'garden' | 'mango' | 'table' | 'water'
}

export interface Story {
  id: string
  title: Bilingual
  blurb: Bilingual
  cover: 'garden'
  pages: StoryPage[]
  /** Placeholder text pending the LA CASA team's own story. */
  needsSourceCopy?: boolean
}

/* The Glide prototype had one storybook row ("The Secret Garden") with no
 * pages and an empty Audio column. This is a short placeholder story in that
 * spirit so the reader can be built and shown; the LA CASA team should
 * replace the text, and real illustrations should be commissioned. */
export const stories: Story[] = [
  {
    id: 's1',
    cover: 'garden',
    needsSourceCopy: true,
    title: { en: 'The Secret Garden', es: 'El Jardín Secreto' },
    blurb: {
      en: 'Mateo finds a garden where the fruit talks back.',
      es: 'Mateo encuentra un jardín donde la fruta le contesta.',
    },
    pages: [
      {
        id: 's1p1',
        art: 'garden',
        text: {
          en: 'Behind the green door, Mateo found a garden full of colors. He had walked past that door a hundred times and never once opened it.',
          es: 'Detrás de la puerta verde, Mateo encontró un jardín lleno de colores. Había pasado por esa puerta cien veces y nunca la había abierto.',
        },
      },
      {
        id: 's1p2',
        art: 'mango',
        text: {
          en: 'A very big mango greeted him and said: "Do you want to try something sweet?" Mateo laughed — he had never met a talking mango before.',
          es: 'Un mango muy grande lo saludó y le dijo: «¿Quieres probar algo dulce?» Mateo se rió — nunca había conocido a un mango que hablara.',
        },
      },
      {
        id: 's1p3',
        art: 'water',
        text: {
          en: '"First, water," said the mango. "The garden drinks every morning, and so should you." Mateo filled his cup and drank it all.',
          es: '«Primero, agua», dijo el mango. «El jardín toma agua cada mañana, y tú también deberías». Mateo llenó su vaso y se lo tomó todo.',
        },
      },
      {
        id: 's1p4',
        art: 'table',
        text: {
          en: 'That night Mateo told his family about the garden. They filled half the table with fruits and vegetables, and everybody tried something new.',
          es: 'Esa noche Mateo le contó a su familia sobre el jardín. Llenaron la mitad de la mesa con frutas y verduras, y todos probaron algo nuevo.',
        },
      },
    ],
  },
]

export const storyById = Object.fromEntries(stories.map((s) => [s.id, s]))
