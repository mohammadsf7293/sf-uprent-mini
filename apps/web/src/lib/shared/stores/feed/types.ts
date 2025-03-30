import type { Property } from '~core/database'

export interface FeedStore {
  properties: Property[]
  page: number
  hasMore: boolean
  isLoading: boolean
}
