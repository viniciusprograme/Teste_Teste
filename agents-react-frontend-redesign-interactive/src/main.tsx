import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Register service worker in production to enable controlled caching
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      // If there's an active waiting worker, notify the app
      if (registration.waiting) {
        window.dispatchEvent(new CustomEvent('swUpdated', { detail: registration }))
      }

      // Listen for new installing worker
      registration.addEventListener('updatefound', () => {
        const installing = registration.installing
        if (!installing) return
        installing.addEventListener('statechange', () => {
          if (installing.state === 'installed' && registration.waiting) {
            window.dispatchEvent(new CustomEvent('swUpdated', { detail: registration }))
          }
        })
      })
    }).catch(() => {
      // registration failed; ignore silently
    })
  })
}
