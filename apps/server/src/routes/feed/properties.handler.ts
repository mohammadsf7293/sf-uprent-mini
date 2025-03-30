import { app, res } from '@/handler'
import { t, PropertySchema } from '@schemas'
import type { Property } from '~core/database'
import { FEED_PAGINATION_LIMIT } from '~core/constants'

const reqDTO = t.Object({
  page: t.Number(),
})
const resDTO = t.Object({
  properties: t.Array(PropertySchema),
  hasMore: t.Boolean(),
})

export const feedPropertiesEndpointHandler = app.post(
  '/properties',
  ({ body, db, res }) => {
    const properties = db
      .query<Property, []>(
        `
          SELECT * FROM properties 
          LIMIT ${FEED_PAGINATION_LIMIT + 1} 
          OFFSET ${FEED_PAGINATION_LIMIT * body.page}
        `,
      )
      .all()

    const hasMore = properties.length === FEED_PAGINATION_LIMIT + 1

    return res.ok({
      properties: properties.slice(0, 20),
      hasMore,
    })
  },
  { body: reqDTO, response: res(resDTO) },
)
