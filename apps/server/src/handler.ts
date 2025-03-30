import type { TSchema } from '@sinclair/typebox'
import { t } from '@schemas'
import { withMiddleware } from './middleware'

export const res = <TPayload extends TSchema>(payloadSchema: TPayload) => {
  return t.Union([
    t.Object({
      status: t.Literal('success'),
      payload: payloadSchema,
    }),
    t.Object({
      status: t.Literal('error'),
      message: t.String(),
    }),
  ])
}

export const app = withMiddleware
