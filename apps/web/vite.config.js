import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { resolve as resolvePath, resolve } from 'path'

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: [
      {
        find: '~core',
        replacement: resolve(__dirname, '../../packages/~core'),
      },
      {
        find: '~api',
        replacement: resolve(__dirname, '../../packages/~api'),
      },
      {
        find: '~ui',
        replacement: resolvePath(__dirname, '../../packages/~ui'),
      },
    ],
  },
})
