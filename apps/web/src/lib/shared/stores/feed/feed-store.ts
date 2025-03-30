import { get, writable } from 'svelte/store'
import api from '~api'
import type { FeedStore } from './types'

const createFeedStore = () => {
  const feedStore = writable<FeedStore>({
    isLoading: true,
    page: 0,
    properties: [],
    hasMore: true,
  })
  const { subscribe, update } = feedStore

  const loadProperties = async () => {
    const { page, hasMore } = get(feedStore)

    if (!hasMore) return

    const { data, error } = await api.feed.properties.post({
      page,
    })
    if (!data || error || data.status === 'error') return

    update(store => {
      const { hasMore, properties } = data.payload

      store.properties = [...store.properties, ...properties]
      store.hasMore = hasMore
      store.page = page + 1

      return store
    })
  }

  return {
    subscribe,
    reload: async () => {
      update(store => ({ ...store, isLoading: true }))
      await loadProperties()
      update(store => ({ ...store, isLoading: false }))
    },
    loadMore: loadProperties,
  }
}

export const feed = createFeedStore()
