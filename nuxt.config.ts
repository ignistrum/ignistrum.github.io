import packageJSON from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
      meta: [
        {
          charset: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'ie=edge',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    rootId: 'ender-app',
  },
  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
        extensions: ['.vue'],
      },
    ],
  },
  css: [
    '~/assets/styles/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  plugins: [],
  modules: [
    'nuxt-font-loader',
    '@nuxt/content',
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    'nuxt-quasar-ui',
  ],
  quasar: {
    lang: 'en-US',
  },
  typescript: {
    typeCheck: true,
  },
  vite: {
    define: {
      'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageJSON.version),
    },
  },
})
