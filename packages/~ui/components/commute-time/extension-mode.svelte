<script lang="ts">
  import type { Durations } from '~core/database'
  import { RouteSVG } from '~ui/assets'
  import { Button } from '~ui/components'
  import { slide } from 'svelte/transition'

  export let loading = false
  export let durations: Durations | null = null
  export let onLoad: () => Promise<void>
</script>

{#if durations}
  <div class=".flex .flex-col .gap-2 .p-2 .bg-white .rounded-lg .shadow-sm .border .border-gray-200" transition:slide={{ duration: 200 }}>
    <div class=".flex .items-center .gap-2">
      <RouteSVG class=".w-4 .h-4 .text-primary-600" />
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
      <RouteSVG class=".w-4 .h-4 .text-primary-600" />
      <h3 class=".text-sm .font-semibold .text-gray-900">Commute Times</h3>
    </div>

    <div class=".flex">
      <Button primary {loading} onClick={onLoad} class=".w-fit">
        <RouteSVG slot="icon" />
        Load commutes
      </Button>
    </div>
  </div>
{/if} 