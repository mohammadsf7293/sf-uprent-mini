import { resolve as resolvePath } from 'path'
import { defineConfig, type UserConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tsconfigPaths from 'vite-tsconfig-paths'
import { compileManifest } from './config/compile-manifest'
import { copyAssets } from './config/copy-assets'
import { preprocessFonts } from './config/preprocess-fonts'

const resolve = {
  alias: [
    {
      find: '~api',
      replacement: resolvePath(__dirname, '../../packages/~api'),
    },
    {
      find: '~core',
      replacement: resolvePath(__dirname, '../../packages/~core'),
    },
    {
      find: '~ui',
      replacement: resolvePath(__dirname, '../../packages/~ui'),
    },
  ],
}

export default defineConfig(({ mode }): UserConfig => {
  if (mode === 'service-worker') {
    return {
      plugins: [tsconfigPaths()],
      build: {
        sourcemap: true,
        emptyOutDir: false,
        rollupOptions: {
          input: {
            'service-worker/background': '/src/_service-worker/background.ts',
          },
          output: {
            format: 'iife',
            entryFileNames: '[name].js',
          },
        },
      },
      resolve,
    }
  }

  return {
    plugins: [
      tsconfigPaths({
        ignoreConfigErrors: true,
      }),
      preprocessFonts(),
      svelte(),
      {
        name: 'post-build-hooks',
        async buildEnd() {
          await compileManifest()
          copyAssets()
        },
      },
    ],
    build: {
      chunkSizeWarningLimit: 1200,
      emptyOutDir: false,
      sourcemap: true,
      minify: mode === 'prod' ? 'esbuild' : false,
      rollupOptions: {
        input: {
          'content-scripts/main': '/src/_content-scripts/main.ts',
        },

        output: {
          format: 'iife',
          entryFileNames: '[name].js',
          assetFileNames: assetInfo => {
            if (assetInfo.names?.[0]?.includes('.woff')) {
              return 'fonts/uprent-[name][extname]'
            } else {
              return 'assets/[name]-[hash][extname]'
            }
          },
        },
      },
    },
    resolve,
  }
})
