import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { LanguageProvider } from '@/i18n/LanguageContext'
import { ProgressProvider } from '@/state/ProgressContext'
import './index.css'

/* HashRouter, deliberately: a Capacitor shell serves the app from a file
 * origin where browser-history paths 404 on reload. Hash routing behaves
 * identically on the web and inside the native wrapper. */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <ProgressProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </ProgressProvider>
    </LanguageProvider>
  </StrictMode>,
)
