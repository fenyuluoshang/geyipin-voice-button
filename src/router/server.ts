import { createMemoryHistory, createRouter } from "vue-router";
import routes from ".";

export default function createHistory(path: string) {
  const history = createMemoryHistory(import.meta.env.BASE_URL)
  return createRouter({
    history,
    routes: routes
  })
}