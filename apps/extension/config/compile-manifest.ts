import { readFile, writeFile } from 'fs/promises'

export const compileManifest = async () => {
  const packageJson = JSON.parse(await readFile('package.json', 'utf8'))

  const manifestBase = JSON.parse(
    await readFile('src/manifest-base.json', 'utf8'),
  )

  manifestBase.version = packageJson.version
  await writeFile('dist/manifest.json', JSON.stringify(manifestBase, null, 2))
}
