import { resolve as resolvePath } from 'path'
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    svelte()
  ],
  build: {
    lib: {
      entry: resolvePath(__dirname, 'index.ts'),
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['svelte'],
      output: {
        globals: {
          svelte: 'Svelte'
        }
      }
    }
  },
  resolve: {
    alias: {
      '~core': resolvePath(__dirname, '../~core'),
      '~ui': resolvePath(__dirname, '.')
    }
  }
}) 