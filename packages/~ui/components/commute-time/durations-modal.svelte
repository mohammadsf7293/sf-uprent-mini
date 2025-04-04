<script lang="ts">
  import type { Durations } from '~core/database'
  import { RouteSVG } from '~ui/assets'
  import { Modal } from '~ui/components'

  export let isOpen = false
  export let durations: Record<string, Durations> | null = null

  $: if (!isOpen) {
    durations = null
  }
</script>

<Modal {isOpen} on:close>
  <div class=".flex .flex-col .gap-4 .p-4">
    <div class=".flex .items-center .gap-2">
      <RouteSVG />
      <h3 class=".text-lg .font-semibold .text-gray-900">Commute Times</h3>
    </div>

    {#if durations}
      <div class=".grid .grid-cols-1 .gap-4">
        {#each Object.entries(durations) as [address, addressDurations]}
          <div class=".flex .flex-col .gap-2 .p-4 .bg-gray-50 .rounded-lg">
            <span class=".text-sm .font-medium .text-gray-700">{address}</span>
            <div class=".grid .grid-cols-2 .gap-2">
              {#if addressDurations.walking}
                <div class=".flex .items-center .justify-between .p-2 .bg-white .rounded-md">
                  <span class=".text-sm .text-gray-600">Walking</span>
                  <span class=".text-sm .font-semibold .text-primary-600">{addressDurations.walking} min</span>
                </div>
              {/if}
              {#if addressDurations.biking}
                <div class=".flex .items-center .justify-between .p-2 .bg-white .rounded-md">
                  <span class=".text-sm .text-gray-600">Biking</span>
                  <span class=".text-sm .font-semibold .text-primary-600">{addressDurations.biking} min</span>
                </div>
              {/if}
              {#if addressDurations.driving}
                <div class=".flex .items-center .justify-between .p-2 .bg-white .rounded-md">
                  <span class=".text-sm .text-gray-600">Driving</span>
                  <span class=".text-sm .font-semibold .text-primary-600">{addressDurations.driving} min</span>
                </div>
              {/if}
              {#if addressDurations.transit}
                <div class=".flex .items-center .justify-between .p-2 .bg-white .rounded-md">
                  <span class=".text-sm .text-gray-600">Transit</span>
                  <span class=".text-sm .font-semibold .text-primary-600">{addressDurations.transit} min</span>
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</Modal> 