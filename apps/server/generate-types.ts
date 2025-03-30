// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { BunPlugin } from 'bun'
import fs from 'fs'
import path from 'path'
import {
  type CompilationOptions,
  type EntryPointConfig,
  generateDtsBundle,
} from 'dts-bundle-generator/src/bundle-generator'

type Options = Omit<EntryPointConfig, 'filePath'> & {
  compilationOptions?: CompilationOptions
}

const dts = (options?: Options): BunPlugin => {
  return {
    name: 'bun-plugin-dts',
    async setup(build) {
      const { compilationOptions, ...rest } = options || {}

      const entrypoints = [...build.config.entrypoints].sort()
      const entries = entrypoints.map(entry => {
        return {
          filePath: entry,
          ...rest,
        }
      })

      const tsconfig = 'apps/server/tsconfig.json'
      const result = generateDtsBundle(entries, {
        ...compilationOptions,
        preferredConfigPath: tsconfig,
      })

      const outDir = build.config.outdir || './dist'
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir)
      }

      await Promise.all(
        entrypoints.map((entry, index) => {
          const dtsFile = entry
            .replace(/^.*\//, '')
            .replace(/\.[jtm]s$/, '.d.ts')
          const outFile = path.join(outDir, dtsFile)
          return Bun.write(outFile, result[index])
        }),
      )
    },
  }
}

await Bun.build({
  entrypoints: ['apps/server/src/app.ts'],
  outdir: 'apps/server/types',
  target: 'bun',

  plugins: [
    dts({
      compilationOptions: {
        followSymlinks: false,
        preferredConfigPath: 'apps/server/tsconfig.json',
      },
    }),
  ],
})

fs.copyFile(
  'apps/server/types/app.d.ts',
  'packages/~api/elysia/app.d.ts',
  () => void null,
)
