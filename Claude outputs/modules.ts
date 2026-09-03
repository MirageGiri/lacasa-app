import type { Module } from './types'

export const modules: Module[] = [
  {
    id: 'm1',
    order: 1,
    emoji: '🥗',
    accent: 'leaf',
    title: { en: 'Introduction to Healthy Eating', es: 'Introducción a la alimentación saludable' },
    blurb: {
      en: 'Why what your family eats matters, for children and for adults.',
      es: 'Por qué importa lo que come su familia, en los niños y en los adultos.',
    },
  },
  {
    id: 'm2',
    order: 2,
    emoji: '🏭',
    accent: 'sun',
    title: { en: 'Ultra Processed Foods', es: 'Alimentos ultraprocesados' },
    blurb: {
      en: 'What processed foods are and what gets added to them.',
      es: 'Qué son los alimentos procesados y qué se les agrega.',
    },
  },
  {
    id: 'm3',
    order: 3,
    emoji: '🍽️',
    accent: 'berry',
    title: { en: 'Food Servings', es: 'Porciones de alimentos' },
    blurb: {
      en: 'How to build a balanced plate at every meal.',
      es: 'Cómo armar un plato balanceado en cada comida.',
    },
  },
  {
    id: 'm4',
    order: 4,
    emoji: '🍎',
    accent: 'leaf',
    title: { en: 'Fruits and Vegetables', es: 'Frutas y verduras' },
    blurb: {
      en: 'How much your family needs, and how to make them fun to eat.',
      es: 'Cuánto necesita su familia y cómo hacerlas divertidas.',
    },
  },
  {
    id: 'm5',
    order: 5,
    emoji: '🧃',
    accent: 'berry',
    title: { en: 'Sugar Smart', es: 'Azúcar inteligente' },
    blurb: {
      en: 'Reading labels, spotting hidden sugar, and cutting back on sugary drinks.',
      es: 'Leer etiquetas, encontrar el azúcar escondida y reducir las bebidas azucaradas.',
    },
  },
  {
    id: 'm6',
    order: 6,
    emoji: '💧',
    accent: 'aqua',
    title: { en: 'Importance of Hydration', es: 'La importancia de la hidratación' },
    blurb: {
      en: 'How much water your family needs and how to drink more of it.',
      es: 'Cuánta agua necesita su familia y cómo tomar más.',
    },
  },
  {
    id: 'm7',
    order: 7,
    emoji: '⚽',
    accent: 'sun',
    title: { en: 'Physical Activity', es: 'Actividad física' },
    blurb: {
      en: 'Moving every day, in ways the whole family enjoys.',
      es: 'Moverse todos los días, de formas que disfrute toda la familia.',
    },
  },
]

export const moduleById = Object.fromEntries(modules.map((m) => [m.id, m]))
