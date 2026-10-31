import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './fonts.css'
import './index.css'
import App from './App.jsx'
import { fetchContent, loadSnapshot, primedContent } from './api/client'

// Start loading the site content while the app mounts.
fetchContent().catch(() => {})

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

if (root.dataset.prerendered === window.location.pathname) {
  // The build already drew this page (scripts/prerender-app.mjs): attach to that
  // markup, starting from the same content it was drawn from.
  loadSnapshot().then(() => {
    if (primedContent()) hydrateRoot(root, app)
    else createRoot(root).render(app)
  })
} else {
  createRoot(root).render(app)
}
