<script lang="ts">
  import type { Durations } from '~core/database'
  import { RouteSVG } from '~ui/assets'
  import { Button } from '~ui/components'

  export let loading = false
  export let durations: Durations | null = null
  export let onLoad: () => Promise<void> = async () => {}
</script>

<div>
  {#if !durations}
    <Button primary {loading} onClick={onLoad}>
      <RouteSVG slot="icon" />
      Load commutes
    </Button>
  {:else}
    <!-- TODO: make it pretty! -->
    {JSON.stringify(durations, null, 2)}
  {/if}
</div> 