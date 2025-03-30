import { commuteRoute, feedRoute } from '@/routes'
import { setup } from './setup'

const app = setup
  // add artificial "load" time to every request
  .onBeforeHandle(async () => await new Promise(r => setTimeout(r, 500)))
  .use(feedRoute)
  .use(commuteRoute)
  .listen({ hostname: '::', port: 5002 }, server => {
    console.info(`Server is running at ${server.hostname}:${server.port}`)
  })

// noinspection JSUnusedGlobalSymbols
export default app
