import router from './router/client'
import createApp from './main'
import './assets/main.css'

const app = createApp()

app.use(router)

app.mount('#app')
