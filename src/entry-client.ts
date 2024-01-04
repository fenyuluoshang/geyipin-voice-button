import router from './router/client'
import createApp from './main'
import './assets/main.scss'

const app = createApp()

app.use(router)

app.mount('#app')
