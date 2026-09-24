import type { Item } from './types'

/* ---------------------------------------------------------------------------
   Curriculum ported from the LA CASA Glide prototype (34 rows).
   Three sets of duplicate rows were merged into single cards — the prototype
   had two "Sugary Drinks", two "How to Understand Food Labels" and four
   "How Much Water Do We Need?" cards with identical titles, which read as a
   bug to a user. 34 source rows -> 29 items.

   `needsSourceCopy: true` marks a card whose Glide text was truncated or was
   still placeholder text. Those are the only cards the LA CASA team must
   supply words for; everything else is their copy, verbatim.

   Every `es` string is a Claude draft awaiting clinical review.
--------------------------------------------------------------------------- */

export const items: Item[] = [
  // ── Module 1 · Introduction to Healthy Eating ────────────────────────────
  {
    id: 'i1',
    moduleId: 'm1',
    title: {
      en: 'Why is healthy eating important for children?',
      es: '¿Por qué es importante la alimentación saludable en los niños?',
    },
    summary: {
      en: 'Good food builds a child’s body, brain and defenses.',
      es: 'La buena alimentación construye el cuerpo, el cerebro y las defensas del niño.',
    },
    body: [
      {
        kind: 'ul',
        items: {
          en: [
            'Helps maintain healthy skin, teeth and eyes',
            'Strengthens muscles',
            'Makes the bones stronger',
            'Promotes brain development',
            'Supports healthy growth',
            'Boosts the body’s defenses',
          ],
          es: [
            'Ayuda a mantener sana la piel, los dientes y los ojos',
            'Fortalece los músculos',
            'Hace más fuertes los huesos',
            'Favorece el desarrollo del cerebro',
            'Apoya un crecimiento saludable',
            'Aumenta las defensas del cuerpo',
          ],
        },
      },
    ],
  },
  {
    id: 'i2',
    moduleId: 'm1',
    title: {
      en: 'Benefits of healthy eating in adults',
      es: 'Beneficios de la alimentación saludable en los adultos',
    },
    summary: {
      en: 'Lower disease risk, a healthy weight and better digestion.',
      es: 'Menos riesgo de enfermedades, peso saludable y mejor digestión.',
    },
    body: [
      {
        kind: 'p',
        text: {
          en: 'Reduces the risk of diseases such as diabetes, heart disease and certain types of cancer.',
          es: 'Reduce el riesgo de enfermedades como la diabetes, las enfermedades del corazón y ciertos tipos de cáncer.',
        },
      },
      {
        kind: 'ul',
        items: {
          en: ['Helps maintain a healthy weight', 'Improves digestion'],
          es: ['Ayuda a mantener un peso saludable', 'Mejora la digestión'],
        },
      },
    ],
  },
  {
    id: 'i3',
    moduleId: 'm1',
    title: {
      en: 'Childhood obesity in the Hispanic community',
      es: 'La obesidad infantil en la comunidad hispana',
    },
    summary: {
      en: 'One in five Hispanic children aged 2 to 19 has obesity or overweight.',
      es: 'Uno de cada cinco niños hispanos de 2 a 19 años tiene obesidad o sobrepeso.',
    },
    body: [
      {
        kind: 'stat',
        value: '1 in 5',
        label: {
          en: 'Hispanic children aged 2 to 19 have obesity or overweight',
          es: 'niños hispanos de 2 a 19 años tienen obesidad o sobrepeso',
        },
      },
    ],
  },

  // ── Module 2 · Ultra Processed Foods ─────────────────────────────────────
  {
    id: 'i4',
    moduleId: 'm2',
    title: { en: 'Processed foods', es: 'Alimentos procesados' },
    summary: {
      en: 'Foods changed to last longer or taste different.',
      es: 'Alimentos modificados para durar más o cambiar su sabor.',
    },
    body: [
      {
        kind: 'p',
        text: {
          en: 'They are foods that have been modified to last longer or to change their flavor.',
          es: 'Son alimentos que han sido modificados para durar más tiempo o para cambiar su sabor.',
        },
      },
      {
        kind: 'callout',
        tone: 'warn',
        text: {
          en: 'Sugar, salt or fat are added to preserve them or improve their flavor.',
          es: 'Se les agrega azúcar, sal o grasa para conservarlos o mejorar su sabor.',
        },
      },
    ],
  },

  // ── Module 3 · Food Servings ─────────────────────────────────────────────
  {
    id: 'i5',
    moduleId: 'm3',
    title: { en: 'The balanced plate', es: 'El plato balanceado' },
    summary: {
      en: 'Half fruits and vegetables, a quarter grains, a quarter protein.',
      es: 'La mitad frutas y verduras, un cuarto granos, un cuarto proteína.',
    },
    needsSourceCopy: true,
    body: [
      {
        kind: 'ul',
        items: {
          en: [
            'Half your plate: fruits and vegetables, mostly vegetables',
            'One quarter: whole grains such as brown rice, oats or whole-wheat bread',
            'One quarter: healthy protein such as beans, fish, chicken, eggs or nuts',
            'A small amount of healthy fats such as olive oil or avocado',
            'To drink: water or unsweetened beverages',
          ],
          es: [
            'La mitad del plato: frutas y verduras, sobre todo verduras',
            'Un cuarto: granos integrales como arroz integral, avena o pan integral',
            'Un cuarto: proteína saludable como frijoles, pescado, pollo, huevos o nueces',
            'Una porción pequeña de grasas saludables como aceite de oliva o aguacate',
            'Para tomar: agua o bebidas sin azúcar',
          ],
        },
      },
    ],
  },

  // ── Module 4 · Fruits and Vegetables ─────────────────────────────────────
  {
    id: 'i6',
    moduleId: 'm4',
    title: { en: 'Setting goals', es: 'Poner metas' },
    summary: {
      en: 'Small, specific changes your family can keep.',
      es: 'Cambios pequeños y concretos que su familia puede mantener.',
    },
    body: [
      {
        kind: 'ul',
        items: {
          en: [
            'Eat at least two fruits a day',
            'Try a new fruit or vegetable every week',
            'Eat a vegetable with every meal',
            'Replace a processed snack with a fruit three times a week',
          ],
          es: [
            'Comer al menos dos frutas al día',
            'Probar una fruta o verdura nueva cada semana',
            'Comer una verdura en cada comida',
            'Cambiar un snack procesado por una fruta tres veces por semana',
          ],
        },
      },
    ],
  },
  {
    id: 'i7',
    moduleId: 'm4',
    title: { en: 'How much we actually eat', es: 'Cuánto comemos en realidad' },
    summary: {
      en: 'Most adults and children fall short of the recommended amount.',
      es: 'La mayoría de adultos y niños no alcanzan la cantidad recomendada.',
    },
    body: [
      {
        kind: 'stat',
        value: '12.3%',
        label: {
          en: 'of adults eat the recommended amount of fruit',
          es: 'de los adultos come la cantidad recomendada de fruta',
        },
      },
      {
        kind: 'stat',
        value: '10.0%',
        label: {
          en: 'of adults eat the recommended amount of vegetables',
          es: 'de los adultos come la cantidad recomendada de verduras',
        },
      },
      {
        kind: 'p',
        text: {
          en: 'Among children ages 7 to 12, one in two does not eat vegetables daily, and one in two does not eat fruit daily.',
          es: 'Entre los niños de 7 a 12 años, uno de cada dos no come verduras todos los días y uno de cada dos no come frutas todos los días.',
        },
      },
    ],
  },
  {
    id: 'i8',
    moduleId: 'm4',
    title: {
      en: 'Why are fruits and vegetables good for adults?',
      es: '¿Por qué las frutas y verduras son buenas para los adultos?',
    },
    summary: {
      en: 'They lower disease risk and protect the body.',
      es: 'Reducen el riesgo de enfermedades y protegen el cuerpo.',
    },
    body: [
      {
        kind: 'p',
        text: { en: 'They reduce the risk of:', es: 'Reducen el riesgo de:' },
      },
      {
        kind: 'ul',
        items: {
          en: ['Diabetes', 'Strokes', 'Cardiovascular problems', 'High cholesterol'],
          es: ['Diabetes', 'Derrames cerebrales', 'Problemas cardiovasculares', 'Colesterol alto'],
        },
      },
      {
        kind: 'p',
        text: { en: 'They also protect against:', es: 'También protegen contra:' },
      },
      {
        kind: 'ul',
        items: {
          en: ['Certain types of cancer', 'Bone loss'],
          es: ['Ciertos tipos de cáncer', 'La pérdida de masa ósea'],
        },
      },
      {
        kind: 'p',
        text: {
          en: 'They are important for good intestinal function.',
          es: 'Son importantes para el buen funcionamiento del intestino.',
        },
      },
    ],
  },
  {
    id: 'i9',
    moduleId: 'm4',
    title: {
      en: 'Why are fruits and vegetables good for children?',
      es: '¿Por qué las frutas y verduras son buenas para los niños?',
    },
    summary: {
      en: 'Better mood, energy, growth and defenses.',
      es: 'Mejor ánimo, energía, crecimiento y defensas.',
    },
    body: [
      { kind: 'p', text: { en: 'They improve:', es: 'Mejoran:' } },
      {
        kind: 'ul',
        items: {
          en: [
            'Mood and concentration',
            'Energy and academic performance',
            'Growth',
            'The strength of the immune system',
          ],
          es: [
            'El ánimo y la concentración',
            'La energía y el rendimiento escolar',
            'El crecimiento',
            'La fuerza del sistema inmunológico',
          ],
        },
      },
      {
        kind: 'callout',
        tone: 'good',
        text: {
          en: 'Fruits and vegetables are rich in fiber, potassium, vitamin A and vitamin C.',
          es: 'Las frutas y verduras son ricas en fibra, potasio, vitamina A y vitamina C.',
        },
      },
    ],
  },
  {
    id: 'i10',
    moduleId: 'm4',
    title: { en: 'What you should eat every day', es: 'Lo que debe comer cada día' },
    summary: {
      en: 'Aim for four to five servings a day.',
      es: 'La meta son de cuatro a cinco porciones al día.',
    },
    body: [
      {
        kind: 'p',
        text: {
          en: 'About half of our plate should be filled with fruits and vegetables.',
          es: 'Aproximadamente la mitad de nuestro plato debe llenarse con frutas y verduras.',
        },
      },
      {
        kind: 'stat',
        value: '4–5',
        label: {
          en: 'servings of fruits and vegetables per day',
          es: 'porciones de frutas y verduras al día',
        },
      },
    ],
  },
  {
    id: 'i11',
    moduleId: 'm4',
    title: {
      en: 'Recommended daily servings for children',
      es: 'Porciones diarias recomendadas para niños',
    },
    summary: {
      en: 'Daily amounts for children aged 7 to 12.',
      es: 'Cantidades diarias para niños de 7 a 12 años.',
    },
    body: [
      {
        kind: 'p',
        text: {
          en: 'Recommended daily intake for children aged 7 to 12.',
          es: 'Consumo diario recomendado para niños de 7 a 12 años.',
        },
      },
      {
        kind: 'ul',
        items: {
          en: [
            'Vegetables — girls: 1½ to 3 cups a day',
            'Vegetables — boys: 2 to 3½ cups a day',
            'Fruit — girls: 1½ to 2 cups a day',
            'Fruit — boys: 1½ to 2 cups a day',
          ],
          es: [
            'Verduras — niñas: de 1½ a 3 tazas al día',
            'Verduras — niños: de 2 a 3½ tazas al día',
            'Frutas — niñas: de 1½ a 2 tazas al día',
            'Frutas — niños: de 1½ a 2 tazas al día',
          ],
        },
      },
    ],
  },
  {
    id: 'i12',
    moduleId: 'm4',
    title: {
      en: 'How to make fruits and vegetables fun to eat',
      es: 'Cómo hacer que las frutas y verduras sean divertidas',
    },
    summary: {
      en: 'Practical tricks that work at home.',
      es: 'Trucos prácticos que funcionan en casa.',
    },
    body: [
      {
        kind: 'ul',
        items: {
          en: [
            'Use snack time to eat more fruits and vegetables',
            'Keep fruits and vegetables available and within reach',
            'Offer new foods alongside familiar ones',
            'Add vegetables to favorite meals',
            'Encourage family meals',
          ],
          es: [
            'Aproveche la hora del snack para comer más frutas y verduras',
            'Tenga frutas y verduras disponibles y al alcance',
            'Ofrezca alimentos nuevos junto con los que ya les gustan',
            'Agregue verduras a sus comidas favoritas',
            'Fomente las comidas en familia',
          ],
        },
      },
    ],
  },

  // ── Module 5 · Sugar Smart ───────────────────────────────────────────────
  {
    id: 'i13',
    moduleId: 'm5',
    title: { en: 'Sugary drinks', es: 'Bebidas azucaradas' },
    summary: {
      en: 'Little nutrition, a lot of sugar — and children drink too many.',
      es: 'Poco alimento, mucha azúcar — y los niños toman demasiadas.',
    },
    body: [
      {
        kind: 'ul',
        items: {
          en: [
            'Children drink too many sugary drinks',
            'They have little or no nutritional value',
            'They contain one or more types of sugar',
          ],
          es: [
            'Los niños toman demasiadas bebidas azucaradas',
            'Tienen poco o ningún valor nutricional',
            'Contienen uno o más tipos de azúcar',
          ],
        },
      },
      {
        kind: 'callout',
        tone: 'warn',
        text: {
          en: 'Two or more sugary drinks a day increase the risk of prediabetes.',
          es: 'Dos o más bebidas azucaradas al día aumentan el riesgo de prediabetes.',
        },
      },
      {
        kind: 'stat',
        value: '25 kg',
        label: {
          en: 'of sugar a year — one soft drink a day',
          es: 'de azúcar al año — un refresco diario',
        },
      },
    ],
  },
  {
    id: 'i14',
    moduleId: 'm5',
    title: { en: 'Sugary drinks and their effects', es: 'Las bebidas azucaradas y sus efectos' },
    summary: {
      en: 'What too much sugar does to the body over time.',
      es: 'Lo que el exceso de azúcar le hace al cuerpo con el tiempo.',
    },
    body: [
      {
        kind: 'ul',
        items: {
          en: [
            'Type 2 diabetes',
            'Unhealthy weight gain, leading to obesity',
            'Dental cavities',
            'High blood pressure',
            'Heart problems',
          ],
          es: [
            'Diabetes tipo 2',
            'Aumento de peso poco saludable, que lleva a la obesidad',
            'Caries dentales',
            'Presión arterial alta',
            'Problemas del corazón',
          ],
        },
      },
    ],
  },
  {
    id: 'i15',
    moduleId: 'm5',
    title: { en: 'Types of sugar', es: 'Tipos de azúcar' },
    summary: {
      en: 'Sugar goes by many names on a label.',
      es: 'El azúcar aparece con muchos nombres en la etiqueta.',
    },
    body: [
      {
        kind: 'ul',
        items: {
          en: ['Honey', 'Maple syrup and other syrups', 'Molasses', 'Sucrose', 'Brown sugar', 'Sugar cane'],
          es: ['Miel', 'Jarabe de maple y otros jarabes', 'Melaza', 'Sacarosa', 'Azúcar morena', 'Caña de azúcar'],
        },
      },
    ],
  },
  {
    id: 'i16',
    moduleId: 'm5',
    title: { en: 'Other types of sugar', es: 'Otros tipos de azúcar' },
    summary: {
      en: 'More names to watch for in the ingredient list.',
      es: 'Más nombres que hay que buscar en la lista de ingredientes.',
    },
    needsSourceCopy: true,
    body: [
      {
        kind: 'ul',
        items: {
          en: ['Sugar cane juice'],
          es: ['Jugo de caña de azúcar'],
        },
      },
    ],
  },
  {
    id: 'i17',
    moduleId: 'm5',
    title: { en: 'How to read labels about sugar', es: 'Cómo leer las etiquetas sobre el azúcar' },
    summary: {
      en: 'What "sugar-free" and "low in sugar" actually mean.',
      es: 'Qué significan en realidad “sin azúcar” y “bajo en azúcar”.',
    },
    body: [
      {
        kind: 'ul',
        items: {
          en: [
            'Sugar-free — contains less than 0.5 grams of sugar per serving',
            'Low in sugar — contains 25% less sugar than the regular version of the product',
            'No sugar added — no sugar or other ingredients containing sugar were added',
          ],
          es: [
            'Sin azúcar — contiene menos de 0.5 gramos de azúcar por porción',
            'Bajo en azúcar — contiene 25% menos azúcar que la versión regular del producto',
            'Sin azúcar añadida — no se agregó azúcar ni otros ingredientes con azúcar',
          ],
        },
      },
    ],
  },
  {
    id: 'i18',
    moduleId: 'm5',
    title: { en: 'The 10% sugar rule', es: 'La regla del 10% de azúcar' },
    summary: {
      en: 'No more than a tenth of daily calories from added sugar.',
      es: 'No más de una décima parte de las calorías diarias de azúcar añadida.',
    },
    body: [
      {
        kind: 'p',
        text: {
          en: 'This is a dietary guideline recommended by health organizations:',
          es: 'Esta es una recomendación alimentaria de las organizaciones de salud:',
        },
      },
      {
        kind: 'ul',
        items: {
          en: [
            'No more than 10% of your daily calories should come from added sugars',
            'For adults eating 2,000 calories a day, that is a maximum of 200 calories from sugar',
            'For children eating 1,500 calories a day, no more than 150 calories from added sugar',
          ],
          es: [
            'No más del 10% de sus calorías diarias debe venir de azúcares añadidos',
            'Para un adulto que consume 2,000 calorías al día, son máximo 200 calorías de azúcar',
            'Para un niño que consume 1,500 calorías al día, no más de 150 calorías de azúcar añadida',
          ],
        },
      },
    ],
  },
  {
    id: 'i19',
    moduleId: 'm5',
    title: { en: 'How to understand food labels', es: 'Cómo entender las etiquetas de alimentos' },
    summary: {
      en: 'Turn grams of sugar into teaspoons you can picture.',
      es: 'Convierta los gramos de azúcar en cucharaditas que puede imaginar.',
    },
    body: [
      {
        kind: 'stat',
        value: '4 g = 1 tsp',
        label: {
          en: 'four grams of sugar is one teaspoon',
          es: 'cuatro gramos de azúcar es una cucharadita',
        },
      },
      {
        kind: 'p',
        text: { en: 'Daily limits:', es: 'Límites diarios:' },
      },
      {
        kind: 'ul',
        items: {
          en: [
            'Men — no more than 9 teaspoons per day',
            'Women — no more than 6 teaspoons per day',
            'Children — less than 6 teaspoons per day',
          ],
          es: [
            'Hombres — no más de 9 cucharaditas al día',
            'Mujeres — no más de 6 cucharaditas al día',
            'Niños — menos de 6 cucharaditas al día',
          ],
        },
      },
      {
        kind: 'p',
        text: { en: 'On a real label:', es: 'En una etiqueta real:' },
      },
      {
        kind: 'ul',
        items: {
          en: [
            '48 grams of sugar = 12 teaspoons',
            '54 grams of sugar = 13.5 teaspoons',
            '46 grams of sugar = 11.5 teaspoons',
          ],
          es: [
            '48 gramos de azúcar = 12 cucharaditas',
            '54 gramos de azúcar = 13.5 cucharaditas',
            '46 gramos de azúcar = 11.5 cucharaditas',
          ],
        },
      },
    ],
  },
  {
    id: 'i20',
    moduleId: 'm5',
    title: { en: 'Tips to avoid sugary drinks', es: 'Consejos para evitar las bebidas azucaradas' },
    summary: {
      en: 'Six changes that work with children.',
      es: 'Seis cambios que funcionan con los niños.',
    },
    body: [
      {
        kind: 'ul',
        items: {
          en: [
            'Start when they are young',
            'Avoid sports drinks',
            'Drink less juice',
            'Drink more water',
            'Add fun flavors to water',
            'Read the labels',
          ],
          es: [
            'Empiece cuando están pequeños',
            'Evite las bebidas deportivas',
            'Tomen menos jugo',
            'Tomen más agua',
            'Agregue sabores divertidos al agua',
            'Lea las etiquetas',
          ],
        },
      },
    ],
  },
  {
    id: 'i21',
    moduleId: 'm5',
    title: { en: 'Setting goals: drink more water', es: 'Poner metas: tomar más agua' },
    summary: {
      en: 'Daily water goals for the whole family.',
      es: 'Metas diarias de agua para toda la familia.',
    },
    body: [
      {
        kind: 'p',
        text: { en: 'Children aged 7 to 12:', es: 'Niños de 7 a 12 años:' },
      },
      {
        kind: 'ul',
        items: {
          en: ['Boys: 8 to 10 cups of water per day', 'Girls: 8 to 9 cups of water per day'],
          es: ['Niños: de 8 a 10 vasos de agua al día', 'Niñas: de 8 a 9 vasos de agua al día'],
        },
      },
      {
        kind: 'ul',
        items: {
          en: ['Men: 15 cups per day', 'Women: 11 cups per day'],
          es: ['Hombres: 15 vasos al día', 'Mujeres: 11 vasos al día'],
        },
      },
    ],
  },
  {
    id: 'i22',
    moduleId: 'm6',
    title: { en: 'Water: the basis of well-being', es: 'El agua: la base del bienestar' },
    summary: {
      en: 'Most of the body is water.',
      es: 'La mayor parte del cuerpo es agua.',
    },
    body: [
      {
        kind: 'stat',
        value: '60%',
        label: { en: 'of our body is water', es: 'de nuestro cuerpo es agua' },
      },
      {
        kind: 'p',
        text: {
          en: 'Water helps our body function properly.',
          es: 'El agua ayuda a que nuestro cuerpo funcione bien.',
        },
      },
    ],
  },
  {
    id: 'i23',
    moduleId: 'm6',
    title: { en: 'The benefits of drinking water', es: 'Los beneficios de tomar agua' },
    summary: {
      en: 'Temperature, joints, skin and kidneys.',
      es: 'Temperatura, articulaciones, piel y riñones.',
    },
    body: [
      {
        kind: 'ul',
        items: {
          en: [
            'Maintains body temperature',
            'Protects the joints',
            'Keeps skin healthy',
            'Helps the kidneys work properly and clears out what the body does not need',
          ],
          es: [
            'Mantiene la temperatura del cuerpo',
            'Protege las articulaciones',
            'Mantiene la piel sana',
            'Ayuda al buen funcionamiento de los riñones y elimina lo que el cuerpo no necesita',
          ],
        },
      },
    ],
  },
  {
    id: 'i24',
    moduleId: 'm6',
    title: {
      en: 'What happens if we do not drink water?',
      es: '¿Qué pasa si no tomamos agua?',
    },
    summary: {
      en: 'From headaches to serious problems.',
      es: 'Desde dolores de cabeza hasta problemas graves.',
    },
    body: [
      { kind: 'p', text: { en: 'We can have:', es: 'Podemos tener:' } },
      {
        kind: 'ul',
        items: {
          en: ['Headache', 'Dizziness', 'Mood changes', 'Confusion'],
          es: ['Dolor de cabeza', 'Mareos', 'Cambios de ánimo', 'Confusión'],
        },
      },
      {
        kind: 'callout',
        tone: 'warn',
        text: {
          en: 'And serious problems such as kidney failure and heart problems.',
          es: 'Y problemas graves como insuficiencia renal y problemas del corazón.',
        },
      },
    ],
  },
  {
    id: 'i25',
    moduleId: 'm6',
    title: {
      en: 'When do we need to drink more water?',
      es: '¿Cuándo necesitamos tomar más agua?',
    },
    summary: {
      en: 'Hot days, sports and sick days.',
      es: 'Días calurosos, deporte y días de enfermedad.',
    },
    body: [
      {
        kind: 'ul',
        items: {
          en: [
            'On hot and sunny days',
            'When you play sports or spend time outdoors',
            'When we are sick, with a cold or the flu',
          ],
          es: [
            'En días calurosos y soleados',
            'Cuando hace deporte o pasa tiempo al aire libre',
            'Cuando estamos enfermos, con catarro o gripe',
          ],
        },
      },
    ],
  },
  {
    id: 'i26',
    moduleId: 'm6',
    title: { en: 'Tips for drinking more water', es: 'Consejos para tomar más agua' },
    summary: {
      en: 'Make water the easy choice at home.',
      es: 'Haga que el agua sea la opción fácil en casa.',
    },
    body: [
      {
        kind: 'ul',
        items: {
          en: [
            'Keep water in the refrigerator',
            'Drink water with your meals',
            'Always carry a bottle of water with you',
          ],
          es: [
            'Tenga agua en el refrigerador',
            'Tome agua con sus comidas',
            'Lleve siempre una botella de agua con usted',
          ],
        },
      },
      {
        kind: 'callout',
        tone: 'good',
        text: {
          en: 'Add flavor! Make aguas frescas, or add slices of lemon, cucumber, orange, blackberry, strawberry, pineapple, watermelon or mango.',
          es: '¡Dele sabor! Prepare aguas frescas, o agregue rodajas de limón, pepino, naranja, mora, fresa, piña, sandía o mango.',
        },
      },
    ],
  },
  {
    id: 'i27',
    moduleId: 'm6',
    title: { en: 'How much water do we need?', es: '¿Cuánta agua necesitamos?' },
    summary: {
      en: 'Daily cups of drinking water, by age.',
      es: 'Vasos de agua al día, según la edad.',
    },
    body: [
      {
        kind: 'ul',
        items: {
          en: ['1 cup = 8 oz = half a bottle of water', '2 cups = 16.9 oz = one bottle of water'],
          es: ['1 vaso = 8 oz = media botella de agua', '2 vasos = 16.9 oz = una botella de agua'],
        },
      },
      {
        kind: 'p',
        text: { en: 'Boys', es: 'Niños' },
      },
      {
        kind: 'ul',
        items: {
          en: ['4 to 8 years old: 4½ cups of water', '9 to 13 years old: 6½ cups of water'],
          es: ['De 4 a 8 años: 4½ vasos de agua', 'De 9 a 13 años: 6½ vasos de agua'],
        },
      },
      {
        kind: 'p',
        text: { en: 'Girls', es: 'Niñas' },
      },
      {
        kind: 'ul',
        items: {
          en: ['4 to 8 years old: 4 cups of water', '9 to 13 years old: 6 cups of water'],
          es: ['De 4 a 8 años: 4 vasos de agua', 'De 9 a 13 años: 6 vasos de agua'],
        },
      },
      {
        kind: 'p',
        text: { en: 'Adults, 14 and over', es: 'Adultos, de 14 años en adelante' },
      },
      {
        kind: 'ul',
        items: {
          en: ['Men: 8 cups of water', 'Women: 6½ cups of water'],
          es: ['Hombres: 8 vasos de agua', 'Mujeres: 6½ vasos de agua'],
        },
      },
    ],
  },
  {
    id: 'i28',
    moduleId: 'm6',
    title: { en: 'Setting goals', es: 'Poner metas' },
    summary: {
      en: 'Start and end the day with a cup of water.',
      es: 'Empiece y termine el día con un vaso de agua.',
    },
    body: [
      {
        kind: 'ul',
        items: {
          en: [
            'Start and end the day with a cup of water',
            'Set a goal such as drinking 8 cups of water a day',
            'Set reminders to drink water',
          ],
          es: [
            'Empezar y terminar el día con un vaso de agua',
            'Ponerse una meta como tomar 8 vasos de agua al día',
            'Poner recordatorios para tomar agua',
          ],
        },
      },
    ],
  },
  {
    id: 'i29',
    moduleId: 'm7',
    title: { en: 'Physical activities', es: 'Actividades físicas' },
    summary: {
      en: 'Ways to move that the whole family enjoys.',
      es: 'Formas de moverse que disfruta toda la familia.',
    },
    body: [
      {
        kind: 'ul',
        items: {
          en: ['Playing', 'Dancing', 'Running', 'Riding a bike', 'Practicing your favorite sport'],
          es: ['Jugar', 'Bailar', 'Correr', 'Andar en bicicleta', 'Practicar su deporte favorito'],
        },
      },
    ],
  },
]

export const itemById = Object.fromEntries(items.map((i) => [i.id, i]))

export const itemsByModule = (moduleId: string) =>
  items.filter((i) => i.moduleId === moduleId)
