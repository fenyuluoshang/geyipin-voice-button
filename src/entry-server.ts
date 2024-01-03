import createRouter from './router/server'
import createApp from './main'

export default async function (path = '/') {
  const router = createRouter(path)
  const app = createApp()
  app.use(router)

  await new Promise<void>((resolve, reject) => {
    router.push(path)
    router.isReady().then(resolve)
    router.onError((err) => reject(err))
  })

  return app
}
