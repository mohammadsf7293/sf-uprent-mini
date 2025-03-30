import { App } from '@widgets'

export const injectApp = () => {
  let app = new App({
    target: document.documentElement,
  })

  const styles = Array.from(document.head.querySelectorAll('style'))
  const uprentStyleElement = styles.find(style => {
    return (
      style.textContent?.includes('svelte') &&
      style.textContent.includes('uprent')
    )
  })
  uprentStyleElement?.setAttribute('data-uprent-styles', 'true')
  const styleBackup = uprentStyleElement?.cloneNode(true)

  const restoreApp = () => {
    if (document.querySelector('[data-uprent-app]')) return

    if (styleBackup && !document.querySelector('[data-uprent-styles]')) {
      document.head.append(styleBackup)
    }

    app.$destroy()
    app = new App({
      target: document.documentElement,
    })
  }

  setInterval(restoreApp, 500)
}
