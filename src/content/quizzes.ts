import type { QuizQuestion } from './types'

/** Knowledge check shown at the end of each module. Questions are written
 *  from the module's own content — nothing here tests outside material. */
export const quizzes: Record<string, QuizQuestion[]> = {
  m1: [
    {
      id: 'm1q1',
      prompt: {
        en: 'How many Hispanic children aged 2 to 19 have obesity or overweight?',
        es: '¿Cuántos niños hispanos de 2 a 19 años tienen obesidad o sobrepeso?',
      },
      choices: {
        en: ['1 in 20', '1 in 5', '1 in 100'],
        es: ['1 de cada 20', '1 de cada 5', '1 de cada 100'],
      },
      answer: 1,
      explanation: {
        en: 'One in five — which is why small changes at home matter so much.',
        es: 'Uno de cada cinco — por eso los cambios pequeños en casa importan tanto.',
      },
    },
    {
      id: 'm1q2',
      prompt: {
        en: 'Which of these is a benefit of healthy eating for children?',
        es: '¿Cuál de estos es un beneficio de la alimentación saludable en los niños?',
      },
      choices: {
        en: ['It promotes brain development', 'It makes children taller than their parents', 'It replaces the need for sleep'],
        es: ['Favorece el desarrollo del cerebro', 'Hace que los niños sean más altos que sus padres', 'Reemplaza la necesidad de dormir'],
      },
      answer: 0,
      explanation: {
        en: 'Good food supports brain development, growth, muscles, bones and the body’s defenses.',
        es: 'La buena alimentación apoya el desarrollo del cerebro, el crecimiento, los músculos, los huesos y las defensas.',
      },
    },
  ],
  m2: [
    {
      id: 'm2q1',
      prompt: {
        en: 'What is usually added to processed foods?',
        es: '¿Qué se les suele agregar a los alimentos procesados?',
      },
      choices: {
        en: ['Sugar, salt or fat', 'Extra fiber', 'Nothing at all'],
        es: ['Azúcar, sal o grasa', 'Más fibra', 'Nada'],
      },
      answer: 0,
      explanation: {
        en: 'Sugar, salt or fat are added to preserve them or improve their flavor.',
        es: 'Se les agrega azúcar, sal o grasa para conservarlos o mejorar su sabor.',
      },
    },
  ],
  m3: [
    {
      id: 'm3q1',
      prompt: {
        en: 'How much of your plate should be fruits and vegetables?',
        es: '¿Qué parte de su plato debe ser frutas y verduras?',
      },
      choices: {
        en: ['A quarter', 'Half', 'All of it'],
        es: ['Un cuarto', 'La mitad', 'Todo'],
      },
      answer: 1,
      explanation: {
        en: 'Half the plate, mostly vegetables, with a quarter grains and a quarter protein.',
        es: 'La mitad del plato, sobre todo verduras, con un cuarto de granos y un cuarto de proteína.',
      },
    },
  ],
  m4: [
    {
      id: 'm4q1',
      prompt: {
        en: 'How many servings of fruits and vegetables should you aim for each day?',
        es: '¿Cuántas porciones de frutas y verduras debe tratar de comer al día?',
      },
      choices: { en: ['1 to 2', '4 to 5', '10 to 12'], es: ['1 a 2', '4 a 5', '10 a 12'] },
      answer: 1,
      explanation: {
        en: 'Four to five servings a day, filling about half your plate.',
        es: 'De cuatro a cinco porciones al día, llenando cerca de la mitad del plato.',
      },
    },
    {
      id: 'm4q2',
      prompt: {
        en: 'Which is a good way to help a child try a new vegetable?',
        es: '¿Cuál es una buena forma de ayudar a un niño a probar una verdura nueva?',
      },
      choices: {
        en: [
          'Offer it alongside a food they already like',
          'Serve it only when they are already full',
          'Wait until they ask for it themselves',
        ],
        es: [
          'Ofrecerla junto con una comida que ya le gusta',
          'Servirla solo cuando ya está lleno',
          'Esperar a que la pida por su cuenta',
        ],
      },
      answer: 0,
      explanation: {
        en: 'Offering new foods next to familiar ones makes them much easier to accept.',
        es: 'Ofrecer alimentos nuevos junto a los conocidos hace que sea mucho más fácil aceptarlos.',
      },
    },
    {
      id: 'm4q3',
      prompt: {
        en: 'Roughly what share of adults eat the recommended amount of vegetables?',
        es: '¿Aproximadamente qué porcentaje de adultos come la cantidad recomendada de verduras?',
      },
      choices: { en: ['10%', '35%', '60%'], es: ['10%', '35%', '60%'] },
      answer: 0,
      explanation: {
        en: 'Only about 10% of adults — and 12.3% for fruit.',
        es: 'Solo cerca del 10% de los adultos — y 12.3% en el caso de la fruta.',
      },
    },
  ],
  m5: [
    {
      id: 'm5q1',
      prompt: {
        en: 'Four grams of sugar is equal to how many teaspoons?',
        es: 'Cuatro gramos de azúcar equivalen a ¿cuántas cucharaditas?',
      },
      choices: { en: ['One', 'Four', 'Ten'], es: ['Una', 'Cuatro', 'Diez'] },
      answer: 0,
      explanation: {
        en: '4 grams = 1 teaspoon. A drink with 48 grams holds 12 teaspoons of sugar.',
        es: '4 gramos = 1 cucharadita. Una bebida con 48 gramos tiene 12 cucharaditas de azúcar.',
      },
    },
    {
      id: 'm5q2',
      prompt: {
        en: 'A label says "sugar-free". What does that mean?',
        es: 'Una etiqueta dice “sin azúcar”. ¿Qué significa?',
      },
      choices: {
        en: [
          'Less than 0.5 grams of sugar per serving',
          '25% less sugar than the regular version',
          'The product contains no calories',
        ],
        es: [
          'Menos de 0.5 gramos de azúcar por porción',
          '25% menos azúcar que la versión regular',
          'El producto no tiene calorías',
        ],
      },
      answer: 0,
      explanation: {
        en: '"Low in sugar" is the one that means 25% less than the regular version.',
        es: '“Bajo en azúcar” es el que significa 25% menos que la versión regular.',
      },
    },
    {
      id: 'm5q3',
      prompt: {
        en: 'How much sugar does one soft drink a day add up to over a year?',
        es: '¿Cuánta azúcar suma un refresco diario a lo largo de un año?',
      },
      choices: { en: ['About 2 kg', 'About 25 kg', 'About 100 kg'], es: ['Unos 2 kg', 'Unos 25 kg', 'Unos 100 kg'] },
      answer: 1,
      explanation: {
        en: 'About 25 kilograms of sugar a year from a single daily soft drink.',
        es: 'Cerca de 25 kilogramos de azúcar al año por un solo refresco diario.',
      },
    },
  ],
  m6: [
    {
      id: 'm6q1',
      prompt: {
        en: 'About how much of the human body is water?',
        es: '¿Aproximadamente cuánto del cuerpo humano es agua?',
      },
      choices: { en: ['20%', '60%', '90%'], es: ['20%', '60%', '90%'] },
      answer: 1,
      explanation: {
        en: 'About 60% — which is why drinking enough matters every single day.',
        es: 'Cerca del 60% — por eso importa tomar suficiente todos los días.',
      },
    },
    {
      id: 'm6q2',
      prompt: { en: 'One cup of water is about how many ounces?', es: 'Un vaso de agua es aproximadamente ¿cuántas onzas?' },
      choices: { en: ['4 oz', '8 oz', '16 oz'], es: ['4 oz', '8 oz', '16 oz'] },
      answer: 1,
      explanation: {
        en: '1 cup = 8 oz, about half a standard water bottle.',
        es: '1 vaso = 8 oz, aproximadamente media botella de agua.',
      },
    },
    {
      id: 'm6q3',
      prompt: {
        en: 'How many cups of water a day does a 9-to-13-year-old boy need?',
        es: '¿Cuántos vasos de agua al día necesita un niño de 9 a 13 años?',
      },
      choices: { en: ['2 cups', '4½ cups', '6½ cups'], es: ['2 vasos', '4½ vasos', '6½ vasos'] },
      answer: 2,
      explanation: {
        en: '6½ cups. Girls the same age need 6 cups, and younger children need less.',
        es: '6½ vasos. Las niñas de la misma edad necesitan 6 vasos, y los más pequeños necesitan menos.',
      },
    },
  ],
  m7: [
    {
      id: 'm7q1',
      prompt: {
        en: 'Which of these counts as physical activity for a child?',
        es: '¿Cuál de estas cuenta como actividad física para un niño?',
      },
      choices: {
        en: ['Playing, dancing or riding a bike', 'Watching a sports game on TV', 'Sitting down to read'],
        es: ['Jugar, bailar o andar en bicicleta', 'Ver un partido en la televisión', 'Sentarse a leer'],
      },
      answer: 0,
      explanation: {
        en: 'Playing, dancing, running, biking and any favorite sport all count.',
        es: 'Jugar, bailar, correr, andar en bicicleta y cualquier deporte favorito cuentan.',
      },
    },
  ],
}
