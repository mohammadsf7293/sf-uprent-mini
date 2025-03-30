import { edenTreaty } from '@elysiajs/eden'
import type app from './elysia/app'

const api = edenTreaty<typeof app>('http://localhost:5002', {
  $fetch: {
    credentials: 'include',
  },
})

export default api
