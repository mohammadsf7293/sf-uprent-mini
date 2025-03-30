import tailwindPreset from 'tailwind-preset'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [tailwindPreset],
  content: [
    './components/**/*.{html,svelte,ts}',
    '../../packages/~i18n/**/*.ts',
  ],
  prefix: '.',
  theme: {
    extend: {},
  },
  plugins: [],
}
