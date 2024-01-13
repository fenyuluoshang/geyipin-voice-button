// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    cdnURL: process.env.cdnURL || '/'
  },
  runtimeConfig: {
    public: {
      CDN_URL: process.env.cdnURL || '/',
      VOICE_PATH: process.env.voicePATH || (process.env.cdnURL || '/').replace(/\/$/, '') + '/voices/'
    }
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/devtools',
    '@element-plus/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/eslint-module',
    '@nuxt/test-utils/module'
  ],
  css: ['~/assets/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/element/style.scss" as *;`
        }
      }
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  pinia: {
    storesDirs: ['./stores/**']
  },
  elementPlus: {
    importStyle: 'scss',
    components: [],
    imports: ['ElMessage']
  },
  features: {
    inlineStyles: false
  },
})
