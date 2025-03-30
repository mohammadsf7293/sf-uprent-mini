import type { Plugin } from 'vite'

export const preprocessFonts = (): Plugin => {
  return {
    name: 'font-url-transform',
    generateBundle(_options, bundle) {
      for (const fileName in bundle) {
        if (!fileName.includes('content-scripts/main.js')) continue

        const file = bundle[fileName]
        if (file.type === 'asset') {
          const content = file.source.toString()

          file.source = content.replaceAll(
            /\/fonts\/uprent-(.+?\.woff2?)/g,
            'chrome-extension://nnjokgfpoecefilcbmcinacgmefmdabl/fonts/uprent-$1',
          )
        } else {
          const content = file.code
          file.code = content.replaceAll(
            /\/fonts\/uprent-(.+?\.woff2?)/g,
            'chrome-extension://nnjokgfpoecefilcbmcinacgmefmdabl/fonts/uprent-$1',
          )
        }
      }
    },
  }
}
