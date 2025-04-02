<script lang="ts">
  import type { Durations } from '~core/database'
  import api from '~api'
  import WebMode from './web-mode.svelte'
  import ExtensionMode from './extension-mode.svelte'

  export let mode: 'web' | 'extension' = 'web'
  export let loading = false
  export let durations: Durations | null = null
  export let onLoad: (address: string) => Promise<void>

  const load = async () => {
    loading = true
    try {
      if (mode === 'extension' && typeof chrome !== 'undefined') {
        const response = await chrome.runtime.sendMessage({ action: "fetchDurations" })
        if (!response.success) {
          console.error('Failed to load commute durations:', response.error)
          return
        }
        durations = response.data.payload.durations
      } else {
        const { data, error } = await api.commute.durations.get()
        if (error || data.status === 'error') return
        durations = data.payload.durations
      }
    } catch (error) {
      console.error('Error loading commute durations:', error)
    } finally {
      loading = false
    }
  }
</script>

{#if mode === 'web'}
  <WebMode {loading} {durations} {onLoad} />
{:else}
  <ExtensionMode {loading} {durations} onLoad={load} />
{/if} 