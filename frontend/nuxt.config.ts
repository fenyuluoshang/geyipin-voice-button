// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    cdnURL: process.env.cdnURL || '/'
  },
  runtimeConfig: {
    public: {
      CDN_URL: process.env.cdnURL || '/',
      VOICE_PATH:
        process.env.voicePATH || (process.env.cdnURL || '/').replace(/\/$/, '') + '/voices/',
      MEMS_PATH: process.env.voicePATH || (process.env.cdnURL || '/').replace(/\/$/, '') + '/mems/'
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/devtools',
    '@element-plus/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/eslint-module',
    '@nuxt/test-utils/module',
    '@vite-pwa/nuxt'
  ],
  css: ['~/assets/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/element/style.scss" as *;`
        }
      }
    },
    build: {
      target: ['es2015']
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  elementPlus: {
    importStyle: 'scss',
    components: [],
    imports: ['ElMessage']
  },
  features: {
    inlineStyles: false
  },
  experimental: {
    inlineSSRStyles: false
  },
  pwa: {
    registerType: 'autoUpdate'
  },
  plugins: [
    { src: '~/plugins/vConsole.client', mode: 'client' }
  ]
})
