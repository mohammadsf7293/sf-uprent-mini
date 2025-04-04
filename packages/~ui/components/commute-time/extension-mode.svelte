<script lang="ts">
  import type { Durations } from '~core/database'
  import { RouteSVG } from '~ui/assets'
  import { Button } from '~ui/components'
  import { addresses } from '~ui/stores/addresses'
  import DurationsModal from './durations-modal.svelte'
  import AddressModal from './address-modal.svelte'

  export let loading = false
  export let durations: Durations | null = null
  export let onLoad: (address: string) => Promise<void>

  let showDurationsModal = false
  let showAddressModal = false
  let allDurations: Record<string, Durations> | null = null

  async function handleLoadClick() {
    if ($addresses.length === 0) return
    
    loading = true
    try {
      if (typeof chrome !== 'undefined') {
        const response = await chrome.runtime.sendMessage({ 
          action: "fetchDurations",
          addresses: $addresses
        })
        if (!response.success) {
          console.error('Failed to load commute durations:', response.error)
          return
        }
        allDurations = response.data.payload.durations
        showDurationsModal = true
      } else {
        await onLoad($addresses[0])
      }
    } catch (error) {
      console.error('Error loading commute durations:', error)
    } finally {
      loading = false
    }
  }
</script>

<div class=".flex .flex-col .gap-2 .p-2 .bg-white .rounded-lg .shadow-sm .border .border-gray-200">
  <div class=".flex .items-center .gap-2">
    <div class=".w-4 .h-4 .text-primary-600">
      <RouteSVG />
    </div>
    <h3 class=".text-sm .font-semibold .text-gray-900">Commute Times</h3>
  </div>

  {#if !durations}
    <div class=".flex .gap-2">
      <Button 
        primary 
        {loading} 
        onClick={handleLoadClick}
        disabled={$addresses.length === 0}
        class=".w-fit"
      >
        <RouteSVG slot="icon" />
        Load commutes
      </Button>
      <Button 
        onClick={() => showAddressModal = true}
        class=".w-fit"
      >
        Manage addresses
      </Button>
    </div>
  {:else}
    <div class=".grid .grid-cols-1 .gap-1">
      {#each Object.entries(durations) as [mode, duration]}
        <div class=".flex .items-center .justify-between .p-1.5 .bg-gray-50 .rounded-md">
          <span class=".text-sm .font-medium .text-gray-700">{mode}</span>
          <span class=".text-sm .font-semibold .text-primary-600">{duration} min</span>
        </div>
      {/each}
    </div>
  {/if}

  <DurationsModal 
    isOpen={showDurationsModal}
    durations={allDurations}
    on:close={() => showDurationsModal = false}
  />

  <AddressModal 
    isOpen={showAddressModal}
    on:close={() => showAddressModal = false}
  />
</div> 