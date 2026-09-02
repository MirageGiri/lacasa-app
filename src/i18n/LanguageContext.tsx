import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ui } from './strings'
import type { Lang, UiKey } from './strings'
import type { Bilingual, BilingualList } from '@/content/types'

const STORAGE_KEY = 'lacasa.lang'

interface LanguageValue {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  /** UI chrome string. */
  t: (key: UiKey) => string
  /** Curriculum string — falls back to English if the Spanish draft is empty. */
  b: (value: Bilingual) => string
  bl: (value: BilingualList) => string[]
}

const LanguageContext = createContext<LanguageValue | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'es') return saved
  } catch {
    /* private mode, or storage disabled */
  }
  // Spanish-speaking families are the primary audience: honour the device.
  return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('es')
    ? 'es'
    : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const setLang = useCallback((l: Lang) => setLangState(l), [])
  const toggle = useCallback(() => setLangState((l) => (l === 'en' ? 'es' : 'en')), [])

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      setLang,
      toggle,
      t: (key) => ui[key][lang],
      b: (v) => (lang === 'es' ? v.es || v.en : v.en),
      bl: (v) => (lang === 'es' ? (v.es.length ? v.es : v.en) : v.en),
    }),
    [lang, setLang, toggle],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
