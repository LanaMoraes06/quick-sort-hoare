/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
      colors: { ink: '#080b12', surface: '#0f1420', line: '#222a3b', violet: '#a37eff', mint: '#6be8cf', sky: '#68bdff' },
      boxShadow: { glow: '0 0 45px rgba(121,94,246,.12)' }
    }
  },
  plugins: []
};
