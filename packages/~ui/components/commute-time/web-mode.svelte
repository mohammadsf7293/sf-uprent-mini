<script lang="ts">
  import type { Durations } from '~core/database'
  import { RouteSVG } from '~ui/assets'
  import { Button } from '~ui/components'

  export let loading = false
  export let durations: Durations | null = null
  export let onLoad: () => Promise<void>
</script>

<div class=".flex .flex-col .gap-4 .p-4 .bg-white .rounded-lg .shadow-sm .border .border-gray-200 .h-[90%]">
  <div class=".flex .items-center .gap-2">
    <RouteSVG class=".w-5 .h-5 .text-primary-600" />
    <h3 class=".text-lg .font-semibold .text-gray-900">Commute Times</h3>
  </div>

  {#if !durations}
    <Button primary {loading} onClick={onLoad}>
      <RouteSVG slot="icon" />
      Load commutes
    </Button>
  {:else}
    <div class=".relative .flex-1 .min-h-0">
      <div class=".absolute .inset-0 .overflow-y-auto">
        <div class=".grid .grid-cols-1 .sm:grid-cols-2 .gap-2">
          {#each Object.entries(durations) as [destination, duration]}
            <div class=".flex .items-center .justify-between .p-2 .bg-gray-50 .rounded-md">
              <span class=".text-sm .font-medium .text-gray-700">{destination}</span>
              <span class=".text-sm .font-semibold .text-primary-600">{duration}</span>
            </div>
          {/each}
        </div>
      </div>
      <div class=".absolute .bottom-0 .left-0 .right-0 .h-8 .bg-gradient-to-t .from-white .via-white/95 .to-transparent .pointer-events-none" />
    </div>
  {/if}
</div> 