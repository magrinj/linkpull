import React from 'react'
import ReactDOM from 'react-dom/client'
import { getLocale } from '@/lib/i18n'
import App from './App'
import './style.css'

document.documentElement.lang = getLocale()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
