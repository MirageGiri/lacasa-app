import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { moduleById, quizzes } from '@/content'
import { useLang } from '@/i18n/LanguageContext'
import { useProgress } from '@/state/ProgressContext'
import { BackLink, Screen } from '@/components/ui'
import { AwardIcon, CheckIcon, TargetIcon, XIcon } from '@/components/icons'

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
          <span
            aria-hidden
            className={`mx-auto grid h-20 w-20 place-items-center rounded-full ${
              pct >= 70 ? 'bg-leaf-100 text-leaf-800' : 'bg-brand-100 text-brand-700'
            }`}
          >
            {pct >= 70 ? <AwardIcon size={40} /> : <TargetIcon size={40} />}
          </span>
          <p className="mt-4 text-2xl font-extrabold">
            {t('quizScore')} {correct}/{questions.length}
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <button onClick={restart} className="min-h-12 rounded-full border-2 border-line px-5 py-3 font-bold transition-colors duration-(--duration-fast) hover:border-line-strong">
              {t('quizRetry')}
            </button>
            <button
              onClick={() => navigate(`/module/${moduleId}`)}
              className="min-h-12 rounded-full bg-brand-600 px-5 py-3 font-bold text-white transition-colors duration-(--duration-fast) hover:bg-brand-700"
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
      <BackLink to={`/module/${moduleId}`}>{b(mod.title)}</BackLink>

      <p className="mt-2 text-xs font-bold uppercase tracking-wide text-ink-soft">
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
            idle: 'border-line bg-surface hover:border-brand-400 hover:bg-brand-50',
            right: 'border-leaf-600 bg-leaf-100 text-leaf-800',
            wrong: 'border-danger-400 bg-danger-50 text-danger-600',
            muted: 'border-line bg-surface text-ink-soft',
          }[state]
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={answered}
              className={`flex min-h-13 items-center justify-between gap-3 rounded-card border-2 px-4 py-3.5 text-left text-[17px] font-semibold transition-colors duration-(--duration-fast) disabled:cursor-default ${styles}`}
            >
              <span>{choice}</span>
              {/* Right and wrong each get a shape as well as a color. */}
              {state === 'right' && <CheckIcon size={20} className="shrink-0" />}
              {state === 'wrong' && <XIcon size={20} className="shrink-0" />}
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
            className="mt-4 min-h-13 w-full rounded-full bg-brand-600 px-5 py-3.5 font-extrabold text-white transition-colors duration-(--duration-fast) hover:bg-brand-700"
          >
            {index + 1 < questions.length ? t('next') : t('quizDone')}
          </button>
        </div>
      )}
    </Screen>
  )
}
