<script lang="ts">
  import { fly } from 'svelte/transition'

  export let content: string,
    className = ''
  export { className as class }
</script>

<span class="{className} .relative">
  <span class=".invisible">
    {content}
  </span>
  {#key content}
    <span
      class=".absolute .left-0 .top-0"
      in:fly={{
        y: '-100%',
      }}
      out:fly={{
        y: '100%',
      }}
    >
      {content}
    </span>
  {/key}
</span>
