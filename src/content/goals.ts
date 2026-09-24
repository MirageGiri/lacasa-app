import type { GoalOption } from './types'

/** The Glide prototype scattered "Setting Goals" through the content as if it
 *  were a reading card. Here goals are a real feature: pick them, track them. */
export const goalOptions: GoalOption[] = [
  { id: 'g1', moduleId: 'm4', text: { en: 'Eat at least two fruits a day', es: 'Comer al menos dos frutas al día' } },
  { id: 'g2', moduleId: 'm4', text: { en: 'Try a new fruit or vegetable every week', es: 'Probar una fruta o verdura nueva cada semana' } },
  { id: 'g3', moduleId: 'm4', text: { en: 'Eat a vegetable with every meal', es: 'Comer una verdura en cada comida' } },
  { id: 'g4', moduleId: 'm4', text: { en: 'Replace a processed snack with a fruit three times a week', es: 'Cambiar un snack procesado por una fruta tres veces por semana' } },
  { id: 'g5', moduleId: 'm5', text: { en: 'Drink one less sugary drink each day', es: 'Tomar una bebida azucarada menos cada día' } },
  { id: 'g6', moduleId: 'm5', text: { en: 'Read the sugar on the label before buying a drink', es: 'Leer el azúcar en la etiqueta antes de comprar una bebida' } },
  { id: 'g7', moduleId: 'm5', text: { en: 'Swap juice for water at one meal a day', es: 'Cambiar el jugo por agua en una comida al día' } },
  { id: 'g8', moduleId: 'm6', text: { en: 'Start and end the day with a cup of water', es: 'Empezar y terminar el día con un vaso de agua' } },
  { id: 'g9', moduleId: 'm6', text: { en: 'Keep a jug of cold water in the refrigerator', es: 'Tener una jarra de agua fría en el refrigerador' } },
  { id: 'g13', moduleId: 'm6', text: { en: 'Drink 8 cups of water a day', es: 'Tomar 8 vasos de agua al día' } },
  { id: 'g14', moduleId: 'm6', text: { en: 'Carry a bottle of water with me', es: 'Llevar una botella de agua conmigo' } },
  { id: 'g15', moduleId: 'm6', text: { en: 'Drink water with every meal', es: 'Tomar agua en cada comida' } },
  { id: 'g10', moduleId: 'm7', text: { en: 'Move together as a family for 30 minutes', es: 'Movernos en familia durante 30 minutos' } },
  { id: 'g11', moduleId: 'm3', text: { en: 'Fill half the plate with vegetables at dinner', es: 'Llenar la mitad del plato con verduras en la cena' } },
  { id: 'g12', moduleId: 'm1', text: { en: 'Eat one meal a day together, at the table', es: 'Comer una comida al día juntos, en la mesa' } },
]
