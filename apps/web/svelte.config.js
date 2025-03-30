import adapter from '@sveltejs/adapter-node'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess({
    style: {
      css: {
        postcss: join(__dirname, 'postcss.config.js'),
      },
    },
  }),
  kit: {
    adapter: adapter({
      out: '.build',
    }),
  },
}

export default config
