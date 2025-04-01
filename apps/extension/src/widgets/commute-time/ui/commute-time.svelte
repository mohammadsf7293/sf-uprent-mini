<script lang="ts">
  import { CommuteTime } from '~ui/components'
  import type { Durations } from '~core/database'

  let loading = false
  let durations: Durations | null = null

  const load = async () => {
    loading = true
    try {
      const response = await chrome.runtime.sendMessage({ action: "fetchDurations" })

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

<CommuteTime {loading} {durations} onLoad={load} /> 