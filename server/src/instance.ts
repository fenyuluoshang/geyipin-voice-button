import 'reflect-metadata'
import express from 'express'
import { RoutingControllersOptions, useExpressServer } from 'routing-controllers'
import { useContainer as rcUseContainer } from 'routing-controllers'
import { Container } from 'typedi'
import { loadEnv } from './config'
import path from 'path'
import { DataSource } from 'typeorm'
import { containerRegister } from './container'
import session from 'express-session'
import loadGrowthBook from './utils/growthbook'

async function startup(app: express.Express) {
  loadEnv(process.env.NODE_ENV || 'production', path.resolve(__dirname, '../'), '')

  // Working Envs
  console.log({
    WORK_URL: process.env.WORK_URL,
    PG_DATA_URL: process.env.PG_DATA_URL,
    PG_UNLEASH_URL: process.env.PG_UNLEASH_URL
  })

  if (process.env.USE_GROWTHBOOK === 'true') {
    const growthbook = await loadGrowthBook()
    Container.set('enable-growthbook', true)
    Container.set('growthbook', growthbook)
  } else {
    Container.set('enable-growthbook', false)
    Container.set('growthbook', undefined)
  }

  app.use(
    session({
      secret: 'voice_button'
    })
  )

  const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.PG_DATA_URL,
    entities: [path.resolve(__dirname, './models', './*.model.{ts,js}')],
    migrations: [path.resolve(__dirname, './migrations', './*.{ts,js}')],
    synchronize: false,
    migrationsRun: true,
    logging: true
  })

  await AppDataSource.initialize()
  Container.set('AppDataSource', AppDataSource)

  const config: RoutingControllersOptions = {
    defaultErrorHandler: false,
    controllers: [path.resolve(__dirname, './controllers/**/*.controller.{ts,js}')],
    middlewares: [path.resolve(__dirname, './middlewares/**/*.middleware.{ts,js}')],
    routePrefix: '/api'
  }

  useExpressServer(app, config)

  containerRegister()

  rcUseContainer(Container)
}

export default startup
