<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { Button } from '~ui/components'
  import { addresses } from '~ui/stores/addresses'

  export let isOpen = false
  // export let addresses: string[] = []

  const dispatch = createEventDispatcher()

  function selectAddress(address: string) {
    dispatch('select', address)
  }

  function closeModal() {
    dispatch('close')
  }
</script>

{#if isOpen}
  <div class=".fixed .inset-0 .bg-black/50 .flex .items-center .justify-center .z-50">
    <div class=".bg-white .rounded-lg .p-4 .w-[400px] .max-w-[90vw]">
      <h3 class=".text-lg .font-semibold .mb-4 .text-black">Select Source Address</h3>
      
      <div class=".space-y-4">
        <div class=".space-y-2">
          {#each $addresses as address}
            <button
              class=".w-full .text-left .p-3 .bg-gray-50 .rounded .text-black .hover:bg-gray-100"
              on:click={() => selectAddress(address)}
            >
              {address}
            </button>
          {/each}
        </div>

        <div class=".flex .justify-end .gap-2 .mt-4">
          <Button onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  </div>
{/if} 