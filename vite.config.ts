import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  base: './',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/element/style.scss" as *;`
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          importStyle: !env.isSsrBuild && 'sass'
        })
      ]
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: !env.isSsrBuild && 'sass'
        })
      ]
    }),
    VitePWA({ registerType: 'autoUpdate' })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  experimental: {
    renderBuiltUrl(filename: string, { hostType }: { hostType: 'js' | 'css' | 'html' }) {
      if (env.mode !== 'production') {
        return { relative: true }
      }
      if (hostType !== 'html') {
        return { relative: true }
      } else {
        return `https://fenyu-media.oss-accelerate.aliyuncs.com/tiancaige/${filename}`
      }
    }
  }
}))
