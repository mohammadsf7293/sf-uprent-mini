<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { XSVG } from '~ui/assets'
  import { Button } from '~ui/components'
  import { addresses } from '~ui/stores/addresses'
  import { maxDurations } from '~ui/stores/max-durations'

  export let isOpen = false

  const dispatch = createEventDispatcher()
  let newAddress = ''
  let addressError = ''
  
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
    addressError = ''  // Clear error when input changes
    filterSuggestions(input)
    showSuggestions = true
  }

  function selectSuggestion(suggestion: string) {
    newAddress = suggestion
    showSuggestions = false
  }

  function addAddress() {
    if (newAddress && $addresses.length < 2) {
      if ($addresses.includes(newAddress)) {
        addressError = 'This address is already added'
        return
      }
      addresses.update(addr => [...addr, newAddress])
      newAddress = ''
      addressError = ''
      showSuggestions = false
    }
  }

  function removeAddress(address: string) {
    addresses.update(addr => addr.filter(a => a !== address))
  }

  function closeModal() {
    dispatch('close')
    newAddress = ''
    showSuggestions = false
  }
</script>

{#if isOpen}
  <div class=".fixed .inset-0 .bg-black/50 .flex .items-center .justify-center .z-[9999]">
    <div class=".bg-white .rounded-lg .p-4 .w-[400px] .max-w-[90vw] .relative .z-[10000]">
      <div class=".space-y-4">
        <!-- Address management section -->
        <div class=".space-y-2">
          <h3 class=".text-lg .font-semibold .text-gray-900">Manage Addresses</h3>
          
          <!-- Current addresses -->
          {#if $addresses.length > 0}
            <div class=".space-y-2">
              {#each $addresses as address}
                <div class=".flex .items-center .justify-between .p-2 .bg-gray-50 .rounded">
                  <span class=".text-sm .text-gray-700">{address}</span>
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
          {#if $addresses.length < 2}
            <div class=".relative">
              <input
                type="text"
                placeholder="Enter an address"
                bind:value={newAddress}
                on:input={handleInput}
                class=".w-full .p-2 .border .rounded .text-sm .text-gray-700"
                class:border-red-500={addressError}
              />
              
              {#if addressError}
                <p class=".text-sm .text-red-500 .mt-1">{addressError}</p>
              {/if}

              {#if showSuggestions && filteredSuggestions.length > 0}
                <div class=".absolute .left-0 .right-0 .mt-1 .bg-white .border .rounded .shadow-lg .z-10">
                  {#each filteredSuggestions as suggestion}
                    <button
                      class=".w-full .text-left .p-2 .text-sm .text-gray-700 .hover:bg-gray-50"
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
                disabled={!newAddress || $addresses.length >= 2}
                class=".mt-2"
              >
                Add Address
              </Button>
            </div>
          {/if}
        </div>

        <!-- Max durations section -->
        <div class=".space-y-4 .mt-6">
          <h3 class=".text-lg .font-semibold .text-gray-900">Maximum Travel Times</h3>
          <div class=".grid .grid-cols-1 .sm:grid-cols-2 .gap-4">
            <div class=".space-y-2">
              <label for="walking-duration" class=".block .text-sm .font-medium .text-gray-700">Walking (minutes)</label>
              <input
                id="walking-duration"
                type="number"
                bind:value={$maxDurations.walking}
                min="0"
                class=".w-full .px-3 .py-2 .rounded-md .border .border-gray-300 .focus:border-primary-500 .focus:ring-2 .focus:ring-primary-200 .text-gray-700 .shadow-sm .transition-colors"
              />
            </div>
            <div class=".space-y-2">
              <label for="biking-duration" class=".block .text-sm .font-medium .text-gray-700">Biking (minutes)</label>
              <input
                id="biking-duration"
                type="number"
                bind:value={$maxDurations.biking}
                min="0"
                class=".w-full .px-3 .py-2 .rounded-md .border .border-gray-300 .focus:border-primary-500 .focus:ring-2 .focus:ring-primary-200 .text-gray-700 .shadow-sm .transition-colors"
              />
            </div>
            <div class=".space-y-2">
              <label for="driving-duration" class=".block .text-sm .font-medium .text-gray-700">Driving (minutes)</label>
              <input
                id="driving-duration"
                type="number"
                bind:value={$maxDurations.driving}
                min="0"
                class=".w-full .px-3 .py-2 .rounded-md .border .border-gray-300 .focus:border-primary-500 .focus:ring-2 .focus:ring-primary-200 .text-gray-700 .shadow-sm .transition-colors"
              />
            </div>
            <div class=".space-y-2">
              <label for="transit-duration" class=".block .text-sm .font-medium .text-gray-700">Transit (minutes)</label>
              <input
                id="transit-duration"
                type="number"
                bind:value={$maxDurations.transit}
                min="0"
                class=".w-full .px-3 .py-2 .rounded-md .border .border-gray-300 .focus:border-primary-500 .focus:ring-2 .focus:ring-primary-200 .text-gray-700 .shadow-sm .transition-colors"
              />
            </div>
          </div>
        </div>

        <div class=".flex .justify-end .gap-2 .mt-4">
          <Button onClick={closeModal}>
            Close
          </Button>
        </div>
      </div>
    </div>
  </div>
{/if} 