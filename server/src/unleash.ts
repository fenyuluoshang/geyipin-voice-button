import express from 'express'
import unleash from 'unleash-server'

async function useUnleashServer(app: express.Express) {
  const url = new URL('./unleash', process.env.WORK_URL)
  const instance = await unleash.create({
    databaseUrl: process.env.PG_UNLEASH_URL,
    db: {
      ssl: false
    },
    server: {
      unleashUrl: url.toString(),
      baseUriPath: '/unleash'
    },
    ui: {
      environment: 'test',
      slogan: 'test'
    }
  })
  app.use(instance.app)
}

export default useUnleashServer
