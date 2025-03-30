declare global {
  export type Optional<T> = T | undefined

  export type VoidCallback = () => unknown | Promise<unknown>

  namespace svelteHTML {
    interface HTMLAttributes<T> {
      'on:click_outside'?: (event: CustomEvent<T>) => void
    }
  }
}

export {}
