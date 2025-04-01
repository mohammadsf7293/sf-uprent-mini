import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'
import { Database } from 'bun:sqlite'

const allowedOriginRegex = /http:\/\/localhost:\d+/

export const setup = new Elysia({ name: 'setup' })
  .use(
    cors({
      origin: ({ headers }) => {
        const origin = headers.get('origin')
        return (
          !origin ||
          origin === 'chrome-extension://nnjokgfpoecefilcbmcinacgmefmdabl' ||
          allowedOriginRegex.test(origin)
        )
      },
      credentials: true,
      allowedHeaders: [
        'Content-Type',
        'Access-Control-Allow-Credentials',
        'Set-Cookie',
        'Is-Extension',
      ],
    }),
  )
  .decorate('db', new Database('./db.sqlite'))

export type AppWithSetup = typeof setup
