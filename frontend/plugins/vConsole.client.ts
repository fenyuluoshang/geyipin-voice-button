import VConsole from 'vconsole'

export default defineNuxtPlugin({
  setup: () => {
    if (import.meta.dev) {
      return {
        provide: { console: new VConsole() }
      }
    }
  }
})
