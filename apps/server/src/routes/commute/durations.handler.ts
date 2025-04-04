import { app, res } from '@/handler'
import { t, DurationsSchema } from '@schemas'
import type { Durations } from '~core/database'
import { randomInt } from '~core/helpers'

const resDTO = t.Object({
  durations: t.Record(t.String(), DurationsSchema),
})

const reqDTO = t.Object({
  addresses: t.Array(t.String()),
})

export const commuteDurationsEndpointHandler = app.post(
  '/durations',
  ({ body }) => {
    if (!body.addresses || !body.addresses.length) {
      return {
        status: 'error',
        message: 'At least one address is required',
      }
    }

    const durations = body.addresses.reduce((acc, address) => {
      acc[address] = {
        walking: randomInt(45, 90),
        biking: randomInt(25, 60),
        driving: randomInt(10, 30),
        transit: randomInt(10, 30),
      }
      return acc
    }, {} as Record<string, Durations>)

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
