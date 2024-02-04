/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/no-explicit-any': 1,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 0,
    'import/named': 0,
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_' }]
  }
}
