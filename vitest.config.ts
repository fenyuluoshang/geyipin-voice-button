import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig((env) => {
  return mergeConfig(
    viteConfig(env),
    defineConfig({
      test: {
        environment: 'jsdom',
        exclude: [...configDefaults.exclude, 'e2e/*'],
        root: fileURLToPath(new URL('./', import.meta.url)),
        // fix with https://stackoverflow.com/questions/75006674/vitest-with-element-plus-unplugin-unknown-extension-for-scss
        server: {
          deps: {
            inline: ['element-plus']
          }
        }
      },
    })
  )
})
