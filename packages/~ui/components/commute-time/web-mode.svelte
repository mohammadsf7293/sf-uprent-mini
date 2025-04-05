<script lang="ts">
  import type { Durations } from '~core/database'
  import { RouteSVG } from '~ui/assets'
  import { Button } from '~ui/components'
  import { addresses } from '~ui/stores/addresses'
  import DurationsModal from './durations-modal.svelte'
  import api from '~api'

  export let loading = false
  export let durations: Durations | null = null

  let showDurationsModal = false
  let allDurations: Record<string, Durations> | null = null

  async function handleLoadClick() {
    if ($addresses.length === 0) return
    
    loading = true
    try {
      const response = await api.commute.durations.post({ addresses: $addresses })
      if (response.data?.status === 'success') {
        allDurations = response.data.payload.durations
        showDurationsModal = true
      }
    } catch (error) {
      console.error('Failed to fetch commute times:', error)
    } finally {
      loading = false
    }
  }
</script>

<div class=".flex .flex-col .gap-4 .p-4 .bg-white .rounded-lg .shadow-sm .border .border-gray-200 .h-[90%]">
  <div class=".flex .items-center .gap-2">
    <RouteSVG />
    <h3 class=".text-lg .font-semibold .text-gray-900">Commute Times</h3>
  </div>

  {#if !durations}
    <Button 
      primary 
      {loading} 
      onClick={handleLoadClick}
      disabled={$addresses.length === 0}
      title={$addresses.length === 0 ? "You have to have at least one address to use this feature" : ""}
    >
      <RouteSVG slot="icon" />
      Load commutes
    </Button>
  {:else}
    <div class=".relative .flex-1 .min-h-0">
      <div class=".absolute .inset-0 .overflow-y-auto">
        <div class=".grid .grid-cols-1 .sm:grid-cols-2 .gap-2">
          {#each Object.entries(durations) as [mode, duration]}
            <div class=".flex .items-center .justify-between .p-2 .bg-gray-50 .rounded-md">
              <span class=".text-sm .font-medium .text-gray-700">{mode}</span>
              <span class=".text-sm .font-semibold .text-primary-600">{duration} min</span>
            </div>
          {/each}
        </div>
      </div>
      <div class=".absolute .bottom-0 .left-0 .right-0 .h-8 .bg-gradient-to-t .from-white .via-white/95 .to-transparent .pointer-events-none" />
    </div>
  {/if}

  <DurationsModal 
    isOpen={showDurationsModal}
    durations={allDurations}
    on:close={() => showDurationsModal = false}
  />
</div> 