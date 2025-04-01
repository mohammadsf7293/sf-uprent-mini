<script lang="ts">
  import api from '~api'
  import type { Durations } from '~core/database'
  import { RouteSVG } from '~ui/assets'
  import { Button } from '~ui/components'

  let loading = false
  let durations: Durations | null = null

  const load = async () => {
    loading = true
    try {
      const response = await chrome.runtime.sendMessage({ action: "fetchDurations" })
      console.log('background response', response);

      if (!response.success) {
        console.error('Failed to load commute durations:', response.error)
        return
      }
      durations = response.data.payload.durations
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
