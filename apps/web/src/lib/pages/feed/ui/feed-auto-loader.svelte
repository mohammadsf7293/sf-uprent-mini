<script lang="ts">
  import { onMount } from 'svelte'
  import { feed } from '$lib/shared/stores'
  import { LoadingSpinnerSVG } from '~ui/assets'

  export let scrollContainer: HTMLDivElement

  let scrollDetector: HTMLDivElement
  let loading = false

  onMount(() => {
    const checkScroll = async () => {
      if (!scrollDetector) return

      const { top } = scrollDetector.getBoundingClientRect()
      if (loading || top - window.innerHeight > 700) return

      loading = true
      await feed.loadMore()
      loading = false

      if ($feed.hasMore) {
        await checkScroll()
      }
    }

    checkScroll()

    const unsubscribe = feed.subscribe(() => checkScroll())
    scrollContainer.addEventListener('scroll', checkScroll)

    return () => {
      unsubscribe()
      scrollContainer.removeEventListener('scroll', checkScroll)
    }
  })
</script>

<div
  bind:this={scrollDetector}
  class=".flex .items-center .gap-1.5 .text-gray-500"
>
  {#if loading}
    <LoadingSpinnerSVG class=".h-6 .stroke-primary" />
    <slot />
  {/if}
</div>
