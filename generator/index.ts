import { renderToString } from 'vue/server-renderer'
import createSSRApp from '../dist/server/entry-server.js'
import fs from 'fs/promises'
import { existsSync } from 'fs'
import { JSDOM } from 'jsdom'
import path from 'path'

const __dirname = path.resolve()

const renderPaths = ['/', '/about']

async function readHTML() {
  const htmlFile = await fs.readFile(path.resolve(__dirname, './dist/client/index.html'))
  const html = new JSDOM(htmlFile)
  return html
}

async function renderVue(path: string, current: number) {
  const dom = await readHTML()
  const entry = dom.window.document.getElementById('app') || dom.window.document.body
  const app = await createSSRApp(path, current)
  const html = await renderToString(app, {})
  entry.innerHTML = html
  return { dom, app }
}

async function render() {
  if (existsSync(path.resolve(__dirname, `./dist/generator/`))) {
    await fs.rm(path.resolve(__dirname, `./dist/generator/`), { recursive: true })
  }
  await fs.cp(
    path.resolve(__dirname, './dist/client/'),
    path.resolve(__dirname, `./dist/generator/`),
    {
      recursive: true
    }
  )

  for (let index = 0; index < renderPaths.length; index++) {
    const item = renderPaths[index]
    const { dom, app } = await renderVue(item, index)
    fs.writeFile(
      path.resolve(__dirname, `./dist/generator/${pathToFileName(item)}.html`),
      dom.window.document.documentElement.outerHTML
    )
  }
}

function pathToFileName(path: string) {
  return path.replace(/\/$/, 'index').replace(/^\//, '')
}

console.log('start to generator static page')
render()
