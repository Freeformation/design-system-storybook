import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.tsx'
import ThemeProvider from './theme/ThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider initialBrand="core" initialMode="light" initialLocale="en">
      <App />
    </ThemeProvider>
  </StrictMode>,
)
