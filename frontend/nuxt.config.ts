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
      MEMS_PATH: process.env.voicePATH || (process.env.cdnURL || '/').replace(/\/$/, '') + '/mems/',
      SOURCE_PATH: process.env.SOURCE_PATH || (process.env.cdnURL || '/').replace(/\/$/, ''),
      API_DOMAIN: process.env.API_DOMAIN,
      MAIN_DOMAIN: process.env.MAIN_DOMAIN
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
  plugins: [{ src: '~/plugins/vConsole.client', mode: 'client' }],
  devServer: {
    port: 80
  },
  routeRules: {
    '/api/**': { proxy: 'http://localhost:3100/api/**' },
    '/admin/**': { ssr: false }
  }
})
