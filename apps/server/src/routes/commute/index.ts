import { app } from '@/handler'
import { commuteDurationsEndpointHandler } from './durations.handler'

export const commuteRoute = app.group('/commute', group =>
  group.use(commuteDurationsEndpointHandler),
)
