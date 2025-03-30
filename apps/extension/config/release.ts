import { join } from 'path'
import { writeFile } from 'fs/promises'

const packageJson = JSON.parse(await Bun.file('package.json').text())

const extensionConfigPathnames = [
  '../../../packages/~core/constants/extension-version.ts',
]

// Get the current version from the manifest.json file
const currentVersion = packageJson['version']
const incrementedVersion = (parseInt(currentVersion) + 1).toString()

// Update the version in the manifest.json file
packageJson['version'] = incrementedVersion
const updatedPackageJson = JSON.stringify(packageJson, null, 2)
await Bun.write('package.json', updatedPackageJson)

for (const pathname of extensionConfigPathnames) {
  const filePath = join(__dirname, pathname)

  const updatedExtensionData = `export const EXTENSION_VERSION = '${incrementedVersion}'\n`
  await writeFile(filePath, updatedExtensionData)
}

console.info(`Version incremented to v${incrementedVersion}`)
