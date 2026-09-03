import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import Welcome from '@/screens/Welcome'
import { LanguageProvider } from '@/i18n/LanguageContext'
import { ProgressProvider } from '@/state/ProgressContext'
import { load, save } from '@/lib/storage'
import './index.css'

const WELCOME_KEY = 'lacasa.welcomed'

function Root() {
  const [welcomed, setWelcomed] = useState(() => load(WELCOME_KEY, false))

  if (!welcomed) {
    return (
      <Welcome
        onContinue={() => {
          save(WELCOME_KEY, true)
          setWelcomed(true)
        }}
      />
    )
  }

  return (
    <HashRouter>
      <App />
    </HashRouter>
  )
}

/* HashRouter, deliberately: a Capacitor shell serves the app from a file
 * origin where browser-history paths 404 on reload. Hash routing behaves
 * identically on the web and inside the native wrapper. */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <ProgressProvider>
        <Root />
      </ProgressProvider>
    </LanguageProvider>
  </StrictMode>,
)
