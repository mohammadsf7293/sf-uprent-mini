<script lang="ts">
  export let className: string | undefined = undefined,
    strokeDashoffset: number | undefined = undefined,
    strokeDasharray: number | undefined = undefined,
    spin: boolean = true
  export { className as class }
</script>

<svg
  class="spinner {className}"
  class:spin
  viewBox="0 0 28 28"
  fill="none"
  stroke="currentColor"
  height="1.1em"
  width="1.1em"
>
  <circle cx="14" cy="14" r="11.5" stroke-opacity="0.3" stroke-width="5" />
  <circle
    cx="14"
    cy="14"
    r="11.5"
    stroke-width="5"
    style:stroke-dashoffset={strokeDashoffset}
    style:stroke-dasharray={strokeDasharray}
  />
</svg>

<style lang="scss">
  .spinner > circle:nth-child(2) {
    stroke-dasharray: 54px;
    stroke-dashoffset: 54px;
  }

  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .spin {
    animation: spin 1s linear infinite;
  }
</style>
