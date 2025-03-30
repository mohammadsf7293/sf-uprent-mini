<script lang="ts">
  import { browser } from '$app/environment'
  import { feed } from '$lib/shared/stores'
  import { LoadingSpinnerSVG } from '~ui/assets'
  import { FeedProperty, FeedAutoLoader } from '.'

  let scrollContainer: HTMLDivElement
</script>

<div
  bind:this={scrollContainer}
  class=".flex .max-w-[1280px] .flex-1 .flex-col .gap-4 .overflow-y-auto .pb-4 .pl-2 .pr-4 .pt-2 xs:.-ml-4 xs:.w-screen"
>
  {#if browser && !$feed.isLoading}
    {#each $feed.properties as property (property.id)}
      <FeedProperty {property} />
    {/each}
    {#if !$feed.hasMore && $feed.properties.length}
      You've reached the end of the Feed!
    {/if}
    {#if scrollContainer}
      <FeedAutoLoader {scrollContainer}>
        Loading more properties...
      </FeedAutoLoader>
    {/if}
  {:else}
    <div class=".flex .items-center .gap-2 .text-gray-500">
      <LoadingSpinnerSVG class=".h-6 .w-6 .stroke-gray-400" />
      Loading properties...
    </div>
  {/if}
</div>
