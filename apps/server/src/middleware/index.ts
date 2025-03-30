import { Elysia } from 'elysia'
import { resMiddleware } from './res'

export const withMiddleware = new Elysia().use(resMiddleware)
