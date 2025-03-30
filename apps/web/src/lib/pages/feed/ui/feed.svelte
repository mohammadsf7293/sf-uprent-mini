<script lang="ts">
  import { FeedProperties } from '.'
  import { feed } from '$lib/shared/stores'
  import { onMount } from 'svelte'

  onMount(() => {
    feed.reload()
  })
</script>

<div class=".flex .max-h-screen .flex-col .bg-gray-50">
  <FeedProperties />
</div>
