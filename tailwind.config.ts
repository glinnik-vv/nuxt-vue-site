import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
    }
  },
  plugins: [
    require('daisyui'),
  ]
}
