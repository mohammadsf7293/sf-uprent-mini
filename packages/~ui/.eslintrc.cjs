module.exports = {
  root: true,
  extends: ['custom', 'plugin:svelte/recommended'],
  parserOptions: {
    extraFileExtensions: ['.svelte'],
  },
  env: {
    webextensions: true,
    browser: true,
  },
  ignorePatterns: ['dist/*'],
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
    Optional: 'readonly',
    VoidCallback: 'readonly',
  },
}
