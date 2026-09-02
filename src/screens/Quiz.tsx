import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { moduleById, quizzes } from '@/content'
import { useLang } from '@/i18n/LanguageContext'
import { useProgress } from '@/state/ProgressContext'
import { Screen } from '@/components/ui'

export default function Quiz() {
  const { moduleId = '' } = useParams()
  const navigate = useNavigate()
  const { t, b, bl } = useLang()
  const { recordQuiz } = useProgress()

  const mod = moduleById[moduleId]
  const questions = quizzes[moduleId] ?? []

  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [correct, setCorrect] = useState(0)
  const [finished, setFinished] = useState(false)

  if (!mod || questions.length === 0) return <Screen title="Not found"><p /></Screen>

  const q = questions[index]
  const answered = picked !== null
  const isRight = picked === q.answer

  function choose(i: number) {
    if (answered) return
    setPicked(i)
    if (i === q.answer) setCorrect((c) => c + 1)
  }

  function advance() {
    if (index + 1 < questions.length) {
      setIndex((i) => i + 1)
      setPicked(null)
    } else {
      recordQuiz(moduleId, correct, questions.length)
      setFinished(true)
    }
  }

  function restart() {
    setIndex(0); setPicked(null); setCorrect(0); setFinished(false)
  }

  if (finished) {
    const pct = Math.round((correct / questions.length) * 100)
    return (
      <Screen>
        <div className="card px-6 py-8 text-center">
          <p aria-hidden className="text-5xl">{pct >= 70 ? '🎉' : '💪'}</p>
          <p className="mt-4 text-2xl font-extrabold">
            {t('quizScore')} {correct}/{questions.length}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <button onClick={restart} className="rounded-full border border-line px-5 py-3 font-bold">
              {t('quizRetry')}
            </button>
            <button
              onClick={() => navigate(`/module/${moduleId}`)}
              className="rounded-full bg-brand-600 px-5 py-3 font-bold text-white"
            >
              {t('quizDone')}
            </button>
          </div>
        </div>
      </Screen>
    )
  }

  return (
    <Screen>
      <Link to={`/module/${moduleId}`} className="text-sm font-bold text-brand-600">
        ← {b(mod.title)}
      </Link>

      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-ink-soft">
        {t('quizQuestion')} {index + 1} {t('ofLabel')} {questions.length}
      </p>
      <h1 className="mt-1 text-2xl font-extrabold leading-tight">{b(q.prompt)}</h1>

      <div className="mt-5 grid gap-3">
        {bl(q.choices).map((choice, i) => {
          const state = !answered
            ? 'idle'
            : i === q.answer
              ? 'right'
              : i === picked
                ? 'wrong'
                : 'muted'
          const styles = {
            idle: 'border-line bg-surface hover:border-brand-300',
            right: 'border-leaf-500 bg-emerald-50',
            wrong: 'border-red-400 bg-red-50',
            muted: 'border-line bg-surface opacity-60',
          }[state]
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={answered}
              className={`rounded-[--radius-card] border-2 px-4 py-3.5 text-left text-[17px] font-semibold transition ${styles}`}
            >
              {choice}
              {answered && i === q.answer && <span aria-hidden className="ml-2">✓</span>}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className="mt-5">
          <p className={`text-base font-extrabold ${isRight ? 'text-leaf-600' : 'text-brand-700'}`}>
            {isRight ? t('quizCorrect') : t('quizIncorrect')}
          </p>
          <p className="mt-1 text-[17px] leading-relaxed text-ink-soft">{b(q.explanation)}</p>
          <button
            onClick={advance}
            className="mt-4 w-full rounded-full bg-brand-600 px-5 py-3.5 font-extrabold text-white"
          >
            {index + 1 < questions.length ? t('next') : t('quizDone')}
          </button>
        </div>
      )}
    </Screen>
  )
}
