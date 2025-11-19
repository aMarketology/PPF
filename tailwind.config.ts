import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#60a5fa',
        blueGrey: '#64748b',
        lightGrey: '#f1f5f9',
        mediumGrey: '#e2e8f0',
        dark: '#1a1a1a',
        darkAlt: '#2d2d2d',
        light: '#ffffff',
      },
    },
  },
  plugins: [],
}
export default config
