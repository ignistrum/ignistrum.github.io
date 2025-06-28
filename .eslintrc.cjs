module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier',
  ],
  plugins: [],
  rules: {
    indent: ['error', 2],
    quotes: [2, 'single', { avoidEscape: true }],
    'no-console': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off',
  },
  settings: {
    'import/ignore': ['vue-fontawesome'],
  },
}
