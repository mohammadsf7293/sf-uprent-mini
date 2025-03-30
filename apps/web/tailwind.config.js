/** @type {import('tailwindcss').Config} */
export default {
  presets: [require('tailwind-preset')],
  content: [
    './src/**/*.{html,svelte,ts}',
    '../../packages/~ui/**/*.{html,svelte,ts}',
  ],
  prefix: '.',
  theme: {
    extend: {},
  },
  plugins: [],
}
