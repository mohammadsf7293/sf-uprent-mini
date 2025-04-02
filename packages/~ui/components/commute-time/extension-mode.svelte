<script lang="ts">
  import type { Durations } from '~core/database'
  import { RouteSVG } from '~ui/assets'
  import { Button } from '~ui/components'
  import { addresses } from '~ui/stores/addresses'
  import { slide } from 'svelte/transition'
  import AddressModal from './address-modal.svelte'
  import AddressSelectionModal from './address-selection-modal.svelte'

  export let loading = false
  export let durations: Durations | null = null
  export let onLoad: (address: string) => Promise<void>

  let showAddressModal = false
  let showAddressSelectionModal = false

  async function handleLoadClick() {
    if ($addresses.length === 0) return
    
    if ($addresses.length === 1) {
      if (typeof chrome !== 'undefined') {
        const response = await chrome.runtime.sendMessage({ 
          action: "fetchDurations",
          address: $addresses[0]
        })
        if (!response.success) {
          console.error('Failed to load commute durations:', response.error)
          return
        }
        durations = response.data.payload.durations
      } else {
        await onLoad($addresses[0])
      }
    } else {
      showAddressSelectionModal = true
    }
  }

  async function handleAddressSelect(address: string) {
    if (typeof chrome !== 'undefined') {
      const response = await chrome.runtime.sendMessage({ 
        action: "fetchDurations",
        address 
      })
      if (!response.success) {
        console.error('Failed to load commute durations:', response.error)
        return
      }
      durations = response.data.payload.durations
    } else {
      await onLoad(address)
    }
  }
</script>

{#if durations}
  <div class=".flex .flex-col .gap-2 .p-2 .bg-white .rounded-lg .shadow-sm .border .border-gray-200" transition:slide={{ duration: 200 }}>
    <div class=".flex .items-center .gap-2">
      <div class=".w-4 .h-4 .text-primary-600">
        <RouteSVG />
      </div>
      <h3 class=".text-sm .font-semibold .text-gray-900">Commute Times</h3>
    </div>

    <div class=".grid .grid-cols-1 .gap-1">
      {#each Object.entries(durations) as [destination, duration]}
        <div class=".flex .items-center .justify-between .p-1.5 .bg-gray-50 .rounded-md">
          <span class=".text-sm .font-medium .text-gray-700">{destination}</span>
          <span class=".text-sm .font-semibold .text-primary-600">{duration}</span>
        </div>
      {/each}
    </div>
  </div>
{:else}
  <div class=".flex .flex-col .gap-2 .p-2 .bg-white .rounded-lg .shadow-sm .border .border-gray-200">
    <div class=".flex .items-center .gap-2">
      <div class=".w-4 .h-4 .text-primary-600">
        <RouteSVG />
      </div>
      <h3 class=".text-sm .font-semibold .text-gray-900">Commute Times</h3>
    </div>

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
  </div>
{/if}

<AddressModal 
  isOpen={showAddressModal}
  on:close={() => showAddressModal = false}
/>

<AddressSelectionModal 
  isOpen={showAddressSelectionModal}
  onSelect={handleAddressSelect}
  on:close={() => showAddressSelectionModal = false}
/> 