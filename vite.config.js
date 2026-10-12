import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

/**
 * The public origin of the site. Set VITE_SITE_URL to the live domain; on Vercel
 * it falls back to the project's production domain. Empty means "unknown", and
 * the app then uses whatever origin it is served from.
 */
export function resolveSiteUrl(env) {
  const explicit = env.VITE_SITE_URL
  if (explicit) return explicit.replace(/\/+$/, '')
  if (env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
  return ''
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const siteUrl = resolveSiteUrl({ ...process.env, ...loadEnv(mode, process.cwd(), '') })

  return {
    plugins: [
      react(),
      {
        name: 'site-url-html',
        transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
      },
    ],
    define: {
      __SITE_URL__: JSON.stringify(siteUrl),
    },
  }
})
