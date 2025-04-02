<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { Button } from '~ui/components'
  import { addresses } from '~ui/stores/addresses'

  export let isOpen = false
  export let onSelect: (address: string) => void

  const dispatch = createEventDispatcher()

  function closeModal() {
    dispatch('close')
  }
</script>

{#if isOpen}
  <div class=".fixed .inset-0 .bg-black/50 .flex .items-center .justify-center .z-50">
    <div class=".bg-white .rounded-lg .p-4 .w-[400px] .max-w-[90vw]">
      <h3 class=".text-lg .font-semibold .mb-4">Select Address</h3>
      
      <div class=".space-y-2">
        {#each $addresses as address}
          <button
            class=".w-full .text-left .p-2 .bg-gray-50 .rounded .hover:bg-gray-100 .cursor-pointer"
            on:click={() => {
              onSelect(address)
              dispatch('close')
            }}
          >
            {address}
          </button>
        {/each}
      </div>

      <div class=".flex .justify-end .mt-4">
        <Button onClick={() => dispatch('close')}>
          Cancel
        </Button>
      </div>
    </div>
  </div>
{/if} 