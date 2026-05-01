import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@freeformation/core/i18n'
import App from './App'
import { ThemeProvider } from '@freeformation/core'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider initialBrand="core" initialMode="light" initialLocale="en">
      <App />
    </ThemeProvider>
  </StrictMode>,
)

