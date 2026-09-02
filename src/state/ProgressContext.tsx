import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { load, save, todayKey } from '@/lib/storage'
import { items, itemsByModule, modules, quizzes } from '@/content'

const KEY = 'lacasa.progress.v1'

export interface TrackedGoal {
  goalId: string
  addedAt: string
  /** ISO dates the family marked the goal done. */
  checkIns: string[]
}

export interface ProgressState {
  readItemIds: string[]
  quizScores: Record<string, { correct: number; total: number; at: string }>
  goals: TrackedGoal[]
}

const empty: ProgressState = { readItemIds: [], quizScores: {}, goals: [] }

interface ProgressValue extends ProgressState {
  isRead: (itemId: string) => boolean
  toggleRead: (itemId: string) => void
  moduleProgress: (moduleId: string) => { read: number; total: number; pct: number; done: boolean }
  overall: { modulesDone: number; totalModules: number; itemsRead: number; totalItems: number; pct: number }
  nextUp: { moduleId: string; itemId: string } | null
  recordQuiz: (moduleId: string, correct: number, total: number) => void
  addGoal: (goalId: string) => void
  removeGoal: (goalId: string) => void
  checkInGoal: (goalId: string) => void
  goalDoneToday: (goalId: string) => boolean
  goalStreak: (goalId: string) => number
  reset: () => void
}

const Ctx = createContext<ProgressValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(() => load(KEY, empty))

  useEffect(() => {
    save(KEY, state)
    // When Supabase auth is on, this is the hook that mirrors the same state
    // to the `progress` / `goals` tables so it follows the family across
    // devices. Device storage stays the source of truth while offline.
  }, [state])

  const isRead = useCallback((id: string) => state.readItemIds.includes(id), [state.readItemIds])

  const toggleRead = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      readItemIds: s.readItemIds.includes(id)
        ? s.readItemIds.filter((x) => x !== id)
        : [...s.readItemIds, id],
    }))
  }, [])

  const moduleProgress = useCallback(
    (moduleId: string) => {
      const list = itemsByModule(moduleId)
      const read = list.filter((i) => state.readItemIds.includes(i.id)).length
      const total = list.length
      return { read, total, pct: total ? Math.round((read / total) * 100) : 0, done: total > 0 && read === total }
    },
    [state.readItemIds],
  )

  const overall = useMemo(() => {
    const modulesDone = modules.filter((m) => {
      const list = itemsByModule(m.id)
      return list.length > 0 && list.every((i) => state.readItemIds.includes(i.id))
    }).length
    const itemsRead = state.readItemIds.length
    return {
      modulesDone,
      totalModules: modules.length,
      itemsRead,
      totalItems: items.length,
      pct: items.length ? Math.round((itemsRead / items.length) * 100) : 0,
    }
  }, [state.readItemIds])

  const nextUp = useMemo(() => {
    for (const m of modules) {
      const list = itemsByModule(m.id)
      const unread = list.find((i) => !state.readItemIds.includes(i.id))
      if (unread) return { moduleId: m.id, itemId: unread.id }
    }
    return null
  }, [state.readItemIds])

  const recordQuiz = useCallback((moduleId: string, correct: number, total: number) => {
    setState((s) => ({
      ...s,
      quizScores: { ...s.quizScores, [moduleId]: { correct, total, at: new Date().toISOString() } },
    }))
  }, [])

  const addGoal = useCallback((goalId: string) => {
    setState((s) =>
      s.goals.some((g) => g.goalId === goalId)
        ? s
        : { ...s, goals: [...s.goals, { goalId, addedAt: new Date().toISOString(), checkIns: [] }] },
    )
  }, [])

  const removeGoal = useCallback((goalId: string) => {
    setState((s) => ({ ...s, goals: s.goals.filter((g) => g.goalId !== goalId) }))
  }, [])

  const checkInGoal = useCallback((goalId: string) => {
    const today = todayKey()
    setState((s) => ({
      ...s,
      goals: s.goals.map((g) =>
        g.goalId !== goalId
          ? g
          : {
              ...g,
              checkIns: g.checkIns.includes(today)
                ? g.checkIns.filter((d) => d !== today)
                : [...g.checkIns, today],
            },
      ),
    }))
  }, [])

  const goalDoneToday = useCallback(
    (goalId: string) => state.goals.find((g) => g.goalId === goalId)?.checkIns.includes(todayKey()) ?? false,
    [state.goals],
  )

  const goalStreak = useCallback(
    (goalId: string) => {
      const g = state.goals.find((x) => x.goalId === goalId)
      if (!g) return 0
      const set = new Set(g.checkIns)
      let streak = 0
      const cursor = new Date()
      // Today not being checked yet shouldn't break yesterday's streak.
      if (!set.has(todayKey(cursor))) cursor.setDate(cursor.getDate() - 1)
      while (set.has(todayKey(cursor))) {
        streak += 1
        cursor.setDate(cursor.getDate() - 1)
      }
      return streak
    },
    [state.goals],
  )

  const reset = useCallback(() => setState(empty), [])

  const value = useMemo<ProgressValue>(
    () => ({
      ...state,
      isRead,
      toggleRead,
      moduleProgress,
      overall,
      nextUp,
      recordQuiz,
      addGoal,
      removeGoal,
      checkInGoal,
      goalDoneToday,
      goalStreak,
      reset,
    }),
    [state, isRead, toggleRead, moduleProgress, overall, nextUp, recordQuiz, addGoal, removeGoal, checkInGoal, goalDoneToday, goalStreak, reset],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}

export const hasQuiz = (moduleId: string) => (quizzes[moduleId]?.length ?? 0) > 0
