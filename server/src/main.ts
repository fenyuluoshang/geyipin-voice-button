import express from 'express'
import startup from './instance'
import moment from 'moment-timezone'

const app = express()

moment.tz.setDefault('Asia/Shanghai')

startup(app).then(() => {
  app.listen(3100, () => {
    console.log('start at http://127.0.0.1:3100')
  })
})
