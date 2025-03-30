import { AppWithSetup } from '../setup'

export const resMiddleware = (app: AppWithSetup) =>
  app.derive(({ set }) => {
    const success = <TPayload>(payload: TPayload) => ({
      status: 'success' as const,
      payload,
    })
    const error = <TMessage>(message: TMessage) => ({
      status: 'error' as const,
      message,
    })
    const res = {
      ok: <TPayload>(payload: TPayload) => {
        set.status = 200
        return success(payload)
      },
      created: <TPayload>(payload: TPayload) => {
        set.status = 201
        return success(payload)
      },
      accepted: <TPayload>(payload: TPayload) => {
        set.status = 202
        return success(payload)
      },
      badRequest: <TMessage>(message: TMessage) => {
        set.status = 400
        return error(message)
      },
      unauthorized: <TMessage>(message: TMessage) => {
        set.status = 401
        return error(message)
      },
      forbidden: <TMessage>(message: TMessage) => {
        set.status = 403
        return error(message)
      },
      notFound: <TMessage>(message: TMessage) => {
        set.status = 404
        return error(message)
      },
      serverError: <TMessage>(message: TMessage) => {
        set.status = 500
        return error(message)
      },
    }
    return {
      res,
    }
  })
