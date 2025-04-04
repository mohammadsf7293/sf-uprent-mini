<script lang="ts">
  import { feed } from '$lib/shared/stores'
  import { onMount } from 'svelte'
  import { Navbar } from '../../../../components/navbar'
  import FeedProperties from './feed-properties.svelte'

  onMount(() => {
    feed.reload()
  })
</script>

<div class=".flex .flex-col .h-full">
  <Navbar />
  <div class=".flex .max-h-screen .flex-col .bg-gray-50 .pt-[50px]">
    <div class=".container .mx-auto .px-4 .max-w-5xl">
      <FeedProperties />
    </div>
  </div>
</div>
