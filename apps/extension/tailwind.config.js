/** @type {import('tailwindcss').Config} */
export default {
  // eslint-disable-next-line no-undef
  presets: [require('tailwind-preset')],
  content: [
    './src/**/*.{html,svelte,ts}',
    '../../packages/~ui/**/*.{html,svelte,ts}',
    '../../packages/~i18n/**/*.ts',
  ],
  prefix: '.',
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
