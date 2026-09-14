/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        safari: {
          50: 'var(--safari-50, #f0fdf4)',
          100: 'var(--safari-100, #dcfce7)',
          200: 'var(--safari-200, #bbf7d0)',
          300: 'var(--safari-300, #86efac)',
          400: 'var(--safari-400, #4ade80)',
          500: 'var(--safari-500, #22c55e)',
          600: 'var(--safari-600, #16a34a)',
          700: 'var(--safari-700, #15803d)',
          800: 'var(--safari-800, #166534)',
          900: 'var(--safari-900, #14532d)',
          950: 'var(--safari-950, #052e16)',
          emerald: '#1dd173',
          dark: '#0e1610',
          darker: '#080d09',
          moss: '#1c2e20',
          cream: '#f8faf7',
          card: '#f4f6f4',
          input: '#f0f2f0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
