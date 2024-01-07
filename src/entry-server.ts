import createRouter from './router/server'
import { ID_INJECTION_KEY } from 'element-plus'
import createApp from './main'

export default async function (path = '/', current = 0) {
  const router = createRouter(path)
  const app = createApp()
  app.use(router)
  app.provide(ID_INJECTION_KEY, {
    prefix: 1024,
    current,
  })

  await new Promise<void>((resolve, reject) => {
    router.push(path)
    router.isReady().then(resolve)
    router.onError((err) => reject(err))
  })

  return app
}
