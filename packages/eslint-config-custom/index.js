// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'turbo',
    'prettier',
  ],
  ignorePatterns: [
    '*app.d.ts',
    'apps/server/generated/*',
    'apps/server/types/*',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    'lines-around-directive': 'off',
    'import/order': 'off',
    'default-case-last': 'error',
    'no-empty-function': 'error',
    'no-unneeded-ternary': 'error',
    'require-await': 'error',
    'no-unsafe-optional-chaining': 'error',
    'no-unreachable': 'error',
    'no-duplicate-imports': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
}
