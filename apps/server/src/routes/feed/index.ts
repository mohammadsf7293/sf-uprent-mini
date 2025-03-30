import { app } from '@/handler'
import { feedPropertiesEndpointHandler } from './properties.handler'

export const feedRoute = app.group('/feed', group =>
  group.use(feedPropertiesEndpointHandler),
)
