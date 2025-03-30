module.exports = {
  root: true,
  extends: ['custom', 'plugin:svelte/recommended'],
  parserOptions: {
    extraFileExtensions: ['.svelte'],
  },
  ignorePatterns: ['build/'],
  env: {
    node: true,
    browser: true,
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
  rules: {
    'svelte/no-at-html-tags': 'off',
  },
  globals: {
    HTMLElementTagNameMap: 'readonly',
    Optional: 'readonly',
    VoidCallback: 'readonly',
    DndEvent: 'readonly',
    Timer: 'readonly',
    JSX: 'readonly',
    google: 'readonly',
    chrome: 'readonly',
  },
}
