<script lang="ts">
  import type { Durations } from '~core/database'
  import api from '~api'
  import { RouteSVG } from '~ui/assets'
  import { Button } from '~ui/components'

  export let mode: 'web' | 'extension' = 'web'
  export let loading = false
  export let durations: Durations | null = null

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

<div>
  {#if !durations}
    <Button primary {loading} onClick={load}>
      <RouteSVG slot="icon" />
      Load commutes
    </Button>
  {:else}
    <!-- TODO: make it pretty! -->
    {JSON.stringify(durations, null, 2)}
  {/if}
</div> 