<script lang="ts">
  import type { Durations } from '~core/database'
  import api from '~api'
  import WebMode from './web-mode.svelte'
  import ExtensionMode from './extension-mode.svelte'

  export let mode: 'web' | 'extension' = 'web'
  export let loading = false
  export let durations: Durations | null = null
</script>

{#if mode === 'web'}
  <WebMode {loading} {durations} />
{:else}
  <ExtensionMode {loading} {durations} />
{/if} 