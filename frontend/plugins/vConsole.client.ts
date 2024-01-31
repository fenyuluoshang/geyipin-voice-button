import type VConsole from 'vconsole'

async function loadVConsole() {
  const { default: vconsole } = await import('vconsole')
  return new vconsole()
}

export default defineNuxtPlugin({
  setup: () => {
    if (import.meta.dev) {
      let console: VConsole
      loadVConsole().then((v) => {
        console = v
      })
      const getVConsole = () => console
      return {
        provide: { console: getVConsole() }
      }
    }
  }
})
