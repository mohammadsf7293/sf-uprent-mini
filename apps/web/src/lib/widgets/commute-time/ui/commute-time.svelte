<script lang="ts">
  import { CommuteTime } from '~ui/components'
  import api from '~api'
  import type { Durations } from '~core/database'

  let loading = false
  let durations: Durations | null = null

  const load = async () => {
    loading = true
    const { data, error } = await api.commute.durations.get()
    loading = false

    if (error || data.status === 'error') return

    durations = data.payload.durations
  }
</script>

<CommuteTime {loading} {durations} onLoad={load} />
