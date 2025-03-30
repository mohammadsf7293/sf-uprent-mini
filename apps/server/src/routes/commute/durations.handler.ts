import { app, res } from '@/handler'
import { t, DurationsSchema } from '@schemas'
import type { Durations } from '~core/database'
import { randomInt } from '~core/helpers'

const resDTO = t.Object({
  durations: DurationsSchema,
})

export const commuteDurationsEndpointHandler = app.get(
  '/durations',
  ({ res }) => {
    // mock commute times
    const durations: Durations = {
      walking: randomInt(45, 90),
      biking: randomInt(25, 60),
      driving: randomInt(10, 30),
      transit: randomInt(10, 30),
    }

    return res.ok({
      durations,
    })
  },
  { response: res(resDTO) },
)
