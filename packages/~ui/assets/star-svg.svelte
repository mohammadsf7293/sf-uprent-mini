<script lang="ts">
  export let className: Optional<string> = undefined
  export { className as class }
</script>

<svg
  width="1.35em"
  height="1.35em"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
>
  <path
    d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
  />
</svg>
