import path from 'path'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { loadEnv } from './config'

loadEnv(process.env.NODE_ENV || 'production', path.resolve(__dirname, '../'), '')

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.PG_DATA_URL,
  synchronize: false,
  logging: false,
  entities: [path.resolve(__dirname, './models', './*.model.{ts,js}')],
  migrations: [path.resolve(__dirname, './migrations', './*.{ts,js}')],
  subscribers: []
})
