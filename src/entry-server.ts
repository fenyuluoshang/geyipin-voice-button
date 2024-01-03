import './assets/main.css'

import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import createRouter from './router/server'

export default async function createApp(path = '/') {
  const app = createSSRApp(App)

  const router = createRouter(path)

  app.use(createPinia())
  app.use(router)

  await new Promise<void>((resolve, reject) => {
    router.push(path)
    router.isReady().then(resolve)
    router.onError((err) => reject(err))
  })

  return app
}
