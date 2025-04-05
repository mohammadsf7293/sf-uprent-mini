declare module '*.svelte' {
  const component: unknown;
  export default component;
}

declare global {
  interface Window {
    __TAURI__?: {
      invoke: (command: string, args?: unknown) => Promise<unknown>;
    };
  }
}

export {};
