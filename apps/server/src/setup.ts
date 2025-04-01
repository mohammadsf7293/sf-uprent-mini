import { cors } from '@elysiajs/cors'
import { Elysia } from 'elysia'
import { Database } from 'bun:sqlite'

export const setup = new Elysia({ name: 'setup' })
  .use(
    cors({
      origin: true,
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
