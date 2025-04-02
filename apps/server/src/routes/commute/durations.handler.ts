import { app, res } from '@/handler'
import { t, DurationsSchema } from '@schemas'
import type { Durations } from '~core/database'
import { randomInt } from '~core/helpers'

const resDTO = t.Object({
  durations: DurationsSchema,
})

const reqDTO = t.Object({
  address: t.String(),
})

export const commuteDurationsEndpointHandler = app.post(
  '/durations',
  ({ body }) => {
    if (!body.address) {
      return {
        status: 'error',
        message: 'Address is required',
      }
    }

    // mock commute times
    const durations: Durations = {
      walking: randomInt(45, 90),
      biking: randomInt(25, 60),
      driving: randomInt(10, 30),
      transit: randomInt(10, 30),
    }

    return {
      status: 'success',
      payload: {
        durations,
      },
    }
  },
  { 
    body: reqDTO,
    response: res(resDTO) 
  },
)
