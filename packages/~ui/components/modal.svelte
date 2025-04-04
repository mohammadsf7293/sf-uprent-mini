<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { XSVG } from '~ui/assets'

  export let isOpen = false
  const dispatch = createEventDispatcher()

  function handleClose() {
    dispatch('close')
  }
</script>

{#if isOpen}
  <div class=".fixed .inset-0 .bg-black .bg-opacity-50 .flex .items-center .justify-center .z-50">
    <div class=".bg-white .rounded-lg .p-6 .max-w-4xl .w-full .max-h-[90vh] .overflow-y-auto">
      <div class=".flex .justify-between .items-center .mb-4">
        <slot name="header" />
        <button on:click={handleClose} class=".text-gray-500 .hover:text-gray-700">
          <XSVG class=".w-6 .h-6" />
        </button>
      </div>

      <slot />
    </div>
  </div>
{/if} 