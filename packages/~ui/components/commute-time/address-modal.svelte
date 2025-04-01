<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { Button } from '~ui/components'

  export let isOpen = false
  export let addresses: string[] = []

  const dispatch = createEventDispatcher()
  let newAddress = ''
  
  // Mock suggestions for demo
  const mockSuggestions = [
    'Amsterdam Centraal',
    'Amsterdam Zuid',
    'Amsterdam Science Park',
    'Amsterdam Bijlmer ArenA',
    'Amsterdam RAI',
    'Amsterdam Lelylaan',
    'Amsterdam Muiderpoort',
    'Amsterdam Sloterdijk'
  ]
  
  let filteredSuggestions: string[] = []
  let showSuggestions = false

  function filterSuggestions(input: string) {
    if (!input) {
      filteredSuggestions = []
      return
    }
    const query = input.toLowerCase()
    filteredSuggestions = mockSuggestions.filter(s => 
      s.toLowerCase().includes(query)
    ).slice(0, 5)
  }

  function handleInput(event: Event) {
    const input = (event.target as HTMLInputElement).value
    newAddress = input
    filterSuggestions(input)
    showSuggestions = true
  }

  function selectSuggestion(suggestion: string) {
    newAddress = suggestion
    showSuggestions = false
  }

  function addAddress() {
    if (newAddress && addresses.length < 2) {
      dispatch('addAddress', newAddress)
      newAddress = ''
      showSuggestions = false
    }
  }

  function removeAddress(address: string) {
    dispatch('removeAddress', address)
  }

  function closeModal() {
    dispatch('close')
    newAddress = ''
    showSuggestions = false
  }
</script>

{#if isOpen}
  <div class=".fixed .inset-0 .bg-black/50 .flex .items-center .justify-center .z-50">
    <div class=".bg-white .rounded-lg .p-4 .w-[400px] .max-w-[90vw]">
      <h3 class=".text-lg .font-semibold .mb-4">Manage Addresses</h3>
      
      <div class=".space-y-4">
        <!-- Current addresses -->
        {#if addresses.length > 0}
          <div class=".space-y-2">
            {#each addresses as address}
              <div class=".flex .items-center .justify-between .p-2 .bg-gray-50 .rounded">
                <span class=".text-sm">{address}</span>
                <button 
                  class=".text-red-500 .hover:text-red-700" 
                  on:click={() => removeAddress(address)}
                >
                  ×
                </button>
              </div>
            {/each}
          </div>
        {/if}

        <!-- Add new address -->
        {#if addresses.length < 2}
          <div class=".relative">
            <input
              type="text"
              placeholder="Enter an address"
              bind:value={newAddress}
              on:input={handleInput}
              class=".w-full .p-2 .border .rounded .text-sm"
            />
            
            {#if showSuggestions && filteredSuggestions.length > 0}
              <div class=".absolute .left-0 .right-0 .mt-1 .bg-white .border .rounded .shadow-lg .z-10">
                {#each filteredSuggestions as suggestion}
                  <button
                    class=".w-full .text-left .p-2 .text-sm .hover:bg-gray-50"
                    on:click={() => selectSuggestion(suggestion)}
                  >
                    {suggestion}
                  </button>
                {/each}
              </div>
            {/if}
            
            <Button 
              primary
              onClick={addAddress}
              disabled={!newAddress || addresses.length >= 2}
              class=".mt-2"
            >
              Add Address
            </Button>
          </div>
        {/if}

        <div class=".flex .justify-end .gap-2 .mt-4">
          <Button onClick={closeModal}>
            Close
          </Button>
        </div>
      </div>
    </div>
  </div>
{/if} 