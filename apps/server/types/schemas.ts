import { t } from 'elysia'

export const PropertySchema = t.Object({
  id: t.Number(),
  sourceURL: t.String(),
  title: t.String(),
  cityName: t.String(),
  price: t.Nullable(t.Number()),
  area: t.Nullable(t.Number()),
  previewImageURL: t.String(),
})

export const DurationsSchema = t.Object({
  walking: t.Union([t.Number(), t.Null()]),
  driving: t.Union([t.Number(), t.Null()]),
  transit: t.Union([t.Number(), t.Null()]),
  biking: t.Union([t.Number(), t.Null()]),
})

export { t }
