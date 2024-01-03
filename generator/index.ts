import { renderToString } from 'vue/server-renderer'
import createSSRApp from '../dist/server/entry-server.js'

const renderPages = ['/', '/about']

async function render(path: string) {
  const html = await renderToString(await createSSRApp(path), {})

  console.log(html)
}

renderPages.forEach((item) => {
  render(item)
})
