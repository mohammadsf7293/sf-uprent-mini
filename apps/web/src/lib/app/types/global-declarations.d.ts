import type { DndEvent as DndEventOG } from 'svelte-dnd-action'

type ExtensionVersion = `${number}`

declare global {
  export type Optional<T> = T | undefined

  export type VoidCallback = () => unknown | Promise<unknown>

  export type Timer = ReturnType<typeof setInterval>

  interface Window {
    L
    type: null
    extensionUprent: {
      version: ExtensionVersion
    }
  }

  export type DndEvent<TItem> = DndEventOG<TItem>
  namespace svelteHTML {
    interface HTMLAttributes<T> {
      'on:click_outside'?: (event: CustomEvent<T>) => void
      'on:consider'?: (
        event: CustomEvent<DndEvent> & {
          target: EventTarget & T
        },
      ) => void
      'on:finalize'?: (
        event: CustomEvent<DndEvent> & {
          target: EventTarget & T
        },
      ) => void
    }
  }
}

export {}
