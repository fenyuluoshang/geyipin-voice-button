import express from 'express'
import startup from './instance'

const app = express()

startup(app).then(() => {
  app.listen(3000, () => {
    console.log('start at http://127.0.0.1:3000')
  })
})
