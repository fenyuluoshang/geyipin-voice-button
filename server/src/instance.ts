import 'reflect-metadata'
import express from 'express'
import {
  RoutingControllersOptions,
  useExpressServer,
  useContainer as rcUseContainer
} from 'routing-controllers'
import { Container } from 'typedi'
import { loadEnv } from './config'
import path from 'path'
import { DataSource } from 'typeorm'
import { containerRegister } from './container'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import { CorsOptionData, CorsWhiteListUpdate } from './cache/cors-white-list'

async function startup(app: express.Express) {
  loadEnv(process.env.NODE_ENV || 'production', path.resolve(__dirname, '../'), '')

  app.use(cookieParser())

  app.use(
    session({
      secret: 'voice_button',
      resave: false,
      saveUninitialized: true
    })
  )

  const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.PG_DATA_URL,
    entities: [path.resolve(__dirname, './models', './*.model.{ts,js}')],
    migrations: [path.resolve(__dirname, './migrations', './*.{ts,js}')],
    synchronize: false,
    migrationsRun: true,
    logging: process.env.NODE_ENV !== 'production' ? ['query', 'warn', 'error'] : ['warn', 'error']
  })

  console.log(AppDataSource.migrations)

  await AppDataSource.initialize()
  Container.set('AppDataSource', AppDataSource)

  await CorsWhiteListUpdate()

  const config: RoutingControllersOptions = {
    defaultErrorHandler: false,
    controllers: [path.resolve(__dirname, './controllers/**/*.controller.{ts,js}')],
    middlewares: [path.resolve(__dirname, './middlewares/**/*.middleware.{ts,js}')],
    routePrefix: '/api',
    cors: CorsOptionData
  }

  useExpressServer(app, config)

  containerRegister()

  rcUseContainer(Container)
}

export default startup
