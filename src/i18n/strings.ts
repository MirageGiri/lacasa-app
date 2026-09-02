export type Lang = 'en' | 'es'

/** Interface chrome. Curriculum copy lives in src/content, not here. */
export const ui = {
  appName:        { en: 'LA CASA', es: 'LA CASA' },
  tagline:        { en: 'Community, Food, Safety and Love', es: 'Comunidad, Alimentación, Seguridad y Amor' },

  navHome:        { en: 'Learn',    es: 'Aprender' },
  navGoals:       { en: 'Goals',    es: 'Metas' },
  navAsk:         { en: 'Ask',      es: 'Preguntar' },
  navProfile:     { en: 'Profile',  es: 'Perfil' },

  greeting:       { en: 'Healthy habits for your family', es: 'Hábitos saludables para su familia' },
  yourProgress:   { en: 'Your progress', es: 'Su progreso' },
  modulesDone:    { en: 'modules complete', es: 'módulos completados' },
  continueLabel:  { en: 'Continue where you left off', es: 'Continuar donde se quedó' },
  startModule:    { en: 'Start', es: 'Comenzar' },
  continueModule: { en: 'Continue', es: 'Continuar' },
  reviewModule:   { en: 'Review', es: 'Repasar' },

  lessons:        { en: 'lessons', es: 'lecciones' },
  lesson:         { en: 'lesson',  es: 'lección' },
  ofLabel:        { en: 'of', es: 'de' },
  markComplete:   { en: 'Mark as read', es: 'Marcar como leída' },
  markedComplete: { en: 'Read', es: 'Leída' },
  next:           { en: 'Next', es: 'Siguiente' },
  previous:       { en: 'Back', es: 'Atrás' },
  backToModule:   { en: 'Back to module', es: 'Volver al módulo' },

  quizTitle:      { en: 'Knowledge check', es: 'Comprobación de conocimientos' },
  quizIntro:      { en: 'A few quick questions on what you just read.', es: 'Unas preguntas rápidas sobre lo que acaba de leer.' },
  startQuiz:      { en: 'Start the check', es: 'Comenzar' },
  quizQuestion:   { en: 'Question', es: 'Pregunta' },
  quizCorrect:    { en: 'Correct', es: 'Correcto' },
  quizIncorrect:  { en: 'Not quite', es: 'Casi' },
  quizScore:      { en: 'You got', es: 'Acertó' },
  quizRetry:      { en: 'Try again', es: 'Intentar de nuevo' },
  quizDone:       { en: 'Finish', es: 'Terminar' },

  goalsTitle:     { en: 'My goals', es: 'Mis metas' },
  goalsEmpty:     { en: 'Pick a goal to work on this week. Small and specific works best.', es: 'Elija una meta para esta semana. Pequeña y concreta funciona mejor.' },
  goalsAdd:       { en: 'Add a goal', es: 'Agregar una meta' },
  goalsChoose:    { en: 'Choose a goal', es: 'Elija una meta' },
  goalsActive:    { en: 'Working on', es: 'Trabajando en' },
  goalMarkToday:  { en: 'Did it today', es: 'Lo hice hoy' },
  goalDoneToday:  { en: 'Done today', es: 'Hecho hoy' },
  goalStreak:     { en: 'day streak', es: 'días seguidos' },
  goalRemove:     { en: 'Remove', es: 'Quitar' },

  askTitle:       { en: 'Ask a question', es: 'Haga una pregunta' },
  askIntro:       { en: 'Questions answered by the LA CASA team.', es: 'Preguntas respondidas por el equipo de LA CASA.' },
  askPlaceholder: { en: 'Write your question…', es: 'Escriba su pregunta…' },
  askSend:        { en: 'Send', es: 'Enviar' },
  askPending:     { en: 'Sent — the LA CASA team will answer soon.', es: 'Enviada — el equipo de LA CASA responderá pronto.' },

  profileTitle:   { en: 'Profile', es: 'Perfil' },
  language:       { en: 'Language', es: 'Idioma' },
  english:        { en: 'English', es: 'Inglés' },
  spanish:        { en: 'Spanish', es: 'Español' },
  resetProgress:  { en: 'Reset my progress', es: 'Borrar mi progreso' },
  resetConfirm:   { en: 'This clears every lesson, goal and quiz result on this device.', es: 'Esto borra todas las lecciones, metas y resultados en este dispositivo.' },

  draftBadge:     { en: 'Spanish draft — pending review', es: 'Borrador en español — pendiente de revisión' },
  needsCopy:      { en: 'Content coming soon', es: 'Contenido próximamente' },
} as const

export type UiKey = keyof typeof ui
