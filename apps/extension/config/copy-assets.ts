import fs from 'fs-extra'

export const copyAssets = () => {
  fs.copySync('icons', 'dist/icons')
}
